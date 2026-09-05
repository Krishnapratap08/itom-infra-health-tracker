var ITOMCmdbServiceMapper = Class.create();
ITOMCmdbServiceMapper.prototype = {
    initialize: function () {
        this.MAX_DEPTH = 5;
    },

    // BFS up the "Depends on::Used by" graph, hop by hop, until a
    // cmdb_ci_service (or subtype) parent is found or MAX_DEPTH is hit.
    getParentBusinessService: function (ciSysId) {
        if (!ciSysId) {
            return null;
        }

        var visited = {};
        visited[ciSysId] = true;
        var queue = [ciSysId];
        var depth = 0;

        while (queue.length > 0 && depth < this.MAX_DEPTH) {
            var nextQueue = [];

            for (var i = 0; i < queue.length; i++) {
                var rel = new GlideRecord('cmdb_rel_ci');
                rel.addQuery('child', queue[i]);
                rel.query();

                while (rel.next()) {
                    var parentSysId = rel.getValue('parent');
                    if (visited[parentSysId]) {
                        continue;
                    }
                    visited[parentSysId] = true;

                    var service = new GlideRecord('cmdb_ci_service');
                    if (service.get(parentSysId)) {
                        return {
                            sysId: parentSysId,
                            name: service.getValue('name'),
                            depth: depth + 1,
                        };
                    }

                    nextQueue.push(parentSysId);
                }
            }

            queue = nextQueue;
            depth++;
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
