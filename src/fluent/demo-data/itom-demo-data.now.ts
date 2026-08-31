import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

/**
 * Demo data (installs by default - `now-sdk install --demoData=false` to skip)
 * ---------------------------------------------------------------------------
 * Seeds two Monitored Services against real CIs that already exist on any
 * standard PDI (out-of-the-box demo data), so the correlation flow can be
 * exercised immediately without first having to create CMDB records by
 * hand. See the README's "Manual testing" section for the end-to-end walk
 * through using these.
 */

// DatabaseServer2 - a stock PDI cmdb_ci_server record.
export const dbServerMonitoredService = Record({
    $id: Now.ID['demo-mon-svc-db-server-2'],
    $meta: { installMethod: 'demo' },
    table: 'x_1980074_itom_i_0_mon_svc',
    data: {
        service_name: 'Order Management API',
        ci_reference: '14a9e27bc61122750037b90c4d34da38', // DatabaseServer2
        status: 'up',
        owner_group: '0a52d3dcd7011200f2d224837e6103f2', // Application Development
    },
})

// VMWARE-SD-04 - a stock PDI cmdb_ci_server record.
export const vmwareMonitoredService = Record({
    $id: Now.ID['demo-mon-svc-vmware-sd-04'],
    $meta: { installMethod: 'demo' },
    table: 'x_1980074_itom_i_0_mon_svc',
    data: {
        service_name: 'Customer Portal',
        ci_reference: '27e52cc8c0a8000b0067d0b66b8a66de', // VMWARE-SD-04
        status: 'up',
        owner_group: '0c4e7b573b331300ad3cc9bb34efc461', // Problem Analyzers
    },
})
