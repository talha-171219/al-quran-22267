// Version management and cache clearing utility
const VERSION_KEY = 'app-version';
const VERSION_HISTORY_KEY = 'app-version-history';
const BUILD_ID_KEY = 'app-build-id';

// Semantic version display format (4.5, 4.6, 4.7, etc.)
const BASE_VERSION = '4.6';

// Build identifier tied to version (only changes when version changes)
// This ensures updates are detected only when version actually changes
const BUILD_ID = `build-${BASE_VERSION}`;

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
  private buildId = BUILD_ID;
  private baseVersion = BASE_VERSION;

  getCurrentVersion(): string {
    const stored = localStorage.getItem(VERSION_KEY);
    if (stored) {
      try {
        const versionInfo: VersionInfo = JSON.parse(stored);
        return versionInfo.version;
      } catch {
        return this.baseVersion;
      }
    }
    return this.baseVersion;
  }

  getBuildId(): string {
    return this.buildId;
  }

  async getStoredVersion(): Promise<VersionInfo | null> {
    try {
      const stored = localStorage.getItem(VERSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  async getStoredBuildId(): Promise<string | null> {
    return localStorage.getItem(BUILD_ID_KEY);
  }

  async getVersionHistory(): Promise<VersionHistory> {
    try {
      const stored = localStorage.getItem(VERSION_HISTORY_KEY);
      return stored ? JSON.parse(stored) : { versions: [] };
    } catch {
      return { versions: [] };
    }
  }

  async initializeVersion(): Promise<void> {
    const stored = await this.getStoredVersion();
    const storedBuildId = await this.getStoredBuildId();
    
    // ONLY initialize version if there's NO stored version at all (first time user)
    if (!stored) {
      await this.setVersion(this.baseVersion, 'Initial version');
      localStorage.setItem(BUILD_ID_KEY, this.buildId);
      console.log(`✅ Initialized app version: ${this.baseVersion}`);
    } else if (!storedBuildId) {
      // Version exists but no build ID - store current build ID (for old users)
      localStorage.setItem(BUILD_ID_KEY, this.buildId);
      console.log(`✅ Stored build ID for existing version: ${stored.version}`);
    }
    // DO NOT auto-update version here - let UpdateNotification handle it after user clicks Update
  }

  private isVersionLower(version1: string, version2: string): boolean {
    const [major1, minor1] = version1.split('.').map(Number);
    const [major2, minor2] = version2.split('.').map(Number);
    
    if (major1 < major2) return true;
    if (major1 === major2 && minor1 < minor2) return true;
    return false;
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
    const storedBuildId = await this.getStoredBuildId();
    
    // Check 1: Build ID comparison (most reliable - detects every new deployment)
    if (storedBuildId !== this.buildId) {
      console.log(`🆕 New build detected: ${storedBuildId} → ${this.buildId}`);
      return true;
    }
    
    // Check 2: Version comparison (fallback for when build ID isn't available)
    const storedVersion = stored?.version || null;
    if (!storedVersion || storedVersion !== this.baseVersion) {
      console.log(`📦 Version update available: ${storedVersion || 'none'} → ${this.baseVersion}`);
      return true;
    }
    
    console.log(`✅ Already on latest version: ${this.baseVersion} (Build: ${this.buildId})`);
    return false;
  }

  async updateToNewVersion(description?: string): Promise<string> {
    // Don't auto-increment - use BASE_VERSION from code
    // Developer manually changes BASE_VERSION in code when they want to release new version
    const newVersion = this.baseVersion;
    
    // Save new version and build ID
    await this.setVersion(newVersion, description);
    localStorage.setItem(BUILD_ID_KEY, this.buildId);
    
    console.log(`✅ Version updated to: ${newVersion}`);
    return newVersion;
  }

  async clearAllCaches(): Promise<void> {
    try {
      console.log('Clearing dynamic caches only (keeping user progress, prayer times and static content)...');
      
      // CRITICAL: DO NOT clear these - user data must persist across ALL updates:
      // IndexedDB databases:
      // - azkar-tracker: User's azkar completion progress
      // - prayer-tracker: User's prayer tracking history  
      // - tasbih-tracker: User's tasbih counts
      // - hadith-cache: Downloaded hadiths for offline reading
      // - verse-cache: Downloaded Quran verses for offline reading
      // - prayer-times-db: Cached prayer times
      
      // localStorage keys that MUST be preserved:
      const protectedKeys = [
        'prayerRecords',          // Prayer tracker history
        'tasbihRecords',          // Tasbih counter data
        'fastingProgress',        // Fasting tracker data
        'hajjProgress',           // Hajj progress
        'hajjChecklistState',     // Hajj checklist
        'hajjBookmarks',          // Hajj bookmarks
        'mosque_favorites',       // Favorite mosques
        'adhanSettings',          // Adhan notification settings
        'prayerSettings',         // Prayer notification settings
        'azkarSettings',          // Azkar settings
        'tasbihSettings',         // Tasbih settings
        'userBookmarks',          // User bookmarks
        'quran-bookmarks',        // Quran bookmarks
        'hadith-bookmarks',       // Hadith bookmarks
        'theme',                  // User theme preference
        'language',               // User language preference
      ];
      
      console.log(`✅ Preserving ${protectedKeys.length} user data keys and all IndexedDB databases`);

      // DO NOT remove any localStorage keys - preserve ALL user data
      // keysToRemove is intentionally empty to protect user progress
      const keysToRemove: string[] = [];
      
      keysToRemove.forEach(key => {
        // Double-check: never remove protected keys
        if (!protectedKeys.includes(key)) {
          localStorage.removeItem(key);
          console.log(`Cleared localStorage: ${key}`);
        }
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
export const APP_VERSION = versionManager.getCurrentVersion();
export const CURRENT_BUILD_ID = versionManager.getBuildId();
