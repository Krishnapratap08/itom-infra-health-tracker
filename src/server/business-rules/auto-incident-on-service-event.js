(function () {
    var eventType = current.getValue('event_type');
    var ciRef = current.getValue('ci_reference');

    if (!ciRef) {
        gs.debug('[ITOM Health] Skipping Service Event ' + current.getUniqueValue() + ' - no CI reference set.');
        return;
    }

    var incidentManager = new ITOMIncidentManager();

    if (eventType === 'down') {
        incidentManager.createIncidentForDownEvent(current);
    } else if (eventType === 'up') {
        incidentManager.resolveIncidentsForUpEvent(current);
    } else {
        gs.debug('[ITOM Health] Warning event ' + current.getUniqueValue() + ' received for CI ' + ciRef + ' - no incident action taken.');
    }
})();
