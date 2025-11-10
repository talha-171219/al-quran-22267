// Version management and cache clearing utility
const VERSION_KEY = 'app-version';
const CURRENT_VERSION = '1.0.0'; // Increment this when you deploy updates

export interface VersionInfo {
  version: string;
  lastUpdated: number;
}

class VersionManager {
  private currentVersion = CURRENT_VERSION;

  async getStoredVersion(): Promise<VersionInfo | null> {
    try {
      const stored = localStorage.getItem(VERSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  async setVersion(version: string): Promise<void> {
    const versionInfo: VersionInfo = {
      version,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(VERSION_KEY, JSON.stringify(versionInfo));
  }

  async checkAndClearCacheIfNeeded(): Promise<boolean> {
    const stored = await this.getStoredVersion();
    
    // If no stored version or version has changed
    if (!stored || stored.version !== this.currentVersion) {
      console.log('New version detected, clearing caches...');
      await this.clearAllCaches();
      await this.setVersion(this.currentVersion);
      return true; // Cache was cleared
    }
    
    return false; // No cache clearing needed
  }

  async clearAllCaches(): Promise<void> {
    try {
      // Clear IndexedDB databases
      const databases = ['quran-verse-cache', 'hadith-cache'];
      
      for (const dbName of databases) {
        await new Promise<void>((resolve, reject) => {
          const request = indexedDB.deleteDatabase(dbName);
          request.onsuccess = () => {
            console.log(`Cleared ${dbName}`);
            resolve();
          };
          request.onerror = () => {
            console.warn(`Failed to clear ${dbName}`);
            resolve(); // Continue even if one fails
          };
          request.onblocked = () => {
            console.warn(`${dbName} deletion blocked`);
            resolve();
          };
        });
      }

      // Clear localStorage items related to preloading
      const keysToRemove = [
        'surah-preload-status',
        'hadith-preload-status',
      ];
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });

      // Clear all caches except the service worker cache
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter(name => !name.includes('workbox')) // Keep service worker cache
            .map(name => caches.delete(name))
        );
      }

      console.log('All caches cleared successfully');
    } catch (error) {
      console.error('Error clearing caches:', error);
    }
  }

  async clearCachesAndReload(): Promise<void> {
    await this.clearAllCaches();
    window.location.reload();
  }
}

export const versionManager = new VersionManager();
