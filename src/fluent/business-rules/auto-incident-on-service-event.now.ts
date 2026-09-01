import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'

export const autoIncidentOnServiceEvent = BusinessRule({
    $id: Now.ID['br-auto-incident-on-service-event'],
    name: 'Auto Incident on Service Event',
    table: 'x_1980074_itom_i_0_svc_evt',
    when: 'after',
    action: ['insert'],
    order: 100,
    active: true,
    description: 'Creates/escalates incidents for Down events and auto-resolves them for Up events on the related CI.',
    script: Now.include('../../server/business-rules/auto-incident-on-service-event.js'),
})
