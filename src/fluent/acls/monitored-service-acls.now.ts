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
    description: 'Only ITOM Health admins can edit Monitored Service records.',
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
