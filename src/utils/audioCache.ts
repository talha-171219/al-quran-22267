// Audio caching utility for offline support
const DB_NAME = 'quran-audio-cache';
const STORE_NAME = 'audio-files';
const DB_VERSION = 1;

export interface CachedAudio {
  surahNumber: number;
  blob: Blob;
  timestamp: number;
}

class AudioCacheManager {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'surahNumber' });
        }
      };
    });
  }

  async cacheAudio(surahNumber: number, blob: Blob): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const data: CachedAudio = {
        surahNumber,
        blob,
        timestamp: Date.now()
      };

      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getCachedAudio(surahNumber: number): Promise<Blob | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(surahNumber);

      request.onsuccess = () => {
        const result = request.result as CachedAudio | undefined;
        resolve(result?.blob || null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async isCached(surahNumber: number): Promise<boolean> {
    const cached = await this.getCachedAudio(surahNumber);
    return cached !== null;
  }

  async getAllCached(): Promise<number[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAllKeys();

      request.onsuccess = () => resolve(request.result as number[]);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteAudio(surahNumber: number): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(surahNumber);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clearAll(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const audioCache = new AudioCacheManager();
