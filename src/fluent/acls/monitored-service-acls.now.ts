/**
 * ACLs: Monitored Service (x_1980074_itom_i_0_mon_svc)
 * ---------------------------------------------------------------------------
 * RBAC rationale (see also fluent/roles/roles.now.ts and the security-guide
 * topic's "Trinity" model - roles AND condition AND script must all pass):
 *
 *   read   -> itom_health_user, itom_health_admin (both personas need to see
 *             service health on dashboards/lists).
 *   write / create / delete -> itom_health_admin only. Regular users should
 *             never be able to add a fake service, edit ownership, or delete
 *             the health record for a service they don't administer -
 *             that's configuration, not day-to-day operational data.
 *
 * adminOverrides: true keeps these from ever locking out a platform admin
 * during setup/troubleshooting, matching ServiceNow's own OOB convention.
 *
 * These four ACLs are adopted (via explicit keys in keys.ts) from the
 * records the application already had after being pulled from the PDI, so
 * deploying this file updates them in place instead of creating duplicates.
 */
import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'
import { itomHealthUser, itomHealthAdmin } from '../roles/roles.now'

export const monSvcReadAcl = Acl({
    $id: Now.ID['acl-mon-svc-read'],
    type: 'record',
    table: 'x_1980074_itom_i_0_mon_svc',
    operation: 'read',
    decisionType: 'allow',
    roles: [itomHealthUser, itomHealthAdmin],
    adminOverrides: true,
    description: 'Both ITOM Health personas can view Monitored Service records.',
})

export const monSvcWriteAcl = Acl({
    $id: Now.ID['acl-mon-svc-write'],
    type: 'record',
    table: 'x_1980074_itom_i_0_mon_svc',
    operation: 'write',
    decisionType: 'allow',
    roles: [itomHealthAdmin],
    adminOverrides: true,
    description: 'Only ITOM Health admins can edit Monitored Service records (e.g. reassign owner group, correct the CI mapping).',
})

export const monSvcCreateAcl = Acl({
    $id: Now.ID['acl-mon-svc-create'],
    type: 'record',
    table: 'x_1980074_itom_i_0_mon_svc',
    operation: 'create',
    decisionType: 'allow',
    roles: [itomHealthAdmin],
    adminOverrides: true,
    description: 'Only ITOM Health admins can onboard new Monitored Services.',
})

export const monSvcDeleteAcl = Acl({
    $id: Now.ID['acl-mon-svc-delete'],
    type: 'record',
    table: 'x_1980074_itom_i_0_mon_svc',
    operation: 'delete',
    decisionType: 'allow',
    roles: [itomHealthAdmin],
    adminOverrides: true,
    description: 'Only ITOM Health admins can decommission a Monitored Service record.',
})
