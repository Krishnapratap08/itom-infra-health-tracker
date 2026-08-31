/**
 * Auto Incident on Service Event - business rule script
 * ---------------------------------------------------------------------------
 * Deliberately thin: it only reads the triggering event and dispatches to
 * ITOMIncidentManager. All correlation/creation/resolution logic lives in
 * that Script Include so it stays reusable and unit-testable outside the
 * business rule trigger context - see the `script-include-guide` topic and
 * src/server/script-includes/itom-incident-manager.js for why.
 *
 * Written as a plain (non-modular) script loaded via Now.include(), rather
 * than a TypeScript module importing the Script Include class, because a
 * typed `@servicenow/glide/<scope>` import for a Script Include only
 * resolves once that Script Include has already been deployed and its
 * types re-fetched via `now-sdk dependencies` - a chicken-and-egg problem
 * on a first-time build. In this non-modular form, ITOMIncidentManager is
 * simply available by class name at runtime, same scope, no import needed.
 *
 * Event Management mapping (simulated pipeline):
 *   Monitoring alert -> Service Event (this table) -> [this rule] ->
 *   ITOMIncidentManager (correlation) -> Incident created/resolved
 */
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
        // 'warning' events are logged only in this simplified simulation.
        // A full Event Management implementation would still correlate
        // them into em_alert for visibility even though they don't drive
        // incident state on their own.
        gs.debug('[ITOM Health] Warning event ' + current.getUniqueValue() + ' received for CI ' + ciRef + ' - no incident action taken.');
    }
})();
