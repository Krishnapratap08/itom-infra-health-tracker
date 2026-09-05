var ITOMCmdbHealthChecker = Class.create();
ITOMCmdbHealthChecker.prototype = {
    initialize: function () {
        this.RETIRED_INSTALL_STATUS = '7';
    },

    runHealthCheck: function () {
        var ciCounts = this._countMonitoredServicesPerCi();

        var svc = new GlideRecord('x_1980074_itom_i_0_mon_svc');
        svc.query();

        var checked = 0;
        var flagged = 0;

        while (svc.next()) {
            var issues = this._findIssues(svc, ciCounts);
            var hasIssue = issues.length > 0;

            svc.setValue('cmdb_health_issue', hasIssue);
            svc.setValue('cmdb_health_notes', issues.join('; '));
            svc.update();

            checked++;
            if (hasIssue) {
                flagged++;
            }
        }

        gs.info('[ITOM Health] CMDB Health Check complete: ' + checked + ' Monitored Service(s) checked, ' + flagged + ' with issues.');
    },

    _findIssues: function (svc, ciCounts) {
        var issues = [];
        var ciSysId = svc.getValue('ci_reference');

        if (!ciSysId) {
            issues.push('No CI reference set');
            return issues;
        }

        var ci = new GlideRecord('cmdb_ci');
        if (!ci.get(ciSysId)) {
            issues.push('CI reference points to a CI that no longer exists');
        } else if (ci.getValue('install_status') === this.RETIRED_INSTALL_STATUS) {
            issues.push('CI is Retired');
        }

        if (ciCounts[ciSysId] > 1) {
            issues.push('CI is mapped to ' + ciCounts[ciSysId] + ' Monitored Services (duplicate mapping)');
        }

        if (!svc.getValue('owner_group')) {
            issues.push('No Owner Group assigned');
        }

        return issues;
    },

    _countMonitoredServicesPerCi: function () {
        var counts = {};
        var svc = new GlideRecord('x_1980074_itom_i_0_mon_svc');
        svc.addNotNullQuery('ci_reference');
        svc.query();

        while (svc.next()) {
            var ciSysId = svc.getValue('ci_reference');
            counts[ciSysId] = (counts[ciSysId] || 0) + 1;
        }

        return counts;
    },

    type: 'ITOMCmdbHealthChecker',
};
