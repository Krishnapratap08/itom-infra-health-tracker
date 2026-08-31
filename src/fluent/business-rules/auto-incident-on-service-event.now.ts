import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'

/**
 * Event Management simulation: after a Service Event is inserted, correlate
 * it to an incident (create on Down, auto-resolve on Up). See
 * src/server/business-rules/auto-incident-on-service-event.ts and
 * ITOMIncidentManager for the actual logic - this record only wires the
 * trigger.
 *
 * Adopted (via an explicit key in keys.ts) from the business rule already
 * present on the instance from the initial PDI pull.
 */
export const autoIncidentOnServiceEvent = BusinessRule({
    $id: Now.ID['br-auto-incident-on-service-event'],
    name: 'Auto Incident on Service Event',
    table: 'x_1980074_itom_i_0_svc_evt',
    when: 'after',
    action: ['insert'],
    order: 100,
    active: true,
    description: 'Creates incidents for Down events (with correlation to avoid duplicates) and auto-resolves them for Up events on the related CI.',
    script: Now.include('../../server/business-rules/auto-incident-on-service-event.js'),
})
