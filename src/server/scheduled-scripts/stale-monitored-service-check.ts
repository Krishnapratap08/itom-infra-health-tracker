import { gs, GlideDateTime, GlideRecord } from '@servicenow/glide'

const STALE_WINDOW_SECONDS = 15 * 60

export function checkStaleMonitoredServices(): void {
    const staleThreshold = new GlideDateTime()
    staleThreshold.addSeconds(-STALE_WINDOW_SECONDS)

    const services = new GlideRecord('x_1980074_itom_i_0_mon_svc')
    services.addQuery('status', '!=', 'unknown')

    const staleOrMissing = services.addQuery('last_checked', '<', staleThreshold.getValue())
    staleOrMissing.addOrCondition('last_checked', '')

    services.query()

    let staleCount = 0
    while (services.next()) {
        services.setValue('status', 'unknown')
        services.update()
        staleCount++
    }

    if (staleCount > 0) {
        gs.info('[ITOM Health] Marked ' + staleCount + ' monitored service(s) as Unknown due to a stale heartbeat.')
    } else {
        gs.debug('[ITOM Health] Heartbeat check complete - no stale monitored services found.')
    }
}
