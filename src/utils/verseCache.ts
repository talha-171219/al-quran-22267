// Verse caching utility for offline reading
const DB_NAME = 'quran-verse-cache';
const STORE_NAME = 'surah-verses';
const DB_VERSION = 1;

export interface Verse {
  numberInSurah: number;
  text: string;
  translation: string;
}

interface CachedSurah {
  surahNumber: number;
  verses: Verse[];
  timestamp: number;
}

class VerseCacheManager {
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

  private async getStore(mode: IDBTransactionMode) {
    if (!this.db) await this.init();
    const tx = this.db!.transaction([STORE_NAME], mode);
    return tx.objectStore(STORE_NAME);
  }

  async saveVerses(surahNumber: number, verses: Verse[]): Promise<void> {
    const store = await this.getStore('readwrite');
    const data: CachedSurah = { surahNumber, verses, timestamp: Date.now() };
    return new Promise((resolve, reject) => {
      const req = store.put(data);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async getVerses(surahNumber: number): Promise<Verse[] | null> {
    const store = await this.getStore('readonly');
    return new Promise((resolve, reject) => {
      const req = store.get(surahNumber);
      req.onsuccess = () => {
        const result = req.result as CachedSurah | undefined;
        resolve(result?.verses || null);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async getAllCachedSurahs(): Promise<number[]> {
    const store = await this.getStore('readonly');
    return new Promise((resolve, reject) => {
      const req = store.getAllKeys();
      req.onsuccess = () => resolve(req.result as number[]);
      req.onerror = () => reject(req.error);
    });
  }
}

export const verseCache = new VerseCacheManager();