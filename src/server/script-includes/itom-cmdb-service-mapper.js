/**
 * ITOMCmdbServiceMapper
 * ---------------------------------------------------------------------------
 * CMDB / CI relationship awareness (ITOM Service Mapping simulation).
 *
 * Given a CI, looks up whether it has a parent Business Service in the
 * CMDB relationship graph (cmdb_rel_ci) and returns enough information to
 * enrich an incident's short description with the *business* impact, not
 * just the technical CI name. This is a lightweight stand-in for what
 * Service Mapping / CSDM "Depends on::Used by" traversal gives you in a
 * full ITOM implementation: "this isn't just DatabaseServer2 that's down,
 * it's Order Management that's affected."
 *
 * Single responsibility: this script include only answers "what Business
 * Service (if any) sits above this CI?" - it does not touch incidents or
 * events, which keeps it independently testable and reusable from any
 * future automation (Problem, Change impact analysis, etc.).
 */
var ITOMCmdbServiceMapper = Class.create();
ITOMCmdbServiceMapper.prototype = {
    initialize: function () {},

    /**
     * Finds the nearest parent Business Service for a CI by walking the
     * CMDB relationship table (cmdb_rel_ci). A CI can have multiple
     * relationships; the first parent that is itself a cmdb_ci_service (or
     * subtype) is returned.
     *
     * @param {string} ciSysId - sys_id of the cmdb_ci to inspect
     * @returns {{sysId: string, name: string} | null}
     */
    getParentBusinessService: function (ciSysId) {
        if (!ciSysId) {
            return null;
        }

        var rel = new GlideRecord('cmdb_rel_ci');
        rel.addQuery('child', ciSysId);
        rel.query();

        while (rel.next()) {
            var parentSysId = rel.getValue('parent');

            // Querying the cmdb_ci_service table directly by sys_id only
            // returns a hit when that CI's class is cmdb_ci_service or one
            // of its subtypes, thanks to ServiceNow's table extension model.
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

    /**
     * Convenience wrapper used when building incident text: returns a
     * short " (impacts Business Service: X)" suffix, or an empty string
     * when the CI has no mapped Business Service.
     *
     * @param {string} ciSysId
     * @returns {string}
     */
    describeBusinessServiceImpact: function (ciSysId) {
        var service = this.getParentBusinessService(ciSysId);
        if (!service) {
            return '';
        }
        return ' (impacts Business Service: ' + service.name + ')';
    },

    type: 'ITOMCmdbServiceMapper',
};
