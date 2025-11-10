// Automatic midnight refresh system for prayer times

import { savePrayerTimesToCache, formatDateKey } from './prayerTimesCache';
import { buildPrayerTimesApiUrl } from './prayerSettings';
import { updatePrayerTimes } from './backgroundPrayerTimer';
import { getLocationName } from './prayerNotifications';

let midnightTimer: NodeJS.Timeout | null = null;

// Calculate milliseconds until next midnight
const getMillisecondsUntilMidnight = (): number => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  return tomorrow.getTime() - now.getTime();
};

// Fetch and cache prayer times for today
const refreshPrayerTimes = async () => {
  console.log('🔄 Auto-refreshing prayer times at midnight...');
  
  try {
    // Try to get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await fetchAndCachePrayerTimes(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        async () => {
          // Fallback to Bogura, Bangladesh
          console.log('⚠️ Location unavailable, using Bogura as default');
          await fetchAndCachePrayerTimes(24.8465, 89.3776);
        }
      );
    } else {
      // Fallback to Bogura, Bangladesh
      await fetchAndCachePrayerTimes(24.8465, 89.3776);
    }
  } catch (error) {
    console.error('❌ Error refreshing prayer times:', error);
  }
};

// Fetch prayer times and save to cache
const fetchAndCachePrayerTimes = async (lat: number, lon: number) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const apiUrl = buildPrayerTimesApiUrl(lat, lon, timestamp);
    
    console.log(`📡 Fetching prayer times for coordinates: ${lat}, ${lon}`);
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.code === 200) {
      const timings = {
        Fajr: data.data.timings.Fajr,
        Sunrise: data.data.timings.Sunrise,
        Dhuhr: data.data.timings.Dhuhr,
        Asr: data.data.timings.Asr,
        Maghrib: data.data.timings.Maghrib,
        Isha: data.data.timings.Isha,
      };

      const hijriDate = `${data.data.date.hijri.month.en} ${data.data.date.hijri.day}, ${data.data.date.hijri.year} AH`;
      const locationName = await getLocationName(lat, lon);
      const today = new Date();
      const dateKey = formatDateKey(today);

      // Save to IndexedDB cache
      await savePrayerTimesToCache({
        date: dateKey,
        timings,
        hijriDate,
        location: locationName,
        latitude: lat,
        longitude: lon,
        timestamp: Date.now(),
      });

      // Update localStorage for immediate access
      localStorage.setItem(
        'prayerTimes',
        JSON.stringify({
          timings,
          hijriDate,
          location: locationName,
          timestamp: Date.now(),
        })
      );

      // Update background timer with new times
      const prayerTimesForTimer = {
        Fajr: timings.Fajr,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
      };
      updatePrayerTimes(prayerTimesForTimer);

      console.log(`✅ Prayer times refreshed for ${locationName}`);
      
      // Dispatch custom event to notify components
      window.dispatchEvent(new CustomEvent('prayerTimesUpdated', { 
        detail: { timings, hijriDate, location: locationName } 
      }));
    }
  } catch (error) {
    console.error('❌ Error fetching prayer times:', error);
  }
};

// Schedule next midnight refresh
const scheduleMidnightRefresh = () => {
  // Clear existing timer
  if (midnightTimer) {
    clearTimeout(midnightTimer);
  }

  const msUntilMidnight = getMillisecondsUntilMidnight();
  console.log(`⏰ Scheduling next prayer times refresh in ${Math.round(msUntilMidnight / 1000 / 60)} minutes`);

  midnightTimer = setTimeout(() => {
    refreshPrayerTimes();
    // Re-schedule for next midnight
    scheduleMidnightRefresh();
  }, msUntilMidnight);
};

// Initialize automatic midnight refresh system
export const initializeMidnightRefresh = () => {
  console.log('🌙 Initializing automatic midnight prayer times refresh');
  
  // Schedule first refresh at next midnight
  scheduleMidnightRefresh();
  
  // Also refresh now if we don't have today's times cached
  const cached = localStorage.getItem('prayerTimes');
  if (!cached) {
    console.log('📋 No cached prayer times found, fetching now...');
    refreshPrayerTimes();
  } else {
    const data = JSON.parse(cached);
    const cacheAge = Date.now() - data.timestamp;
    const oneDayInMs = 24 * 60 * 60 * 1000;
    
    // Refresh if cache is older than 1 day
    if (cacheAge > oneDayInMs) {
      console.log('📋 Cached prayer times are stale, refreshing now...');
      refreshPrayerTimes();
    }
  }
};

// Stop automatic refresh (for cleanup)
export const stopMidnightRefresh = () => {
  if (midnightTimer) {
    clearTimeout(midnightTimer);
    midnightTimer = null;
    console.log('⏹️ Stopped automatic prayer times refresh');
  }
};

// Manual refresh (can be called from UI)
export const manualRefreshPrayerTimes = () => {
  console.log('🔄 Manual prayer times refresh triggered');
  refreshPrayerTimes();
};
