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
      console.log('Clearing dynamic caches only (keeping user progress, prayer times and static content)...');
      
      // DO NOT clear these databases - user data and content must persist:
      // - azkar-tracker: User's azkar completion progress
      // - prayer-tracker: User's prayer tracking history  
      // - tasbih-tracker: User's tasbih counts
      // - hadith-cache: Downloaded hadiths for offline reading
      // - verse-cache: Downloaded Quran verses for offline reading
      
      console.log('✅ Preserving all user progress, prayer times and cached content');

      // Clear only localStorage items that should reset (keep user preferences)
      const keysToRemove = [
        // No keys to remove - preserve everything including prayer times cache
      ];
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log(`Cleared localStorage: ${key}`);
      });

      // Clear only dynamic browser caches (preserve static content, prayer times, user data)
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        // Keep all important caches:
        // - al-quran-static-* (PDFs, books)
        // - al-quran-audio-* (audio files)
        // - al-quran-api-* (Quran/Hadith data)
        // - al-quran-prayer-* (Prayer times)
        // Only clear old dynamic app shell caches
        const cachesToClear = cacheNames.filter(name => 
          name.startsWith('al-quran-dynamic-') && 
          !name.includes(Date.now().toString().substring(0, 8)) // Keep today's cache
        );
        
        await Promise.all(
          cachesToClear.map(cacheName => {
            console.log(`🗑️ Clearing old cache: ${cacheName}`);
            return caches.delete(cacheName);
          })
        );
      }

      console.log('✅ Dynamic caches cleared, all user data and content preserved');
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
