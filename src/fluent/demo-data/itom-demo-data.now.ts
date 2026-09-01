import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

export const dbServerMonitoredService = Record({
    $id: Now.ID['demo-mon-svc-db-server-2'],
    $meta: { installMethod: 'demo' },
    table: 'x_1980074_itom_i_0_mon_svc',
    data: {
        service_name: 'Order Management API',
        ci_reference: '14a9e27bc61122750037b90c4d34da38',
        status: 'up',
        owner_group: '0a52d3dcd7011200f2d224837e6103f2',
    },
})

export const vmwareMonitoredService = Record({
    $id: Now.ID['demo-mon-svc-vmware-sd-04'],
    $meta: { installMethod: 'demo' },
    table: 'x_1980074_itom_i_0_mon_svc',
    data: {
        service_name: 'Customer Portal',
        ci_reference: '27e52cc8c0a8000b0067d0b66b8a66de',
        status: 'up',
        owner_group: '0c4e7b573b331300ad3cc9bb34efc461',
    },
})

export const paymentGatewayMonitoredService = Record({
    $id: Now.ID['demo-mon-svc-vmware-sd-07'],
    $meta: { installMethod: 'demo' },
    table: 'x_1980074_itom_i_0_mon_svc',
    data: {
        service_name: 'Payment Gateway',
        ci_reference: '27e59e75c0a8000b003b3fab4211d2c2',
        status: 'up',
        owner_group: '0762d92db72422103a858bbb4e11a928',
    },
})
