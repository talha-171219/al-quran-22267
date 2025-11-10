// Hadith caching utility for offline reading
const DB_NAME = 'hadith-cache';
const STORE_NAME = 'hadiths';
const DB_VERSION = 1;

export interface CachedHadith {
  id: string;
  hadithNumber: string;
  chapterHadithNumber?: string;
  arabic: string;
  bangla: string;
  bookId: string;
  bookNumber: string;
  bookName: string;
  chapterNumber: string;
  chapterArabic: string;
  chapterEnglish: string;
  reference: string;
}

interface CachedChapter {
  bookId: string;
  chapterNumber: string;
  hadiths: CachedHadith[];
  timestamp: number;
}

class HadithCacheManager {
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
          const store = db.createObjectStore(STORE_NAME, { keyPath: ['bookId', 'chapterNumber'] });
          store.createIndex('bookId', 'bookId', { unique: false });
        }
      };
    });
  }

  private async getStore(mode: IDBTransactionMode) {
    if (!this.db) await this.init();
    const tx = this.db!.transaction([STORE_NAME], mode);
    return tx.objectStore(STORE_NAME);
  }

  async saveChapter(bookId: string, chapterNumber: string, hadiths: CachedHadith[]): Promise<void> {
    const store = await this.getStore('readwrite');
    const data: CachedChapter = { bookId, chapterNumber, hadiths, timestamp: Date.now() };
    return new Promise((resolve, reject) => {
      const req = store.put(data);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async getChapter(bookId: string, chapterNumber: string): Promise<CachedHadith[] | null> {
    const store = await this.getStore('readonly');
    return new Promise((resolve, reject) => {
      const req = store.get([bookId, chapterNumber]);
      req.onsuccess = () => {
        const result = req.result as CachedChapter | undefined;
        resolve(result?.hadiths || null);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async getAllCachedChapters(bookId: string): Promise<string[]> {
    const store = await this.getStore('readonly');
    const index = store.index('bookId');
    return new Promise((resolve, reject) => {
      const req = index.getAllKeys(bookId);
      req.onsuccess = () => {
        const keys = req.result as [string, string][];
        const chapters = keys.map(k => k[1]);
        resolve(chapters);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async clearAll(): Promise<void> {
    const store = await this.getStore('readwrite');
    return new Promise((resolve, reject) => {
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }
}

export const hadithCache = new HadithCacheManager();
