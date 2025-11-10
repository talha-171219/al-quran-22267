// Background timer system for Adhan and prayer alarms

import { playAdhan } from './prayerNotifications';
import { getDefaultAdhanStyle } from '@/data/adhanAudio';

interface PrayerTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface BackgroundTimerState {
  isRunning: boolean;
  prayerTimes: PrayerTimings | null;
  alarmSettings: { [key: string]: boolean };
  adhanSettings: { [key: string]: boolean };
  lastCheck: number;
  triggeredPrayers: Set<string>;
}

const state: BackgroundTimerState = {
  isRunning: false,
  prayerTimes: null,
  alarmSettings: {},
  adhanSettings: {},
  lastCheck: 0,
  triggeredPrayers: new Set(),
};

let timerInterval: NodeJS.Timeout | null = null;

const prayerNamesBn: { [key: string]: string } = {
  Fajr: "ফজর",
  Dhuhr: "যুহর",
  Asr: "আসর",
  Maghrib: "মাগরিব",
  Isha: "এশা",
};

// Check if current time matches any prayer time
const checkPrayerTimes = () => {
  if (!state.prayerTimes) return;

  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const currentDateKey = now.toDateString();

  // Reset triggered prayers at midnight
  const midnight = new Date(now);
  midnight.setHours(0, 0, 0, 0);
  if (now.getTime() - midnight.getTime() < 60000) {
    state.triggeredPrayers.clear();
  }

  const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  prayers.forEach((prayer) => {
    const prayerTime = state.prayerTimes![prayer as keyof PrayerTimings];
    const prayerKey = `${prayer}-${currentDateKey}`;

    // Check if we haven't triggered this prayer today
    if (!state.triggeredPrayers.has(prayerKey)) {
      // Check if current time matches prayer time (within the same minute)
      if (currentTime === prayerTime) {
        // Trigger Adhan if enabled
        if (state.adhanSettings[prayer]) {
          console.log(`🕌 Playing Adhan for ${prayer}`);
          const defaultStyle = getDefaultAdhanStyle();
          playAdhan(defaultStyle.audioUrl);

          // Show notification
          if (Notification.permission === 'granted') {
            new Notification(`${prayerNamesBn[prayer]} এর সময়`, {
              body: 'আযান চলছে...',
              icon: '/icon-192.png',
              tag: `adhan-${prayer}`,
              requireInteraction: true,
            });
          }
        }

        // Trigger alarm if enabled
        if (state.alarmSettings[prayer]) {
          console.log(`⏰ Triggering alarm for ${prayer}`);
          const alarmAudio = new Audio('/alarm-clock-short-6402.mp3');
          alarmAudio.volume = 0.7;
          alarmAudio.play().catch(err => console.error('Alarm sound error:', err));

          if (Notification.permission === 'granted') {
            new Notification(`${prayerNamesBn[prayer]} এর সময়`, {
              body: `${prayerNamesBn[prayer]} নামাজের সময় হয়ে গেছে`,
              icon: '/icon-192.png',
              badge: '/icon-192.png',
              tag: `prayer-${prayer}`,
              requireInteraction: true,
            });
          }
        }

        // Mark as triggered
        state.triggeredPrayers.add(prayerKey);
      }
    }
  });

  state.lastCheck = Date.now();
};

// Start background timer
export const startBackgroundTimer = (
  prayerTimes: PrayerTimings,
  alarmSettings: { [key: string]: boolean },
  adhanSettings: { [key: string]: boolean }
) => {
  console.log('🚀 Starting background prayer timer');

  state.prayerTimes = prayerTimes;
  state.alarmSettings = alarmSettings;
  state.adhanSettings = adhanSettings;
  state.isRunning = true;

  // Clear existing interval
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  // Check every 30 seconds for better accuracy
  timerInterval = setInterval(() => {
    if (state.isRunning) {
      checkPrayerTimes();
    }
  }, 30000);

  // Initial check
  checkPrayerTimes();
};

// Stop background timer
export const stopBackgroundTimer = () => {
  console.log('⏹️ Stopping background prayer timer');
  state.isRunning = false;
  
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

// Update prayer times
export const updatePrayerTimes = (prayerTimes: PrayerTimings) => {
  state.prayerTimes = prayerTimes;
  state.triggeredPrayers.clear(); // Reset triggers when times change
};

// Update settings
export const updateAlarmSettings = (alarmSettings: { [key: string]: boolean }) => {
  state.alarmSettings = alarmSettings;
};

export const updateAdhanSettings = (adhanSettings: { [key: string]: boolean }) => {
  state.adhanSettings = adhanSettings;
};

// Get timer state
export const getTimerState = () => ({ ...state });

// Handle visibility change (when tab becomes visible/hidden)
export const handleVisibilityChange = () => {
  if (document.hidden) {
    console.log('📱 App minimized - timer continues in background');
  } else {
    console.log('📱 App visible - checking prayer times');
    if (state.isRunning) {
      checkPrayerTimes();
    }
  }
};

// Initialize visibility change listener
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', handleVisibilityChange);
}
