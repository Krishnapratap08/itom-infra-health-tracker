import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'

// No `roles` here on purpose: roles + script are AND'ed together, so
// declaring roles would gate every incident's state change, not just ours.
// The role check lives entirely in the script, scoped to [ITOM Auto] incidents.
export const incidentStateWriteAcl = Acl({
    $id: Now.ID['acl-incident-state-write'],
    type: 'record',
    table: 'incident',
    field: 'state',
    operation: 'write',
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Restricts changing the state of auto-created ITOM incidents to itom_health_admin. Ordinary incidents are unaffected.',
    script: `
        var shortDesc = current.getValue('short_description') || '';
        if (shortDesc.indexOf('[ITOM Auto]') !== 0) {
            answer = true;
        } else {
            answer = gs.hasRole('x_1980074_itom_i_0.itom_health_admin');
        }
    `,
})
