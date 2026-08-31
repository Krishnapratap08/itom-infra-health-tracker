import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * Reusable Event Management -> Incident correlation/resolution logic,
 * called from the Auto Incident on Service Event business rule. See
 * src/server/script-includes/itom-incident-manager.js for the
 * implementation and full rationale (why this lives in a Script Include
 * instead of inline in the Business Rule).
 */
export const itomIncidentManager = ScriptInclude({
    $id: Now.ID['script-include-itom-incident-manager'],
    name: 'ITOMIncidentManager',
    active: true,
    accessibleFrom: 'package_private',
    description: 'Creates and resolves incidents from Service Events: correlation/duplicate-suppression, ITIL severity-to-impact/urgency mapping, assignment group lookup, and Problem-candidate evaluation.',
    script: Now.include('../../server/script-includes/itom-incident-manager.js'),
})
