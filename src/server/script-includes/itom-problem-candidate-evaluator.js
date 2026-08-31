/**
 * ITOMProblemCandidateEvaluator
 * ---------------------------------------------------------------------------
 * Incident -> Problem Management touchpoint (ITIL).
 *
 * ITIL treats Incident Management (restore service fast) and Problem
 * Management (find and fix the root cause) as related but distinct
 * processes. A single incident rarely justifies opening a Problem record,
 * but a *pattern* of incidents against the same CI does - that pattern is
 * exactly what this script include watches for.
 *
 * Rule of thumb implemented here: if a CI has generated 3 or more
 * auto-created incidents within a rolling 24-hour window, flag the
 * Monitored Service behind that CI as a "Problem candidate" so a Problem
 * Manager can decide whether to formally open a Problem record and start
 * root-cause analysis, instead of the team continuing to fight the same
 * fire incident-by-incident.
 *
 * Single responsibility: this script include only evaluates and flags -
 * it does not create Problem records itself (a real implementation would
 * likely still leave that as a deliberate human decision, or plug in here
 * with a `createProblemRecord()` method once that step is automated).
 */
var ITOMProblemCandidateEvaluator = Class.create();
ITOMProblemCandidateEvaluator.prototype = {
    initialize: function () {
        this.AUTO_INCIDENT_TAG = '[ITOM Auto]';
        this.THRESHOLD = 3;
        this.WINDOW_HOURS = 24;
    },

    /**
     * Counts auto-created incidents against a CI within the rolling
     * window, and flags the Monitored Service(s) mapped to that CI as a
     * Problem candidate once the threshold is met.
     *
     * @param {string} ciSysId - sys_id of the cmdb_ci to evaluate
     * @returns {boolean} true if the CI was (or already is) flagged
     */
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

    /**
     * Marks every Monitored Service mapped to the given CI as a Problem
     * candidate. A CI could theoretically back more than one Monitored
     * Service record, so this updates all matches rather than assuming
     * one-to-one.
     *
     * @param {string} ciSysId
     */
    _flagMonitoredServicesForCi: function (ciSysId) {
        var svc = new GlideRecord('x_1980074_itom_i_0_mon_svc');
        svc.addQuery('ci_reference', ciSysId);
        svc.addQuery('problem_candidate', false);
        svc.query();

        while (svc.next()) {
            svc.setValue('problem_candidate', true);
            svc.update();
        }
    },

    type: 'ITOMProblemCandidateEvaluator',
};
