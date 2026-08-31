/**
 * Table: Monitored Service (x_1980074_itom_i_0_mon_svc)
 * ---------------------------------------------------------------------------
 * Represents a business/technical service being watched by the ITOM
 * monitoring layer (analogous to a CI health record in a real Event
 * Management implementation, e.g. an Operational Collector / CI Health
 * dashboard in ServiceNow ITOM).
 *
 * Each row answers: "What service, backed by which CI, is currently in what
 * health state, and who owns it operationally?"
 *
 * ITOM concept demonstrated: the "current state" view of infrastructure
 * health that Event Management continuously updates as Service Events
 * arrive (see the Auto Incident on Service Event business rule) and that
 * the heartbeat scheduled job degrades to "Unknown" when monitoring goes
 * silent.
 */
import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, ReferenceColumn, DateTimeColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_1980074_itom_i_0_mon_svc = Table({
    name: 'x_1980074_itom_i_0_mon_svc',
    label: 'Monitored Service',
    display: 'service_name',
    accessibleFrom: 'public',
    allowWebServiceAccess: true,
    // Only read is opened up cross-scope by default; write operations stay
    // gated behind the application's own ACLs/roles (see fluent/acls).
    actions: { read: true },
    attributes: {
        // Preserve dot-walking into CI/Owner Group reference fields from
        // reports and other scoped apps without extra cross-scope grants.
        enforce_dot_walk_cross_scope_access: true,
    },
    schema: {
        // Note: field help text is set via `label: [{ label, help }]` (a
        // Documentation[] entry) rather than a sibling `help:` property -
        // that's the shape the build actually threads through to the
        // sys_documentation.help column.
        service_name: StringColumn({
            label: [{ label: 'Service Name', help: 'Business-friendly name of the monitored service (e.g. "Order Management API"). Shown on incidents and reports raised against this service.' }],
            maxLength: 200,
            mandatory: true,
        }),

        // CMDB awareness: every monitored service maps to exactly one CI.
        // This is the join point Event Management and the CMDB/Service
        // Mapping helper use to correlate raw events back to real
        // infrastructure and, from there, up to a Business Service.
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
            label: [{ label: 'Owner Group', help: 'Assignment group operationally responsible for this service. Copied onto auto-created incidents so they route to the right team (ITIL assignment).' }],
            referenceTable: 'sys_user_group',
        }),

        // Problem Management touchpoint (ITIL Incident -> Problem
        // escalation). Set by ITOMProblemCandidateEvaluator once the CI
        // behind this service has generated 3+ auto-created incidents in a
        // rolling 24-hour window - a classic "stop firefighting symptoms,
        // investigate the root cause" signal.
        problem_candidate: BooleanColumn({
            label: [{ label: 'Problem Candidate', help: 'Auto-set to true when the underlying CI has generated 3 or more auto-created incidents within 24 hours. Signals that this recurring issue is a Problem Management candidate rather than a series of unrelated incidents.' }],
            default: false,
        }),
    },
    index: [
        { name: 'idx_mon_svc_ci_reference', element: 'ci_reference', unique: false },
        { name: 'idx_mon_svc_owner_group', element: 'owner_group', unique: false },
    ],
})
