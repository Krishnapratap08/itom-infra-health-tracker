import '@servicenow/sdk/global'
import { RestApi, Acl } from '@servicenow/sdk/core'
import { itomHealthAdmin } from '../roles/roles.now'
import { ingestServiceEvent } from '../../server/rest-apis/service-event-ingest'

const executeAcl = Acl({
    $id: Now.ID['acl-rest-service-event-execute'],
    type: 'rest_endpoint',
    name: 'itom_health_events_ingest',
    operation: 'execute',
    roles: [itomHealthAdmin],
    adminOverrides: true,
})

export const serviceEventIngestApi = RestApi({
    $id: Now.ID['rest-api-itom-health'],
    name: 'ITOM Health Events API',
    serviceId: 'itom_health',
    shortDescription: 'Inbound endpoint for monitoring tools to post Service Events.',
    consumes: 'application/json',
    produces: 'application/json',
    enforceAcl: [executeAcl],
    routes: [
        {
            $id: Now.ID['rest-route-events-post'],
            name: 'Ingest Service Event',
            path: '/events',
            method: 'POST',
            script: ingestServiceEvent,
            requestExample: JSON.stringify({
                event_source: 'SolarWinds',
                ci_reference: '<cmdb_ci sys_id>',
                severity: 'critical',
                event_type: 'down',
                timestamp: '2026-08-31 12:00:00',
            }),
        },
    ],
})
