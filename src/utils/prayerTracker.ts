// Prayer tracking utilities for tracking completed prayers

export interface PrayerRecord {
  date: string; // YYYY-MM-DD
  prayers: {
    Fajr: boolean;
    Dhuhr: boolean;
    Asr: boolean;
    Maghrib: boolean;
    Isha: boolean;
  };
}

const STORAGE_KEY = 'prayer_tracker_history';

// Get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Load prayer records from localStorage
export const loadPrayerRecords = (): PrayerRecord[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

// Save prayer records to localStorage
export const savePrayerRecords = (records: PrayerRecord[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

// Get today's prayer record
export const getTodayRecord = (): PrayerRecord => {
  const today = getTodayDate();
  const records = loadPrayerRecords();
  
  // Clean up old records (keep only last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];
  
  const filteredRecords = records.filter(r => r.date >= thirtyDaysAgoStr);
  
  if (filteredRecords.length !== records.length) {
    savePrayerRecords(filteredRecords);
  }
  
  const todayRecord = filteredRecords.find(r => r.date === today);
  
  if (todayRecord) {
    return todayRecord;
  }
  
  // Create new record for today (auto-resets)
  const newRecord: PrayerRecord = {
    date: today,
    prayers: {
      Fajr: false,
      Dhuhr: false,
      Asr: false,
      Maghrib: false,
      Isha: false,
    },
  };
  
  filteredRecords.push(newRecord);
  savePrayerRecords(filteredRecords);
  
  return newRecord;
};

// Toggle prayer completion
export const togglePrayer = (prayerName: string): PrayerRecord => {
  const today = getTodayDate();
  const records = loadPrayerRecords();
  const todayIndex = records.findIndex(r => r.date === today);
  
  if (todayIndex >= 0) {
    records[todayIndex].prayers[prayerName as keyof PrayerRecord['prayers']] = 
      !records[todayIndex].prayers[prayerName as keyof PrayerRecord['prayers']];
  } else {
    const newRecord: PrayerRecord = {
      date: today,
      prayers: {
        Fajr: false,
        Dhuhr: false,
        Asr: false,
        Maghrib: false,
        Isha: false,
      },
    };
    newRecord.prayers[prayerName as keyof PrayerRecord['prayers']] = true;
    records.push(newRecord);
  }
  
  savePrayerRecords(records);
  return records[todayIndex >= 0 ? todayIndex : records.length - 1];
};

// Get prayer statistics
export const getPrayerStats = (days: number = 7) => {
  const records = loadPrayerRecords();
  const recentRecords = records.slice(-days);
  
  let totalPrayers = 0;
  let completedPrayers = 0;
  
  recentRecords.forEach(record => {
    Object.values(record.prayers).forEach(completed => {
      totalPrayers++;
      if (completed) completedPrayers++;
    });
  });
  
  return {
    totalPrayers,
    completedPrayers,
    percentage: totalPrayers > 0 ? Math.round((completedPrayers / totalPrayers) * 100) : 0,
  };
};
