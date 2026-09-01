import '@servicenow/sdk/global'
import { ScheduledScript } from '@servicenow/sdk/core'
import { checkStaleMonitoredServices } from '../../server/scheduled-scripts/stale-monitored-service-check'

export const staleMonitoredServiceCheck = ScheduledScript({
    $id: Now.ID['job-stale-monitored-service-check'],
    name: 'ITOM Stale Monitored Service Check',
    active: true,
    frequency: 'periodically',
    executionInterval: { minutes: 15 },
    script: checkStaleMonitoredServices,
})
