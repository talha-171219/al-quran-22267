// Version management and cache clearing utility
const VERSION_KEY = 'app-version';
const VERSION_HISTORY_KEY = 'app-version-history';

// Manual version increment: Update this for each release
// Format: MAJOR.MINOR (e.g., 3.0, 3.1, 3.2... 3.10, then 4.0)
const CURRENT_VERSION = '3.0';

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

  async isUpdateAvailable(): Promise<boolean> {
    const stored = await this.getStoredVersion();
    
    // Check if stored version is different from current version
    if (!stored || stored.version !== this.currentVersion) {
      console.log(`Update available: ${this.currentVersion} (current: ${stored?.version || 'none'})`);
      return true;
    }
    
    return false;
  }

  async clearAllCaches(): Promise<void> {
    try {
      console.log('Clearing dynamic caches only (keeping user progress and static content)...');
      
      // DO NOT clear user progress databases - these must persist across updates:
      // - azkar-tracker: User's azkar completion progress
      // - prayer-tracker: User's prayer tracking history
      // - tasbih-tracker: User's tasbih counts
      // - hadith-cache: Downloaded hadiths for offline reading
      
      // No databases to clear - user data must be preserved
      console.log('Preserving all user progress and cached content');

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
