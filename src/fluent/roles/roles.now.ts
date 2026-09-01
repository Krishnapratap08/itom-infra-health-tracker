import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

export const itomHealthUser = Role({
    name: 'x_1980074_itom_i_0.itom_health_user',
    description: 'Read-only access to Monitored Services and Service Events. Cannot create, edit, delete app records, or manually close auto-created incidents.',
})

export const itomHealthAdmin = Role({
    name: 'x_1980074_itom_i_0.itom_health_admin',
    description: 'Full access to Monitored Services and Service Events, and the only role permitted to manually close an auto-created incident.',
})
