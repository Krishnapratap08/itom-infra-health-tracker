import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

export const itomIncidentManager = ScriptInclude({
    $id: Now.ID['script-include-itom-incident-manager'],
    name: 'ITOMIncidentManager',
    active: true,
    accessibleFrom: 'package_private',
    description: 'Creates, escalates, and resolves incidents from Service Events: correlation, ITIL severity-to-impact/urgency mapping, assignment group lookup, and Problem-candidate evaluation.',
    script: Now.include('../../server/script-includes/itom-incident-manager.js'),
})
