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
    schema: {
        event_source: StringColumn({
            label: [{ label: 'Event Source', help: 'Name of the monitoring tool/integration that raised this event (e.g. "SolarWinds", "Azure Monitor").' }],
            maxLength: 200,
        }),

        ci_reference: ReferenceColumn({
            label: [{ label: 'CI Reference', help: 'The Configuration Item this event was raised against. Used to correlate this event to a Monitored Service and to any existing open incident for the same CI.' }],
            referenceTable: 'cmdb_ci',
        }),

        severity: ChoiceColumn({
            label: [{ label: 'Severity', help: 'Monitoring severity of the event, mapped to Incident Impact/Urgency via the standard ITIL priority matrix.' }],
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
            label: [{ label: 'Event Type', help: 'Down triggers incident creation/correlation, Up triggers auto-resolution, Warning is logged only.' }],
            maxLength: 40,
            choices: {
                down: { label: 'Down', sequence: 1 },
                up: { label: 'Up', sequence: 2 },
                warning: { label: 'Warning', sequence: 3 },
            },
        }),

        timestamp: DateTimeColumn({
            label: [{ label: 'Timestamp', help: 'When the underlying condition was observed by the monitoring source.' }],
        }),

        correlated_incident: ReferenceColumn({
            label: [{ label: 'Correlated Incident', help: 'The incident this event created, escalated, or resolved, set automatically by the Auto Incident on Service Event business rule.' }],
            referenceTable: 'incident',
        }),
    },
    index: [
        { name: 'idx_svc_evt_ci_reference', element: 'ci_reference', unique: false },
        { name: 'idx_svc_evt_correlated_incident', element: 'correlated_incident', unique: false },
    ],
})
