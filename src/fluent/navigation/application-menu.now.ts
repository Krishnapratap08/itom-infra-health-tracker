import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'
import { eventVolumeBySeverityReport, openIncidentsByCiReport, problemCandidateServicesReport, cmdbHealthIssuesReport } from '../reports/itom-reports.now'

const itomHealthMenu = ApplicationMenu({
    $id: Now.ID['itom-health-app-menu'],
    title: 'ITOM Infrastructure Health Tracker',
    hint: 'Event correlation, incident automation, and Problem-candidate tracking',
    description: 'Monitored Services, Service Events, and their derived reports.',
    active: true,
})

export const monitoredServiceModule = Record({
    $id: Now.ID['itom-health-module-mon-svc'],
    table: 'sys_app_module',
    data: {
        title: 'Monitored Service',
        application: itomHealthMenu,
        link_type: 'LIST',
        name: 'x_1980074_itom_i_0_mon_svc',
        active: true,
        order: 100,
    },
})

export const serviceEventModule = Record({
    $id: Now.ID['itom-health-module-svc-evt'],
    table: 'sys_app_module',
    data: {
        title: 'Service Event',
        application: itomHealthMenu,
        link_type: 'LIST',
        name: 'x_1980074_itom_i_0_svc_evt',
        active: true,
        order: 200,
    },
})

export const reportsSeparatorModule = Record({
    $id: Now.ID['itom-health-module-reports-separator'],
    table: 'sys_app_module',
    data: {
        title: 'Reports',
        application: itomHealthMenu,
        link_type: 'SEPARATOR',
        active: true,
        order: 300,
    },
})

export const eventVolumeReportModule = Record({
    $id: Now.ID['itom-health-module-report-event-volume'],
    table: 'sys_app_module',
    data: {
        title: 'Event Volume by Severity',
        application: itomHealthMenu,
        link_type: 'REPORT',
        report: eventVolumeBySeverityReport,
        active: true,
        order: 310,
    },
})

export const openIncidentsReportModule = Record({
    $id: Now.ID['itom-health-module-report-open-incidents'],
    table: 'sys_app_module',
    data: {
        title: 'Open Incidents by CI',
        application: itomHealthMenu,
        link_type: 'REPORT',
        report: openIncidentsByCiReport,
        active: true,
        order: 320,
    },
})

export const problemCandidateReportModule = Record({
    $id: Now.ID['itom-health-module-report-problem-candidates'],
    table: 'sys_app_module',
    data: {
        title: 'Problem Candidate Services',
        application: itomHealthMenu,
        link_type: 'REPORT',
        report: problemCandidateServicesReport,
        active: true,
        order: 330,
    },
})

export const cmdbHealthReportModule = Record({
    $id: Now.ID['itom-health-module-report-cmdb-health'],
    table: 'sys_app_module',
    data: {
        title: 'CMDB Health Issues',
        application: itomHealthMenu,
        link_type: 'REPORT',
        report: cmdbHealthIssuesReport,
        active: true,
        order: 340,
    },
})
