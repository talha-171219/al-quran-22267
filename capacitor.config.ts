/**
 * ============================================================================
 * CAPACITOR CONFIGURATION
 * ============================================================================
 *
 * Configuration for native Android/iOS builds.
 *
 * IMPORTANT FOR NOTIFICATIONS:
 * - Sound files must be placed in: android/app/src/main/res/raw/
 * - Supported formats: .wav, .mp3, .ogg
 * - File names must be lowercase with no spaces
 *
 * TO ADD ADHAN SOUND:
 * 1. Create folder: android/app/src/main/res/raw/
 * 2. Add your adhan audio file as: adhan.wav (or .mp3)
 * 3. Run: npx cap sync android
 *
 * ============================================================================
 */

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // App identifier - must be unique for app stores
  appId: 'app.lovable.a0f624ed71e44a55870a9240dba0a268',

  // App name shown on device
  appName: 'al-quran-updated',

  // Build output directory (Vite outputs to 'dist')
  webDir: 'dist',

  // Development server configuration
  // REMOVE THIS SECTION for production builds!
  server: {
    // Live reload from Lovable preview
    url: 'https://a0f624ed-71e4-4a55-870a-9240dba0a268.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },

  // Plugin configurations
  plugins: {
    // ========================================================================
    // LOCAL NOTIFICATIONS PLUGIN
    // ========================================================================
    LocalNotifications: {
      // Small icon shown in status bar (Android)
      // Must exist at: android/app/src/main/res/drawable/ic_notification.xml
      // If not found, uses default app icon
      smallIcon: 'ic_notification',

      // Icon color (Android)
      iconColor: '#10B981', // Green color for prayer theme

      // Default notification sound
      // Must exist at: android/app/src/main/res/raw/adhan.wav
      sound: 'adhan.wav'
    }
  },

  // Android-specific configuration
  android: {
    // Allow mixed content (http in https) - needed for some APIs
    allowMixedContent: true,

    // Recommended for exact alarms
    // useLegacyBridge: false
  },

  // iOS-specific configuration
  ios: {
    // Content inset behavior
    contentInset: 'automatic',

    // Allow scroll in web view
    scrollEnabled: true
  }
};

export default config;
