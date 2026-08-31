/**
 * ACLs: Service Event (x_1980074_itom_i_0_svc_evt)
 * ---------------------------------------------------------------------------
 * Same read-vs-write split as Monitored Service:
 *
 *   read              -> itom_health_user, itom_health_admin
 *   write/create/delete -> itom_health_admin only
 *
 * In a production Event Management setup, events are written by an
 * integration user (MID Server / API credentials), not by end users
 * through the UI - restricting create/write/delete to the admin role here
 * models that same principle of "events are a system-of-record fed by
 * automation, not hand-edited."
 *
 * Adopted (via explicit keys in keys.ts) from the ACLs already present on
 * the instance from the initial PDI pull.
 */
import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'
import { itomHealthUser, itomHealthAdmin } from '../roles/roles.now'

export const svcEvtReadAcl = Acl({
    $id: Now.ID['acl-svc-evt-read'],
    type: 'record',
    table: 'x_1980074_itom_i_0_svc_evt',
    operation: 'read',
    decisionType: 'allow',
    roles: [itomHealthUser, itomHealthAdmin],
    adminOverrides: true,
    description: 'Both ITOM Health personas can view Service Event records.',
})

export const svcEvtWriteAcl = Acl({
    $id: Now.ID['acl-svc-evt-write'],
    type: 'record',
    table: 'x_1980074_itom_i_0_svc_evt',
    operation: 'write',
    decisionType: 'allow',
    roles: [itomHealthAdmin],
    adminOverrides: true,
    description: 'Only ITOM Health admins (or the automation that inserts events) can edit Service Event records.',
})

export const svcEvtCreateAcl = Acl({
    $id: Now.ID['acl-svc-evt-create'],
    type: 'record',
    table: 'x_1980074_itom_i_0_svc_evt',
    operation: 'create',
    decisionType: 'allow',
    roles: [itomHealthAdmin],
    adminOverrides: true,
    description: 'Only ITOM Health admins can create Service Event records (represents the monitoring integration account in this demo).',
})

export const svcEvtDeleteAcl = Acl({
    $id: Now.ID['acl-svc-evt-delete'],
    type: 'record',
    table: 'x_1980074_itom_i_0_svc_evt',
    operation: 'delete',
    decisionType: 'allow',
    roles: [itomHealthAdmin],
    adminOverrides: true,
    description: 'Only ITOM Health admins can delete Service Event records.',
})
