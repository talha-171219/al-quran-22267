/**
 * ============================================================================
 * ADHAN SOUND UTILITY
 * ============================================================================
 *
 * Unified utility for playing adhan sounds across web and native platforms.
 *
 * WEB: Uses HTML5 Audio API with files from /public folder
 * NATIVE: Uses Capacitor LocalNotifications with sounds from android/res/raw
 *
 * ============================================================================
 */

import { Capacitor } from '@capacitor/core';

// Available adhan sounds in public folder
export const ADHAN_SOUNDS = {
  default: '/azan1.mp3',
  alarm: '/alarm-clock-short-6402.mp3',
  names99: '/99-names.mp3',
  talbiyah: '/hajj/talbiyah.mp3',
} as const;

export type AdhanSoundKey = keyof typeof ADHAN_SOUNDS;

// Current audio instance for web playback
let currentAudio: HTMLAudioElement | null = null;

/**
 * Check if running on native platform
 */
export const isNativePlatform = (): boolean => {
  const platform = Capacitor.getPlatform();
  return platform === 'android' || platform === 'ios';
};

/**
 * Play adhan sound on web platform
 * @param soundKey - Key from ADHAN_SOUNDS or custom path
 * @param volume - Volume level (0.0 to 1.0)
 */
export const playAdhanWeb = (
  soundKey: AdhanSoundKey | string = 'default',
  volume: number = 1.0
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Stop any currently playing audio
      stopAdhan();

      // Get sound URL
      const soundUrl = ADHAN_SOUNDS[soundKey as AdhanSoundKey] || soundKey;

      // Create and play audio
      currentAudio = new Audio(soundUrl);
      currentAudio.volume = Math.max(0, Math.min(1, volume));

      currentAudio.onended = () => {
        currentAudio = null;
        resolve();
      };

      currentAudio.onerror = (error) => {
        console.error('[AdhanSound] Playback error:', error);
        currentAudio = null;
        reject(error);
      };

      currentAudio.play().catch(reject);
      
      console.log(`[AdhanSound] Playing: ${soundUrl}`);
    } catch (error) {
      console.error('[AdhanSound] Error:', error);
      reject(error);
    }
  });
};

/**
 * Stop currently playing adhan
 */
export const stopAdhan = (): void => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
    console.log('[AdhanSound] Stopped');
  }
};

/**
 * Check if adhan is currently playing
 */
export const isPlaying = (): boolean => {
  return currentAudio !== null && !currentAudio.paused;
};

/**
 * Set volume of currently playing adhan
 */
export const setVolume = (volume: number): void => {
  if (currentAudio) {
    currentAudio.volume = Math.max(0, Math.min(1, volume));
  }
};

/**
 * Preload adhan sound for faster playback
 */
export const preloadAdhan = (soundKey: AdhanSoundKey = 'default'): void => {
  const soundUrl = ADHAN_SOUNDS[soundKey];
  const audio = new Audio(soundUrl);
  audio.preload = 'auto';
  audio.load();
  console.log(`[AdhanSound] Preloaded: ${soundUrl}`);
};

/**
 * Get the sound file name for native notifications
 * Native platforms use the file name without extension
 */
export const getNativeSoundName = (): string => {
  // For Capacitor LocalNotifications, sound file must be in:
  // Android: android/app/src/main/res/raw/adhan.wav
  // iOS: Added to app bundle
  return 'adhan'; // Without extension
};

/**
 * Play adhan - automatically chooses web or native method
 * For native, this only works in foreground. Background uses notification sounds.
 */
export const playAdhan = async (
  soundKey: AdhanSoundKey = 'default',
  volume: number = 1.0
): Promise<void> => {
  // On both web and native foreground, use HTML5 Audio
  // Native background notifications use their own sound system
  return playAdhanWeb(soundKey, volume);
};

// Storage key for user's preferred adhan
const ADHAN_PREF_KEY = 'preferredAdhanSound';

/**
 * Save user's preferred adhan sound
 */
export const savePreferredAdhan = (soundKey: AdhanSoundKey): void => {
  try {
    localStorage.setItem(ADHAN_PREF_KEY, soundKey);
  } catch (e) {
    console.error('[AdhanSound] Failed to save preference:', e);
  }
};

/**
 * Get user's preferred adhan sound
 */
export const getPreferredAdhan = (): AdhanSoundKey => {
  try {
    const saved = localStorage.getItem(ADHAN_PREF_KEY);
    if (saved && saved in ADHAN_SOUNDS) {
      return saved as AdhanSoundKey;
    }
  } catch (e) {}
  return 'default';
};

/**
 * Test adhan playback - useful for settings page
 */
export const testAdhan = async (duration: number = 5000): Promise<void> => {
  const preferredSound = getPreferredAdhan();
  await playAdhan(preferredSound);
  
  // Auto-stop after duration
  setTimeout(() => {
    stopAdhan();
  }, duration);
};
