import nteClient from '../lib/nteClient';
import { getTodayPrayerTimes, PrayerTimes } from '../utils/prayerTimes';
import { playAdhan } from '../utils/prayerNotifications';
import { getDefaultAdhanStyle } from '../data/adhanAudio';

// Keys for localStorage
const PREF_KEY = 'notif_prayer_prefs';

type PrayerName = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

interface PrayerPrefs {
  enabled: boolean;
  adhanEnabled: boolean;
  prayerEnabled: boolean;
  adhanMinutesBefore: number; // default 5
  perPrayer: Record<PrayerName, boolean>;
}

const DEFAULT_PREFS: PrayerPrefs = {
  enabled: true,
  adhanEnabled: true,
  prayerEnabled: true,
  adhanMinutesBefore: 5,
  perPrayer: { Fajr: true, Dhuhr: true, Asr: true, Maghrib: true, Isha: true }
};

let timers: number[] = [];

function loadPrefs(): PrayerPrefs {
  try {
    const raw = localStorage.getItem(PREF_KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...(JSON.parse(raw) || {}) };
  } catch (e) {
    return DEFAULT_PREFS;
  }
}

function savePrefs(p: PrayerPrefs) {
  try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch (e) {}
}

function clearTimers() {
  timers.forEach(t => clearTimeout(t));
  timers = [];
}

function parseTimeToDate(time: string, reference = new Date()) {
  // time format 'HH:MM'
  const [hh, mm] = time.split(':').map(Number);
  const d = new Date(reference);
  d.setHours(hh, mm, 0, 0);
  return d;
}

function scheduleAt(ms: number, fn: () => void) {
  if (ms <= 0) return null;
  const id = window.setTimeout(fn, ms);
  timers.push(id);
  return id;
}

function formatPrayerIcon() {
  return '/icons/prayer-icon.png';
}

export async function startPrayerNotificationScheduler() {
  try {
    const prefs = loadPrefs();
    if (!prefs.enabled) return;

    const times: PrayerTimes = await getTodayPrayerTimes();
    const now = new Date();

    const prayerEntries: Array<{ name: PrayerName; time: string }> = [
      { name: 'Fajr', time: times.fajr },
      { name: 'Dhuhr', time: times.dhuhr },
      { name: 'Asr', time: times.asr },
      { name: 'Maghrib', time: times.maghrib },
      { name: 'Isha', time: times.isha }
    ];

    // Clear existing timers
    clearTimers();

    prayerEntries.forEach(entry => {
      if (!prefs.perPrayer[entry.name]) return;

      // Prayer time notification
      if (prefs.prayerEnabled) {
        const prayerDate = parseTimeToDate(entry.time, now);
        let ms = prayerDate.getTime() - now.getTime();
        if (ms < 0) {
          // schedule for next day
          ms += 24 * 60 * 60 * 1000;
        }

        scheduleAt(ms, () => {
          // Play Adhan audio locally (foreground)
          let audioUrl = '/azan1.mp3';
          try {
            const style = getDefaultAdhanStyle();
            audioUrl = style.audioUrl || audioUrl;
            playAdhan(audioUrl);
          } catch (e) {
            console.error('Error playing adhan locally', e);
          }

          // Send backend push via NTE with explicit action and audioUrl
          nteClient.triggerEvent('PRAYER_TIME', { prayer: entry.name, time: entry.time, action: 'play-adhan', audioUrl }, {
            title: `Prayer Time - ${entry.name}`,
            body: `${entry.name} prayer time has arrived. It's time to pray.`,
            icon: formatPrayerIcon(),
            data: { action: 'play-adhan', audioUrl }
          }).catch(err => console.error('Prayer trigger error', err));
        });
      }

      // Adhan notification before prayer
      if (prefs.adhanEnabled) {
        const adhanDate = parseTimeToDate(entry.time, now);
        adhanDate.setMinutes(adhanDate.getMinutes() - prefs.adhanMinutesBefore);
        let msAdhan = adhanDate.getTime() - now.getTime();
        if (msAdhan < 0) msAdhan += 24 * 60 * 60 * 1000;

        scheduleAt(msAdhan, () => {
          // 5-minute warning: play short alarm locally and send NTE event
          try {
            const alarm = new Audio('/alarm-clock-short-6402.mp3');
            alarm.volume = 0.8;
            alarm.play().catch(err => console.error('Adhan warning alarm play error', err));
          } catch (e) {
            console.error('Error playing adhan warning alarm', e);
          }

          // include audioUrl so backend can include it in push payload if desired
          const style = getDefaultAdhanStyle();
          const audioUrl = style.audioUrl;

          nteClient.triggerEvent('ADHAN_TIME', { prayer: entry.name, time: entry.time, action: 'adhan-warning', audioUrl }, {
            title: `Adhan Time - ${entry.name}`,
            body: `It's time for ${entry.name} adhan`,
            icon: formatPrayerIcon(),
            data: { action: 'adhan-warning', audioUrl }
          }).catch(err => console.error('Adhan trigger error', err));
        });
      }
    });
  } catch (err) {
    console.error('startPrayerNotificationScheduler error', err);
  }
}

export function stopPrayerNotificationScheduler() {
  clearTimers();
}

export function updatePrayerPrefs(updater: Partial<PrayerPrefs>) {
  const prefs = loadPrefs();
  const merged = { ...prefs, ...updater } as PrayerPrefs;
  savePrefs(merged);
  // restart scheduler
  stopPrayerNotificationScheduler();
  startPrayerNotificationScheduler();
}

export function getPrayerPrefs(): PrayerPrefs {
  return loadPrefs();
}

/**
 * Helper to trigger a prayer notification immediately for testing.
 * Plays adhan locally and fires the NTE PRAYER_TIME event.
 */
export function triggerTestPrayerNow(prayer: PrayerName = 'Dhuhr') {
  try {
    const style = getDefaultAdhanStyle();
    const audioUrl = style.audioUrl;
    playAdhan(audioUrl);
    nteClient.triggerEvent('PRAYER_TIME', { prayer, time: new Date().toISOString(), action: 'play-adhan', audioUrl }, {
      title: `Test: Prayer Time - ${prayer}`,
      body: `Test notification for ${prayer}`,
      icon: formatPrayerIcon(),
      data: { action: 'play-adhan', audioUrl }
    }).catch(err => console.error('Test prayer trigger error', err));
  } catch (e) {
    console.error('triggerTestPrayerNow error', e);
  }
}
