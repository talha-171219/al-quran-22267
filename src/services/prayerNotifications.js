import nteClient from '../lib/nteClient';
import { getPrayerTimesForToday, getNextPrayer } from '../utils/prayerTimes'; // Assuming these utilities exist
import { getSettings, saveSettings } from '../utils/settings';

const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const ADHAN_NOTIFICATION_OFFSET_MINUTES = 5; // 5 minutes before prayer time

let prayerNotificationTimeout;
let adhanNotificationTimeout;

const schedulePrayerNotifications = async () => {
  clearTimeout(prayerNotificationTimeout);
  clearTimeout(adhanNotificationTimeout);

  const settings = getSettings();
  if (!settings.enablePrayerNotifications && !settings.enableAdhanNotifications) {
    console.log('[PrayerNotifications] All prayer notifications disabled in settings.');
    return;
  }

  const prayerTimes = await getPrayerTimesForToday(); // This needs to be implemented
  if (!prayerTimes) {
    console.error('[PrayerNotifications] Could not fetch prayer times.');
    return;
  }

  const now = new Date();
  let nextNotificationTime = null;
  let nextNotificationType = null;
  let nextPrayerName = null;

  for (const prayerName of PRAYER_NAMES) {
    const prayerTimeStr = prayerTimes[prayerName.toLowerCase()]; // e.g., prayerTimes.fajr
    if (!prayerTimeStr) continue;

    const [hours, minutes] = prayerTimeStr.split(':').map(Number);
    const prayerDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

    // Schedule Adhan notification
    if (settings.enableAdhanNotifications && settings.prayerNotificationPreferences[prayerName]) {
      const adhanTime = new Date(prayerDateTime.getTime() - ADHAN_NOTIFICATION_OFFSET_MINUTES * 60 * 1000);
      if (adhanTime > now) {
        if (!nextNotificationTime || adhanTime < nextNotificationTime) {
          nextNotificationTime = adhanTime;
          nextNotificationType = 'adhan';
          nextPrayerName = prayerName;
        }
      }
    }

    // Schedule Prayer time notification
    if (settings.enablePrayerNotifications && settings.prayerNotificationPreferences[prayerName]) {
      if (prayerDateTime > now) {
        if (!nextNotificationTime || prayerDateTime < nextNotificationTime) {
          nextNotificationTime = prayerDateTime;
          nextNotificationType = 'prayer';
          nextPrayerName = prayerName;
        }
      }
    }
  }

  if (nextNotificationTime && nextNotificationType && nextPrayerName) {
    const delay = nextNotificationTime.getTime() - now.getTime();
    if (delay > 0) {
      console.log(`[PrayerNotifications] Scheduling next ${nextNotificationType} for ${nextPrayerName} at ${nextNotificationTime.toLocaleTimeString()}`);
      if (nextNotificationType === 'adhan') {
        adhanNotificationTimeout = setTimeout(() => {
          nteClient.triggerEvent(
            'ADHAN_TIME',
            { prayer: nextPrayerName, time: nextNotificationTime.toLocaleTimeString() },
            {
              title: `Adhan Time - ${nextPrayerName}`,
              body: `It's time for ${nextPrayerName} adhan`,
              icon: '/prayer-icon.png' // Ensure this icon exists
            }
          );
          schedulePrayerNotifications(); // Reschedule for the next prayer
        }, delay);
      } else { // nextNotificationType === 'prayer'
        prayerNotificationTimeout = setTimeout(() => {
          nteClient.triggerEvent(
            'PRAYER_TIME',
            { prayer: nextPrayerName, time: nextNotificationTime.toLocaleTimeString() },
            {
              title: `Prayer Time - ${nextPrayerName}`,
              body: `${nextPrayerName} prayer time has arrived. It's time to pray.`,
              icon: '/prayer-icon.png' // Ensure this icon exists
            }
          );
          schedulePrayerNotifications(); // Reschedule for the next prayer
        }, delay);
      }
    } else {
      // If the time has already passed, reschedule immediately for the next one
      console.log(`[PrayerNotifications] Next notification time for ${nextPrayerName} already passed, rescheduling.`);
      schedulePrayerNotifications();
    }
  } else {
    // All prayers for today have passed, schedule for tomorrow's Fajr
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Start of tomorrow

    const delayUntilTomorrow = tomorrow.getTime() - now.getTime();
    console.log(`[PrayerNotifications] All prayers for today passed. Rescheduling for tomorrow in ${delayUntilTomorrow / 1000 / 60} minutes.`);
    prayerNotificationTimeout = setTimeout(schedulePrayerNotifications, delayUntilTomorrow);
  }
};

export const startPrayerNotificationScheduler = () => {
  console.log('[PrayerNotifications] Starting prayer notification scheduler.');
  schedulePrayerNotifications();
};

export const stopPrayerNotificationScheduler = () => {
  console.log('[PrayerNotifications] Stopping prayer notification scheduler.');
  clearTimeout(prayerNotificationTimeout);
  clearTimeout(adhanNotificationTimeout);
};

// Helper to trigger a prayer notification immediately for testing (JS fallback)
export function triggerTestPrayerNow(prayer = 'Dhuhr') {
  try {
    const audioUrl = '/azan1.mp3';
    try {
      const a = new Audio(audioUrl);
      a.play().catch(() => {});
    } catch (e) {
      console.error('Error playing test adhan audio', e);
    }

    nteClient.triggerEvent(
      'PRAYER_TIME',
      { prayer, time: new Date().toISOString(), action: 'play-adhan', audioUrl },
      {
        title: `Test: Prayer Time - ${prayer}`,
        body: `Test notification for ${prayer}`,
        icon: '/prayer-icon.png',
        data: { action: 'play-adhan', audioUrl }
      }
    ).catch(err => console.error('Test prayer trigger error', err));
  } catch (e) {
    console.error('triggerTestPrayerNow (js) error', e);
  }
}
