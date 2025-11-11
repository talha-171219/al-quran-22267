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
      console.log('Clearing dynamic caches only (keeping static content)...');
      
      // Clear only dynamic IndexedDB databases (prayer times, azkar progress)
      const dynamicDatabases = ['azkar-tracker', 'prayer-tracker', 'tasbih-tracker'];
      
      for (const dbName of dynamicDatabases) {
        await new Promise<void>((resolve) => {
          const request = indexedDB.deleteDatabase(dbName);
          request.onsuccess = () => {
            console.log(`Cleared dynamic IndexedDB: ${dbName}`);
            resolve();
          };
          request.onerror = () => {
            console.warn(`Failed to clear ${dbName}`);
            resolve();
          };
          request.onblocked = () => {
            console.warn(`${dbName} deletion blocked`);
            resolve();
          };
        });
      }

      // Clear only dynamic localStorage items (keep static content and user preferences)
      const keysToRemove = [
        'prayerTimesCache',
        'lastPrayerTimesUpdate'
      ];
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log(`Cleared dynamic localStorage: ${key}`);
      });

      // Clear only dynamic browser caches (keep static PDFs, audio, API data)
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        // Only clear dynamic caches, keep static-v1, audio-v1, api-v1
        const cachesToClear = cacheNames.filter(name => 
          name.startsWith('al-quran-dynamic-') || 
          (name.startsWith('workbox-') && !name.includes('audio') && !name.includes('static'))
        );
        
        await Promise.all(
          cachesToClear.map(cacheName => {
            console.log(`Clearing cache: ${cacheName}`);
            return caches.delete(cacheName);
          })
        );
      }

      console.log('Dynamic caches cleared, static content preserved');
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
