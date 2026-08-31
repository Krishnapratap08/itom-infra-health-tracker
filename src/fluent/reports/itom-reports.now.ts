import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

/**
 * Reports (sys_report)
 * ---------------------------------------------------------------------------
 * Two reports are adopted (via explicit keys in keys.ts) from the reports
 * already present on the instance from the initial PDI pull, plus one new
 * report surfacing the Problem Management touchpoint.
 *
 * There's no dedicated Fluent API for reports - sys_report is authored via
 * the generic Record() API, per the `record-api` topic.
 */

// "Event Volume by Severity" - donut chart on Service Event grouped by
// severity. Answers: "what's the mix of alert severity coming in right
// now?" - the first thing a NOC dashboard shows.
export const eventVolumeBySeverityReport = Record({
    $id: Now.ID['report-event-volume-by-severity'],
    table: 'sys_report',
    data: {
        title: 'ITOM Health – Event Volume by Severity',
        table: 'x_1980074_itom_i_0_svc_evt',
        type: 'donut',
        field: 'severity',
        active: true,
        is_published: true,
    },
})

// "Open Incidents by CI" - bar chart on Incident, scoped to open,
// auto-created incidents, grouped by the CI they were raised against.
// Answers: "which CIs are currently generating the most incident load?" -
// a leading indicator that also feeds the Problem-candidate conversation.
export const openIncidentsByCiReport = Record({
    $id: Now.ID['report-open-incidents-by-ci'],
    table: 'sys_report',
    data: {
        title: 'ITOM Health – Open Incidents by CI',
        table: 'incident',
        type: 'bar',
        field: 'cmdb_ci',
        filter: 'stateNOT IN6,7^short_descriptionSTARTSWITH[ITOM Auto]',
        active: true,
        is_published: true,
    },
})

// "Problem Candidate Services" - list report of Monitored Services flagged
// by ITOMProblemCandidateEvaluator. Answers: "which recurring issues
// should Problem Management be looking at right now?"
export const problemCandidateServicesReport = Record({
    $id: Now.ID['report-problem-candidate-services'],
    table: 'sys_report',
    data: {
        title: 'ITOM Health – Problem Candidate Services',
        table: 'x_1980074_itom_i_0_mon_svc',
        type: 'list',
        filter: 'problem_candidate=true',
        active: true,
        is_published: true,
    },
})
