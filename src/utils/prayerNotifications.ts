// Prayer notification and alarm utilities
import nteClient from '@/nteClient';

export interface PrayerAlarm {
  prayer: string;
  time: string;
  enabled: boolean;
}

export interface AdhanSettings {
  [key: string]: boolean;
}

// Schedule notification 5 minutes before prayer with alarm sound
export const scheduleNotification = (prayerName: string, prayerTime: string, prayerNameBn: string) => {
  // Use NTE to send push notifications. If NTE isn't ready, still schedule local behavior when possible.

  const [hours, minutes] = prayerTime.split(':').map(Number);
  const now = new Date();
  const prayerDate = new Date();
  prayerDate.setHours(hours, minutes, 0, 0);

  // Calculate 5 minutes before
  const notificationTime = new Date(prayerDate.getTime() - 5 * 60 * 1000);
  
  // If the time has passed today, schedule for tomorrow
  if (notificationTime <= now) {
    notificationTime.setDate(notificationTime.getDate() + 1);
  }

  const timeUntilNotification = notificationTime.getTime() - now.getTime();

  if (timeUntilNotification > 0) {
    setTimeout(() => {
      // Play alarm sound
      const alarmAudio = new Audio('/alarm-clock-short-6402.mp3');
      alarmAudio.volume = 0.7;
      alarmAudio.play().catch(err => console.error('Alarm sound error:', err));
      // Send push via NTE (Adhan notification - 5 minutes before)
      try {
        nteClient.triggerEvent('ADHAN_NOTIFICATION', { prayer: prayerName }, {
          title: `Adhan Time - ${prayerName}`,
          body: `It's time for ${prayerName} adhan`,
          icon: '/icon-192.png',
          tag: `adhan-${prayerName}`,
          data: { prayer: prayerName }
        });
      } catch (err) {
        console.error('NTE trigger error (adhan):', err);
        // Fallback to local Notification when possible
        if ('Notification' in window && Notification.permission === 'granted') {
          try {
            new Notification(`${prayerNameBn} এর সময়`, {
              body: `${prayerNameBn} নামাজের সময় ৫ মিনিট পরে`,
              icon: '/icon-192.png',
              badge: '/icon-192.png',
              tag: `prayer-${prayerName}`,
              requireInteraction: true,
            });
          } catch (e) {
            console.error('Local notification fallback failed:', e);
          }
        }
      }
    }, timeUntilNotification);

    return true;
  }

  return false;
};

// Schedule Adhan playback at prayer time
export const scheduleAdhan = (prayerName: string, prayerTime: string, callback: () => void) => {
  const [hours, minutes] = prayerTime.split(':').map(Number);
  const now = new Date();
  const prayerDate = new Date();
  prayerDate.setHours(hours, minutes, 0, 0);

  // If the time has passed today, schedule for tomorrow
  if (prayerDate <= now) {
    prayerDate.setDate(prayerDate.getDate() + 1);
  }

  const timeUntilAdhan = prayerDate.getTime() - now.getTime();

  if (timeUntilAdhan > 0) {
    const timeoutId = setTimeout(() => {
      callback();
    }, timeUntilAdhan);

    return timeoutId;
  }

  return null;
};

// Get location name from coordinates using reverse geocoding
export const getLocationName = async (lat: number, lon: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`
    );
    const data = await response.json();
    
    const city = data.address?.city || 
                 data.address?.town || 
                 data.address?.village || 
                 data.address?.county ||
                 data.address?.state ||
                 'Unknown';
    
    return city;
  } catch (error) {
    console.error('Geocoding error:', error);
    return 'Unknown';
  }
};

// Save alarm settings to localStorage
export const saveAlarmSettings = (settings: { [key: string]: boolean }) => {
  localStorage.setItem('prayerAlarms', JSON.stringify(settings));
};

// Load alarm settings from localStorage
export const loadAlarmSettings = (): { [key: string]: boolean } => {
  const saved = localStorage.getItem('prayerAlarms');
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    Fajr: false,
    Dhuhr: false,
    Asr: false,
    Maghrib: false,
    Isha: false,
  };
};

// Save Adhan settings to localStorage
export const saveAdhanSettings = (settings: { [key: string]: boolean }) => {
  localStorage.setItem('prayerAdhan', JSON.stringify(settings));
};

// Load Adhan settings from localStorage
export const loadAdhanSettings = (): { [key: string]: boolean } => {
  const saved = localStorage.getItem('prayerAdhan');
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    Fajr: false,
    Dhuhr: false,
    Asr: false,
    Maghrib: false,
    Isha: false,
  };
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

// Play Adhan audio
export const playAdhan = (audioUrl: string): HTMLAudioElement => {
  const audio = new Audio(audioUrl);
  audio.volume = 0.7;
  audio.play().catch(error => {
    console.error('Error playing Adhan:', error);
  });
  return audio;
};
