/**
 * ITOMIncidentManager
 * ---------------------------------------------------------------------------
 * Reusable Event Management -> Incident correlation logic, extracted out of
 * the Auto Incident on Service Event business rule so it is small,
 * single-purpose, unit-testable in isolation, and reusable from anywhere
 * else that needs the same behavior (a future REST endpoint, a scheduled
 * reconciliation job, etc.) - the standard "logic belongs in a Script
 * Include, not a monolithic Business Rule" ServiceNow best practice.
 *
 * How this maps to real ServiceNow Event Management:
 *
 *   Monitoring alert -> em_event -> Event Rule binding -> em_alert
 *   (correlated alert, duplicate suppression happens here) -> Alert
 *   Management rule -> Incident (created/updated/resolved)
 *
 * In this simulation, x_1980074_itom_i_0_svc_evt plays the role of the
 * already-correlated alert, and this class plays the role of the Alert
 * Management -> Incident automation:
 *
 *   - createIncidentForDownEvent()   ~ alert breaches threshold -> open inc
 *   - findOpenAutoIncident()         ~ duplicate/correlation suppression
 *   - resolveIncidentsForUpEvent()   ~ alert clears -> auto-resolve inc
 *   - mapSeverityToImpactUrgency()   ~ standard ITIL priority matrix
 */
var ITOMIncidentManager = Class.create();
ITOMIncidentManager.prototype = {
    initialize: function () {
        // Marker prefix used to identify incidents this automation owns,
        // so we never touch or "duplicate-check" against manually-created
        // incidents for the same CI.
        this.AUTO_INCIDENT_TAG = '[ITOM Auto]';
    },

    /**
     * Standard ITIL priority matrix: monitoring Severity maps to Incident
     * Impact and Urgency (Priority is then derived by the platform's own
     * Impact x Urgency lookup matrix on the incident table, exactly as it
     * would be for a manually-raised incident).
     *
     * @param {string} severity - critical | major | minor | warning | info
     * @returns {{impact: string, urgency: string}}
     */
    mapSeverityToImpactUrgency: function (severity) {
        var impactMap = {
            critical: '1', // High
            major: '2',    // Medium
            minor: '3',    // Low
            warning: '3',
            info: '3',
        };
        var urgencyMap = {
            critical: '1', // High
            major: '2',    // Medium
            minor: '2',
            warning: '3',  // Low
            info: '3',
        };

        return {
            impact: impactMap[severity] || '3',
            urgency: urgencyMap[severity] || '3',
        };
    },

    /**
     * Correlation check: is there already an open, automation-created
     * incident for this CI? This is what prevents a flapping service from
     * spawning a new incident on every single Down event.
     *
     * @param {string} ciSysId
     * @returns {GlideRecord|null} the open incident GlideRecord (positioned
     *   on the first match), or null if none exists
     */
    findOpenAutoIncident: function (ciSysId) {
        var inc = new GlideRecord('incident');
        inc.addQuery('cmdb_ci', ciSysId);
        inc.addQuery('state', 'NOT IN', '6,7'); // not Resolved, not Closed
        inc.addQuery('short_description', 'STARTSWITH', this.AUTO_INCIDENT_TAG);
        inc.query();

        return inc.next() ? inc : null;
    },

    /**
     * Looks up the Owner Group configured on the Monitored Service behind
     * a CI, so the auto-created incident routes straight to the
     * responsible team (ITIL assignment) instead of landing unassigned.
     *
     * @param {string} ciSysId
     * @returns {string} sys_id of the sys_user_group, or '' if unmapped
     */
    getOwnerGroupForCi: function (ciSysId) {
        var svc = new GlideRecord('x_1980074_itom_i_0_mon_svc');
        svc.addQuery('ci_reference', ciSysId);
        svc.setLimit(1);
        svc.query();

        return svc.next() ? svc.getValue('owner_group') : '';
    },

    /**
     * Handles a "Down" Service Event: correlate against existing open
     * incidents, and only create a new one if none exists.
     *
     * @param {GlideRecord} eventGr - the Service Event record (current)
     * @returns {string|null} sys_id of the incident that was created or
     *   already existed, or null if nothing happened (no CI reference)
     */
    createIncidentForDownEvent: function (eventGr) {
        var ciSysId = eventGr.getValue('ci_reference');
        if (!ciSysId) {
            gs.debug('[ITOM Health] Down event ' + eventGr.getUniqueValue() + ' has no CI reference - skipping.');
            return null;
        }

        var existing = this.findOpenAutoIncident(ciSysId);
        if (existing) {
            gs.debug('[ITOM Health] Open auto-incident ' + existing.getUniqueValue() +
                ' already exists for CI ' + ciSysId + ' - suppressing duplicate.');
            // Still keep the event's audit trail pointed at the incident
            // it correlates to, even though we didn't create a new one.
            eventGr.setValue('correlated_incident', existing.getUniqueValue());
            eventGr.update();
            return existing.getUniqueValue();
        }

        var severity = eventGr.getValue('severity');
        var priorityMap = this.mapSeverityToImpactUrgency(severity);

        // CMDB / Service Mapping awareness: mention the parent Business
        // Service (if any) in the short description so responders
        // immediately see the business impact, not just the CI name.
        var serviceMapper = new ITOMCmdbServiceMapper();
        var serviceImpactNote = serviceMapper.describeBusinessServiceImpact(ciSysId);

        var inc = new GlideRecord('incident');
        inc.initialize();
        inc.setValue('short_description', this.AUTO_INCIDENT_TAG + ' Service Down - CI ' + ciSysId + serviceImpactNote);
        inc.setValue('description',
            'Auto-created by ITOM Infrastructure Health Tracker.\n' +
            'Event Source: ' + eventGr.getValue('event_source') + '\n' +
            'Severity: ' + severity + '\n' +
            'Timestamp: ' + eventGr.getValue('timestamp'));
        inc.setValue('cmdb_ci', ciSysId);
        inc.setValue('impact', priorityMap.impact);
        inc.setValue('urgency', priorityMap.urgency);
        inc.setValue('category', 'software');
        inc.setValue('state', '2'); // In Progress - automation is actively handling it

        var ownerGroup = this.getOwnerGroupForCi(ciSysId);
        if (ownerGroup) {
            inc.setValue('assignment_group', ownerGroup);
        }

        var incSysId = inc.insert();
        if (!incSysId) {
            gs.error('[ITOM Health] Failed to create incident for CI ' + ciSysId + ': ' + inc.getLastErrorMessage());
            return null;
        }

        gs.info('[ITOM Health] Created incident ' + incSysId + ' for CI ' + ciSysId + ' (severity: ' + severity + ')');

        eventGr.setValue('correlated_incident', incSysId);
        eventGr.update();

        // Problem Management touchpoint: after opening this incident,
        // check whether the CI has now crossed the "3+ in 24h" threshold
        // and should be flagged as a Problem candidate.
        var problemEvaluator = new ITOMProblemCandidateEvaluator();
        problemEvaluator.evaluate(ciSysId);

        return incSysId;
    },

    /**
     * Handles an "Up" Service Event: auto-resolve any open,
     * automation-created incident(s) for the CI, and point the event's
     * correlated_incident back at the one it resolved (the most recent
     * match) for auditability.
     *
     * @param {GlideRecord} eventGr - the Service Event record (current)
     * @returns {number} count of incidents resolved
     */
    resolveIncidentsForUpEvent: function (eventGr) {
        var ciSysId = eventGr.getValue('ci_reference');
        if (!ciSysId) {
            gs.debug('[ITOM Health] Up event ' + eventGr.getUniqueValue() + ' has no CI reference - skipping.');
            return 0;
        }

        var inc = new GlideRecord('incident');
        inc.addQuery('cmdb_ci', ciSysId);
        inc.addQuery('state', 'NOT IN', '6,7');
        inc.addQuery('short_description', 'STARTSWITH', this.AUTO_INCIDENT_TAG);
        inc.query();

        var resolvedCount = 0;
        var lastResolvedSysId = '';

        while (inc.next()) {
            inc.setValue('state', '6'); // Resolved
            inc.setValue('close_code', 'Solved (Permanently)');
            inc.setValue('close_notes',
                'Auto-resolved by ITOM Infrastructure Health Tracker. ' +
                'Service Up event ' + eventGr.getUniqueValue() + ' received for CI ' + ciSysId + '.');
            inc.update();

            lastResolvedSysId = inc.getUniqueValue();
            resolvedCount++;
            gs.info('[ITOM Health] Auto-resolved incident ' + lastResolvedSysId + ' for CI ' + ciSysId);
        }

        if (resolvedCount > 0) {
            eventGr.setValue('correlated_incident', lastResolvedSysId);
            eventGr.update();
        } else {
            gs.debug('[ITOM Health] No open auto-incident found to resolve for CI ' + ciSysId);
        }

        return resolvedCount;
    },

    type: 'ITOMIncidentManager',
};
