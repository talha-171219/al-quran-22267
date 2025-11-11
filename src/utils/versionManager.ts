// Version management and cache clearing utility
const VERSION_KEY = 'app-version';
const VERSION_HISTORY_KEY = 'app-version-history';

// Auto-increment version based on build timestamp
const CURRENT_VERSION = `2.${Math.floor(Date.now() / 100000)}`; // e.g., 2.17624021

export interface VersionInfo {
  version: string;
  lastUpdated: number;
  updateType?: 'feature' | 'bugfix' | 'improvement';
  description?: string;
}

export interface VersionHistory {
  versions: VersionInfo[];
}

class VersionManager {
  private currentVersion = CURRENT_VERSION;

  getCurrentVersion(): string {
    return this.currentVersion;
  }

  async getStoredVersion(): Promise<VersionInfo | null> {
    try {
      const stored = localStorage.getItem(VERSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  async getVersionHistory(): Promise<VersionHistory> {
    try {
      const stored = localStorage.getItem(VERSION_HISTORY_KEY);
      return stored ? JSON.parse(stored) : { versions: [] };
    } catch {
      return { versions: [] };
    }
  }

  async setVersion(version: string, description?: string): Promise<void> {
    const versionInfo: VersionInfo = {
      version,
      lastUpdated: Date.now(),
      description,
    };
    
    // Save current version
    localStorage.setItem(VERSION_KEY, JSON.stringify(versionInfo));
    
    // Update version history
    const history = await this.getVersionHistory();
    history.versions.unshift(versionInfo);
    
    // Keep only last 10 versions in history
    if (history.versions.length > 10) {
      history.versions = history.versions.slice(0, 10);
    }
    
    localStorage.setItem(VERSION_HISTORY_KEY, JSON.stringify(history));
  }

  async checkAndClearCacheIfNeeded(): Promise<boolean> {
    const stored = await this.getStoredVersion();
    
    // If no stored version or version has changed
    if (!stored || stored.version !== this.currentVersion) {
      console.log(`New version detected: ${this.currentVersion} (previous: ${stored?.version || 'none'})`);
      await this.clearAllCaches();
      await this.setVersion(this.currentVersion, 'System update');
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

// Export current version for use in components
export const APP_VERSION = CURRENT_VERSION;
