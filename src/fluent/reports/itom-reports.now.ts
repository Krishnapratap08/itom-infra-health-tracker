import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

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

export const cmdbHealthIssuesReport = Record({
    $id: Now.ID['report-cmdb-health-issues'],
    table: 'sys_report',
    data: {
        title: 'ITOM Health – CMDB Health Issues',
        table: 'x_1980074_itom_i_0_mon_svc',
        type: 'list',
        filter: 'cmdb_health_issue=true',
        active: true,
        is_published: true,
    },
})
