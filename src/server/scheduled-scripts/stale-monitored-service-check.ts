/**
 * ITOM Stale Monitored Service Check - scheduled script module
 * ---------------------------------------------------------------------------
 * ITOM monitoring/heartbeat concept: a real monitoring pipeline doesn't
 * just react to events - it also has to notice when events *stop*
 * arriving, because "no news" from a dead monitoring agent looks
 * identical to "everything is fine" unless something actively checks for
 * silence. This job is that check.
 *
 * Every 15 minutes, any Monitored Service whose last_checked timestamp is
 * older than the 15-minute window (or was never set) gets flipped to
 * "Unknown" - distinct from "Down", because we genuinely don't know: the
 * service could be healthy and the monitoring agent could be the thing
 * that's broken.
 */
import { gs, GlideDateTime, GlideRecord } from '@servicenow/glide'

const STALE_WINDOW_SECONDS = 15 * 60 // 15 minutes

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
        gs.info('[ITOM Health] Marked ' + staleCount + ' monitored service(s) as Unknown due to a stale heartbeat (no event in the last 15 minutes).')
    } else {
        gs.debug('[ITOM Health] Heartbeat check complete - no stale monitored services found.')
    }
}
