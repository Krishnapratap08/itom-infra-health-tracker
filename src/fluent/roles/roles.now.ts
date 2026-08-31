/**
 * Roles for ITOM Infrastructure Health Tracker
 * ---------------------------------------------------------------------------
 * Two-tier RBAC model, deliberately simple so it's easy to explain and
 * demo in an interview:
 *
 *   itom_health_user  - Operational/read-only persona. Can see monitored
 *                        services, events, and the incidents raised from
 *                        them, but cannot create/edit/delete app records
 *                        or close auto-created incidents. Models a NOC
 *                        analyst or service owner who watches the board.
 *
 *   itom_health_admin - Full CRUD on both app tables, plus the elevated
 *                        privilege of manually closing an auto-created
 *                        incident (normally that only happens automatically
 *                        when an "Up" event resolves it). Models an ITOM
 *                        engineer / incident manager.
 *
 * Role names are matched by name to the roles already provisioned on the
 * instance (x_1980074_itom_i_0.itom_health_user /
 * x_1980074_itom_i_0.itom_health_admin), so this definition adopts them in
 * place rather than creating duplicates.
 */
import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

export const itomHealthUser = Role({
    name: 'x_1980074_itom_i_0.itom_health_user',
    description: 'Read-only access to Monitored Services and Service Events. Cannot create, edit, delete app records, or manually close auto-created incidents.',
})

export const itomHealthAdmin = Role({
    name: 'x_1980074_itom_i_0.itom_health_admin',
    description: 'Full access to Monitored Services and Service Events, and the only role (besides platform admin) permitted to manually close an auto-created incident.',
})
