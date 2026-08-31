import '@servicenow/sdk/global'
import { ScheduledScript } from '@servicenow/sdk/core'
import { checkStaleMonitoredServices } from '../../server/scheduled-scripts/stale-monitored-service-check'

/**
 * Heartbeat/monitoring check (ITOM concept): runs every 15 minutes and
 * degrades any Monitored Service that hasn't received a Service Event in
 * that window to "Unknown". See
 * src/server/scheduled-scripts/stale-monitored-service-check.ts for the
 * logic.
 *
 * Adopted (via an explicit key in keys.ts) from the scheduled job already
 * present on the instance from the initial PDI pull.
 */
export const staleMonitoredServiceCheck = ScheduledScript({
    $id: Now.ID['job-stale-monitored-service-check'],
    name: 'ITOM Stale Monitored Service Check',
    active: true,
    frequency: 'periodically',
    executionInterval: { minutes: 15 },
    script: checkStaleMonitoredServices,
})
