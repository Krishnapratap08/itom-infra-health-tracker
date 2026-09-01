var ITOMIncidentManager = Class.create();
ITOMIncidentManager.prototype = {
    initialize: function () {
        this.AUTO_INCIDENT_TAG = '[ITOM Auto]';
    },

    mapSeverityToImpactUrgency: function (severity) {
        var impactMap = {
            critical: '1',
            major: '2',
            minor: '3',
            warning: '3',
            info: '3',
        };
        var urgencyMap = {
            critical: '1',
            major: '2',
            minor: '2',
            warning: '3',
            info: '3',
        };

        return {
            impact: impactMap[severity] || '3',
            urgency: urgencyMap[severity] || '3',
        };
    },

    findOpenAutoIncident: function (ciSysId) {
        var inc = new GlideRecord('incident');
        inc.addQuery('cmdb_ci', ciSysId);
        inc.addQuery('state', 'NOT IN', '6,7');
        inc.addQuery('short_description', 'STARTSWITH', this.AUTO_INCIDENT_TAG);
        inc.query();

        return inc.next() ? inc : null;
    },

    getOwnerGroupForCi: function (ciSysId) {
        var svc = new GlideRecord('x_1980074_itom_i_0_mon_svc');
        svc.addQuery('ci_reference', ciSysId);
        svc.setLimit(1);
        svc.query();

        return svc.next() ? svc.getValue('owner_group') : '';
    },

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
            eventGr.setValue('correlated_incident', existing.getUniqueValue());
            eventGr.update();
            this._escalateIfMoreSevere(existing, eventGr);
            return existing.getUniqueValue();
        }

        var severity = eventGr.getValue('severity');
        var priorityMap = this.mapSeverityToImpactUrgency(severity);

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
        inc.setValue('state', '2');

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

        var problemEvaluator = new ITOMProblemCandidateEvaluator();
        problemEvaluator.evaluate(ciSysId);

        return incSysId;
    },

    // Escalates an already-open correlated incident when a new Down event
    // is more severe than what's currently recorded on it. Never de-escalates.
    _escalateIfMoreSevere: function (incidentGr, eventGr) {
        var severity = eventGr.getValue('severity');
        var newPriority = this.mapSeverityToImpactUrgency(severity);

        var currentImpact = parseInt(incidentGr.getValue('impact'), 10);
        var currentUrgency = parseInt(incidentGr.getValue('urgency'), 10);
        var newImpact = parseInt(newPriority.impact, 10);
        var newUrgency = parseInt(newPriority.urgency, 10);

        var escalatedImpact = Math.min(currentImpact, newImpact);
        var escalatedUrgency = Math.min(currentUrgency, newUrgency);

        if (escalatedImpact === currentImpact && escalatedUrgency === currentUrgency) {
            return;
        }

        incidentGr.setValue('impact', escalatedImpact.toString());
        incidentGr.setValue('urgency', escalatedUrgency.toString());
        incidentGr.update();

        gs.info('[ITOM Health] Escalated incident ' + incidentGr.getUniqueValue() +
            ' - a new "' + severity + '" event on the same CI is more severe than its recorded impact/urgency.');
    },

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
            inc.setValue('state', '6');
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
