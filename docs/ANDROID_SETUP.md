# Android Native Build Setup

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build the web app
npm run build

# 3. Add Android platform
npx cap add android

# 4. Sync web code to Android
npx cap sync android

# 5. Open in Android Studio
npx cap open android

# OR run directly on device/emulator
npx cap run android
```

## Adhan Sound Setup

1. **Copy your adhan audio file** to:
   ```
   android/app/src/main/res/raw/adhan.wav
   ```
   (Supported formats: .wav, .mp3, .ogg)

2. **File naming rules:**
   - Lowercase only
   - No spaces or special characters
   - Example: `adhan.wav`, `azan_makkah.mp3`

3. **Sync changes:**
   ```bash
   npx cap sync android
   ```

## Notification Icon Setup

The notification icon is already created at:
```
android/app/src/main/res/drawable/ic_notification.xml
```

Requirements for custom icons:
- 24dp x 24dp size
- Single color (white #FFFFFF)
- Transparent background
- Simple silhouette design

## Required Android Permissions

Add these to `android/app/src/main/AndroidManifest.xml`:

```xml
<!-- Notifications (Android 13+) -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>

<!-- Exact Alarms (Android 12+) -->
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM"/>
<uses-permission android:name="android.permission.USE_EXACT_ALARM"/>

<!-- Wake device for alarm -->
<uses-permission android:name="android.permission.WAKE_LOCK"/>

<!-- Reschedule after reboot -->
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
```

## Battery Optimization

For reliable alarms, users should:

1. **Disable battery optimization** for this app:
   - Settings → Apps → Al-Quran → Battery → Don't optimize

2. **Xiaomi/MIUI devices:**
   - Settings → Battery → App battery saver → Al-Quran → No restrictions
   - Security → Autostart → Enable for Al-Quran

3. **Samsung devices:**
   - Settings → Apps → Al-Quran → Battery → Allow background activity

4. **Huawei devices:**
   - Settings → Apps → Al-Quran → Battery → Launch manually

## Testing

1. Open the app
2. Go to Settings → 🕌 আযান ও এলার্ম (নেটিভ)
3. Grant notification permission
4. Click "১ মিনিট পরে" to test
5. Close the app and wait 1 minute
6. Adhan notification should appear with sound!

## Troubleshooting

**Notification not showing:**
- Check if permission is granted
- Verify battery optimization is disabled
- Check notification channel settings in Android Settings

**No sound:**
- Verify `adhan.wav` exists in `res/raw/`
- Check device volume is not muted
- Verify "Adhan & Prayer Alarms" channel is not muted in Android Settings

**Alarm delayed:**
- Disable Doze mode for app
- Enable "Autostart" on Chinese ROMs
- Keep the app in "Recent Apps" (don't swipe away)

## Building for Release

1. Update `capacitor.config.ts`:
   - Remove or comment out the `server.url` section
   
2. Build:
   ```bash
   npm run build
   npx cap sync android
   ```

3. Open in Android Studio and generate signed APK/AAB
