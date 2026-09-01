import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

export const itomCmdbServiceMapper = ScriptInclude({
    $id: Now.ID['script-include-itom-cmdb-service-mapper'],
    name: 'ITOMCmdbServiceMapper',
    active: true,
    accessibleFrom: 'package_private',
    description: 'Resolves the parent Business Service (if any) for a CI by walking CMDB relationships.',
    script: Now.include('../../server/script-includes/itom-cmdb-service-mapper.js'),
})
