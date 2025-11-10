// IndexedDB cache for prayer times with offline support

const DB_NAME = 'QuranPWA';
const STORE_NAME = 'prayerTimes';
const DB_VERSION = 1;

export interface CachedPrayerTime {
  date: string; // YYYY-MM-DD format
  timings: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
  hijriDate: string;
  location: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}

// Initialize IndexedDB
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'date' });
        objectStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
};

// Save prayer times to cache
export const savePrayerTimesToCache = async (data: CachedPrayerTime): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    await new Promise<void>((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    console.log(`Cached prayer times for ${data.date}`);
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

// Get prayer times from cache
export const getPrayerTimesFromCache = async (date: string): Promise<CachedPrayerTime | null> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.get(date);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

// Get all cached prayer times
export const getAllCachedPrayerTimes = async (): Promise<CachedPrayerTime[]> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error reading all from cache:', error);
    return [];
  }
};

// Clear old cache entries (older than 30 days)
export const clearOldCache = async (): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('timestamp');
    
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const range = IDBKeyRange.upperBound(thirtyDaysAgo);
    
    const request = index.openCursor(range);
    
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };
  } catch (error) {
    console.error('Error clearing old cache:', error);
  }
};

// Format date to YYYY-MM-DD
export const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Check if cached data is still valid (within 24 hours)
export const isCacheValid = (cachedData: CachedPrayerTime): boolean => {
  const now = Date.now();
  const cacheAge = now - cachedData.timestamp;
  const oneDayInMs = 24 * 60 * 60 * 1000;
  return cacheAge < oneDayInMs;
};
