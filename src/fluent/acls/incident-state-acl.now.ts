/**
 * ACL: incident.state (field-level write restriction)
 * ---------------------------------------------------------------------------
 * ITIL/RBAC rationale:
 *
 * Auto-created incidents (short_description starts with "[ITOM Auto]") are
 * meant to be resolved by the automation itself - the Auto Incident on
 * Service Event business rule closes them the moment an "Up" event proves
 * the service recovered. A regular itom_health_user should not be able to
 * hand-close (or otherwise change the state of) one of these incidents,
 * because doing so would mask whether the underlying service actually
 * recovered - exactly the kind of silent data-integrity gap RBAC exists to
 * prevent.
 *
 * The script only restricts *auto-created* incidents. Ordinary,
 * manually-raised incidents are unaffected (script returns true
 * immediately), so this ACL is additive to standard incident.state ACLs,
 * not a replacement for them.
 *
 * Adopted (via an explicit key in keys.ts) from the ACL already present on
 * the instance from the initial PDI pull.
 *
 * Deliberately no `roles` on this ACL: the "Trinity" model ANDs every
 * specified check together, so adding `roles: [itomHealthAdmin]` here
 * would require itom_health_admin for *every* incident's state change
 * platform-wide, not just our auto-created ones. The role check instead
 * lives entirely inside the script, scoped to only the incidents this
 * automation owns - see the script below.
 */
import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'

export const incidentStateWriteAcl = Acl({
    $id: Now.ID['acl-incident-state-write'],
    type: 'record',
    table: 'incident',
    field: 'state',
    operation: 'write',
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Restricts changing the state of auto-created ITOM incidents to itom_health_admin (or platform admin). Non-automation state changes on ordinary incidents are unaffected.',
    script: `
        var shortDesc = current.getValue('short_description') || '';
        if (shortDesc.indexOf('[ITOM Auto]') !== 0) {
            // Not one of ours - defer to normal incident.state ACLs.
            answer = true;
        } else {
            answer = gs.hasRole('x_1980074_itom_i_0.itom_health_admin');
        }
    `,
})
