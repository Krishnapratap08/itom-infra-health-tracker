import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, ReferenceColumn, DateTimeColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_1980074_itom_i_0_mon_svc = Table({
    name: 'x_1980074_itom_i_0_mon_svc',
    label: 'Monitored Service',
    display: 'service_name',
    accessibleFrom: 'public',
    allowWebServiceAccess: true,
    actions: { read: true },
    attributes: {
        enforce_dot_walk_cross_scope_access: true,
    },
    schema: {
        service_name: StringColumn({
            label: [{ label: 'Service Name', help: 'Business-friendly name of the monitored service (e.g. "Order Management API"). Shown on incidents and reports raised against this service.' }],
            maxLength: 200,
            mandatory: true,
        }),

        ci_reference: ReferenceColumn({
            label: [{ label: 'CI Reference', help: 'The Configuration Item this service runs on. Service Events reference the same CI, which is how incoming events are correlated to this record.' }],
            referenceTable: 'cmdb_ci',
        }),

        status: ChoiceColumn({
            label: [{ label: 'Status', help: 'Current health status. Set by the Auto Incident business rule when Down/Up events arrive, and by the heartbeat scheduled job when no event has been received recently.' }],
            maxLength: 40,
            default: 'unknown',
            choices: {
                up: { label: 'Up', sequence: 1 },
                down: { label: 'Down', sequence: 2 },
                degraded: { label: 'Degraded', sequence: 3 },
                unknown: { label: 'Unknown', sequence: 4 },
            },
        }),

        last_checked: DateTimeColumn({
            label: [{ label: 'Last Checked', help: 'Timestamp of the most recent Service Event received for this service. The heartbeat job compares this against "now" to detect silent/stale monitoring.' }],
        }),

        owner_group: ReferenceColumn({
            label: [{ label: 'Owner Group', help: 'Assignment group operationally responsible for this service. Copied onto auto-created incidents so they route to the right team.' }],
            referenceTable: 'sys_user_group',
        }),

        problem_candidate: BooleanColumn({
            label: [{ label: 'Problem Candidate', help: 'Auto-set to true when the underlying CI has generated 3 or more auto-created incidents within 24 hours.' }],
            default: false,
        }),

        cmdb_health_issue: BooleanColumn({
            label: [{ label: 'CMDB Health Issue', help: 'Set by the CMDB Health Check job when this record has a missing/broken/duplicate CI reference or no owner group.' }],
            default: false,
        }),

        cmdb_health_notes: StringColumn({
            label: [{ label: 'CMDB Health Notes', help: 'Details of the CMDB health issue(s) found, refreshed on every run of the CMDB Health Check job.' }],
            maxLength: 500,
        }),
    },
    index: [
        { name: 'idx_mon_svc_ci_reference', element: 'ci_reference', unique: false },
        { name: 'idx_mon_svc_owner_group', element: 'owner_group', unique: false },
    ],
})
