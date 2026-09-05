import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

export const itomCmdbHealthChecker = ScriptInclude({
    $id: Now.ID['script-include-itom-cmdb-health-checker'],
    name: 'ITOMCmdbHealthChecker',
    active: true,
    accessibleFrom: 'package_private',
    description: 'Flags Monitored Services with missing/broken/duplicate CI references or no owner group.',
    script: Now.include('../../server/script-includes/itom-cmdb-health-checker.js'),
})
