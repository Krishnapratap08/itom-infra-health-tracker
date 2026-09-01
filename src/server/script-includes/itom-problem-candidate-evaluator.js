var ITOMProblemCandidateEvaluator = Class.create();
ITOMProblemCandidateEvaluator.prototype = {
    initialize: function () {
        this.AUTO_INCIDENT_TAG = '[ITOM Auto]';
        this.THRESHOLD = 3;
        this.WINDOW_HOURS = 24;
    },

    evaluate: function (ciSysId) {
        if (!ciSysId) {
            return false;
        }

        var windowStart = new GlideDateTime();
        windowStart.addSeconds(-1 * this.WINDOW_HOURS * 60 * 60);

        var incidentCount = new GlideRecord('incident');
        incidentCount.addQuery('cmdb_ci', ciSysId);
        incidentCount.addQuery('short_description', 'STARTSWITH', this.AUTO_INCIDENT_TAG);
        incidentCount.addQuery('sys_created_on', '>=', windowStart.getValue());
        incidentCount.query();

        var count = 0;
        while (incidentCount.next()) {
            count++;
        }

        if (count < this.THRESHOLD) {
            return false;
        }

        gs.info('[ITOM Health] CI ' + ciSysId + ' has generated ' + count +
            ' auto-created incident(s) in the last ' + this.WINDOW_HOURS +
            'h - flagging as Problem candidate.');

        this._flagMonitoredServicesForCi(ciSysId);
        return true;
    },

    // Not filtering on problem_candidate=false: a boolean addQuery() on a
    // scoped GlideRecord doesn't reliably match, and re-flagging an
    // already-true record is harmless.
    _flagMonitoredServicesForCi: function (ciSysId) {
        var svc = new GlideRecord('x_1980074_itom_i_0_mon_svc');
        svc.addQuery('ci_reference', ciSysId);
        svc.query();

        var matched = 0;
        var flagged = 0;
        while (svc.next()) {
            matched++;
            if (svc.getValue('problem_candidate') === 'true') {
                continue;
            }
            svc.setValue('problem_candidate', true);
            var updateResult = svc.update();
            if (!updateResult) {
                gs.error('[ITOM Health] Failed to flag Monitored Service ' + svc.getUniqueValue() +
                    ' as Problem candidate: ' + svc.getLastErrorMessage());
                continue;
            }
            flagged++;
        }

        gs.info('[ITOM Health] Problem-candidate flagging for CI ' + ciSysId + ': ' +
            matched + ' Monitored Service(s) matched, ' + flagged + ' newly flagged.');
    },

    type: 'ITOMProblemCandidateEvaluator',
};
