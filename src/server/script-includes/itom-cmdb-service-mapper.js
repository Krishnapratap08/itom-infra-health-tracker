var ITOMCmdbServiceMapper = Class.create();
ITOMCmdbServiceMapper.prototype = {
    initialize: function () {},

    getParentBusinessService: function (ciSysId) {
        if (!ciSysId) {
            return null;
        }

        var rel = new GlideRecord('cmdb_rel_ci');
        rel.addQuery('child', ciSysId);
        rel.query();

        while (rel.next()) {
            var parentSysId = rel.getValue('parent');

            var service = new GlideRecord('cmdb_ci_service');
            if (service.get(parentSysId)) {
                return {
                    sysId: parentSysId,
                    name: service.getValue('name'),
                };
            }
        }

        return null;
    },

    describeBusinessServiceImpact: function (ciSysId) {
        var service = this.getParentBusinessService(ciSysId);
        if (!service) {
            return '';
        }
        return ' (impacts Business Service: ' + service.name + ')';
    },

    type: 'ITOMCmdbServiceMapper',
};
