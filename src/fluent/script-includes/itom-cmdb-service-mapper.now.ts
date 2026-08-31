import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * CMDB / CI relationship awareness. See src/server/script-includes/itom-cmdb-service-mapper.js
 * for the implementation and full rationale.
 */
export const itomCmdbServiceMapper = ScriptInclude({
    $id: Now.ID['script-include-itom-cmdb-service-mapper'],
    name: 'ITOMCmdbServiceMapper',
    active: true,
    accessibleFrom: 'package_private',
    description: 'Resolves the parent Business Service (if any) for a CI by walking CMDB relationships - a lightweight simulation of Service Mapping impact awareness.',
    script: Now.include('../../server/script-includes/itom-cmdb-service-mapper.js'),
})
