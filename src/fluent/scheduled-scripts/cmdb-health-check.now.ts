import '@servicenow/sdk/global'
import { ScheduledScript } from '@servicenow/sdk/core'

export const cmdbHealthCheck = ScheduledScript({
    $id: Now.ID['job-cmdb-health-check'],
    name: 'ITOM CMDB Health Check',
    active: true,
    frequency: 'daily',
    executionTime: { hours: 2, minutes: 0, seconds: 0 },
    script: Now.include('../../server/scheduled-scripts/cmdb-health-check.js'),
})
