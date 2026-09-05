import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'
import { RESTAPIRequest, RESTAPIResponse } from '@servicenow/glide/sn_ws_int'

const VALID_SEVERITIES = ['critical', 'major', 'minor', 'warning', 'info']
const VALID_EVENT_TYPES = ['down', 'up', 'warning']

export function ingestServiceEvent(request: RESTAPIRequest, response: RESTAPIResponse): void {
    const body = request.body && request.body.data ? request.body.data : {}

    const severity = body.severity
    const eventType = body.event_type

    if (VALID_SEVERITIES.indexOf(severity) === -1) {
        response.setStatus(400)
        response.setBody({ error: 'severity must be one of: ' + VALID_SEVERITIES.join(', ') })
        return
    }

    if (VALID_EVENT_TYPES.indexOf(eventType) === -1) {
        response.setStatus(400)
        response.setBody({ error: 'event_type must be one of: ' + VALID_EVENT_TYPES.join(', ') })
        return
    }

    let ciSysId: string | undefined = body.ci_reference

    if (!ciSysId && body.ci_name) {
        const ci = new GlideRecord<string>('cmdb_ci')
        ci.addQuery('name', body.ci_name)
        ci.setLimit(1)
        ci.query()
        if (ci.next()) {
            ciSysId = ci.getUniqueValue()
        }
    }

    if (!ciSysId) {
        response.setStatus(400)
        response.setBody({ error: 'ci_reference (sys_id) or ci_name (must resolve to exactly one CI) is required' })
        return
    }

    const evt = new GlideRecord('x_1980074_itom_i_0_svc_evt')
    evt.initialize()
    evt.setValue('event_source', body.event_source || 'REST Integration')
    evt.setValue('ci_reference', ciSysId)
    evt.setValue('severity', severity)
    evt.setValue('event_type', eventType)
    evt.setValue('timestamp', body.timestamp || new GlideDateTime().getDisplayValue())

    const evtSysId = evt.insert()
    if (!evtSysId) {
        gs.error('[ITOM Health] REST ingest failed to create Service Event: ' + evt.getLastErrorMessage())
        response.setStatus(500)
        response.setBody({ error: 'Failed to create Service Event: ' + evt.getLastErrorMessage() })
        return
    }

    const created = new GlideRecord('x_1980074_itom_i_0_svc_evt')
    created.get(evtSysId)

    response.setStatus(201)
    response.setBody({
        sys_id: evtSysId,
        correlated_incident: created.getValue('correlated_incident') || null,
    })
}
