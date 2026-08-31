/**
 * Table: Service Event (x_1980074_itom_i_0_svc_evt)
 * ---------------------------------------------------------------------------
 * Represents a single normalized monitoring event/alert about a CI - the
 * ITOM equivalent of a row in em_event after an Event Management source
 * (SolarWinds, SCOM, a cloud monitor, etc.) has fed a raw alert into the
 * platform.
 *
 * Real ServiceNow Event Management pipeline this simulates:
 *   Monitoring tool alert -> em_event (raw event) -> Event Rule / binding
 *   -> em_alert (correlated alert) -> Alert Management -> Incident
 *
 * Here that whole pipeline is compressed into one table + one business
 * rule for demo purposes: this table stands in for "a correlated event
 * that is ready to be evaluated," and the Auto Incident on Service Event
 * business rule stands in for the Alert Management -> Incident hand-off.
 */
import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, ReferenceColumn, DateTimeColumn } from '@servicenow/sdk/core'

export const x_1980074_itom_i_0_svc_evt = Table({
    name: 'x_1980074_itom_i_0_svc_evt',
    label: 'Service Event',
    display: 'event_source',
    accessibleFrom: 'public',
    allowWebServiceAccess: true,
    actions: { read: true },
    attributes: {
        enforce_dot_walk_cross_scope_access: true,
    },
    // Note: field help text is set via `label: [{ label, help }]` (a
    // Documentation[] entry) rather than a sibling `help:` property -
    // that's the shape the build actually threads through to the
    // sys_documentation.help column.
    schema: {
        event_source: StringColumn({
            label: [{ label: 'Event Source', help: 'Name of the monitoring tool/integration that raised this event (e.g. "SolarWinds", "Azure Monitor", "Synthetic Check"). Free text, mirroring em_event.source.' }],
            maxLength: 200,
        }),

        // Same CI the Monitored Service points at - this shared reference
        // is the correlation key: "does an open incident already exist for
        // THIS CI" is the duplicate-suppression check in the business rule.
        ci_reference: ReferenceColumn({
            label: [{ label: 'CI Reference', help: 'The Configuration Item this event was raised against. Used to correlate this event to a Monitored Service and to any existing open incident for the same CI.' }],
            referenceTable: 'cmdb_ci',
        }),

        severity: ChoiceColumn({
            label: [{ label: 'Severity', help: 'Monitoring severity of the event, mapped to Incident Impact/Urgency via the standard ITIL priority matrix (see ITOMIncidentManager.mapSeverityToImpactUrgency).' }],
            maxLength: 40,
            default: 'info',
            choices: {
                critical: { label: 'Critical', sequence: 1 },
                major: { label: 'Major', sequence: 2 },
                minor: { label: 'Minor', sequence: 3 },
                warning: { label: 'Warning', sequence: 4 },
                info: { label: 'Info', sequence: 5 },
            },
        }),

        event_type: ChoiceColumn({
            label: [{ label: 'Event Type', help: 'What the event reports: Down triggers incident creation/correlation, Up triggers auto-resolution, Warning is logged only (no incident action) in this simplified simulation.' }],
            maxLength: 40,
            choices: {
                down: { label: 'Down', sequence: 1 },
                up: { label: 'Up', sequence: 2 },
                warning: { label: 'Warning', sequence: 3 },
            },
        }),

        timestamp: DateTimeColumn({
            label: [{ label: 'Timestamp', help: 'When the underlying condition was observed by the monitoring source (as opposed to sys_created_on, which is when the record was written).' }],
        }),

        // Populated by the business rule once correlation runs - this is
        // the audit trail back from "what incident did this event cause".
        correlated_incident: ReferenceColumn({
            label: [{ label: 'Correlated Incident', help: 'The incident this event created or resolved, set automatically by the Auto Incident on Service Event business rule. Blank until correlation runs.' }],
            referenceTable: 'incident',
        }),
    },
    index: [
        { name: 'idx_svc_evt_ci_reference', element: 'ci_reference', unique: false },
        { name: 'idx_svc_evt_correlated_incident', element: 'correlated_incident', unique: false },
    ],
})
