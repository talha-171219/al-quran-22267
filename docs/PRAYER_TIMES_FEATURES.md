# Prayer Times Features Documentation

## Overview
The Prayer Times feature provides comprehensive Islamic prayer time tracking with offline support, background notifications, and a dynamic calendar system.

## ✨ Key Features

### 1. **Dynamic Prayer Calendar** 📅
- **Date-based Prayer Times**: Click any date on the calendar to load that specific day's prayer schedule
- **Smart Caching**: Previously viewed dates load instantly from IndexedDB
- **Offline Support**: Works completely offline once data is cached
- **Visual Indicators**:
  - 🟢 Today's date (primary color)
  - 🟡 Jummah/Friday (accent color)
  - 🔵 Selected date (bordered)

### 2. **Background Adhan & Alarms** 🔔
- **Automatic Background Timer**: Runs continuously when app is open/minimized
- **Adhan Playback**: Automatically plays Adhan at prayer time
- **Prayer Alarms**: 5-minute advance notifications with alarm sound
- **Works When Minimized**: Continues running in browser background tabs
- **Smart Detection**: Prevents duplicate triggers on the same day

### 3. **Location-Based Times** 📍
- **Automatic Location Detection**: Uses GPS for accurate prayer times
- **Reverse Geocoding**: Displays actual city name
- **Fallback Support**: Works with manual city selection if GPS unavailable
- **Multi-source API**: Powered by Aladhan API with method 2 (ISNA)

### 4. **Intelligent Caching System** 💾
- **IndexedDB Storage**: Stores up to 30 days of prayer times
- **Smart Validation**: Auto-refreshes stale data (>24 hours old)
- **Auto-cleanup**: Removes entries older than 30 days
- **Instant Loading**: Cached dates load without API calls

### 5. **Enhanced UI/UX** ✨
- **Bengali Localization**: Full Bengali language support
- **Smooth Animations**: Fade-in, scale, and hover effects
- **Battery Status**: Real-time battery percentage display
- **Prayer Countdown**: Shows time remaining until next prayer
- **Visual Prayer Status**: Current prayer highlighted
- **Notification Badges**: Shows active alarms and Adhan settings

## 🔧 Technical Architecture

### Data Flow
```
User Location → Aladhan API → Cache (IndexedDB) → UI Display
                                ↓
                        Background Timer → Adhan/Alarm Trigger
```

### Storage Structure

#### IndexedDB Schema
```typescript
interface CachedPrayerTime {
  date: string;           // YYYY-MM-DD
  timings: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
  hijriDate: string;
  location: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}
```

#### LocalStorage Keys
- `prayerTimes`: Current day's prayer times
- `prayerAlarms`: Alarm settings per prayer
- `prayerAdhan`: Adhan settings per prayer

### Background Timer System

The background timer runs independently and checks prayer times every 30 seconds:

```typescript
// Features:
- Runs continuously when app is open
- Works in minimized/background tabs
- Prevents duplicate triggers
- Resets at midnight
- Uses minimal CPU
```

## 📱 PWA Support

### Offline Capabilities
- ✅ Works completely offline once data is cached
- ✅ Service worker caches all assets
- ✅ Background sync for prayer times
- ✅ Installable on mobile devices

### Notification Support
- ✅ Web Notifications API
- ✅ Requires user permission
- ✅ Persistent notifications with actions
- ✅ Audio playback with Adhan

## 🎯 User Permissions Required

1. **Location Permission**: For accurate prayer times
2. **Notification Permission**: For alarms and Adhan
3. **Audio Autoplay**: For Adhan playback (fallback to manual)

## 🚀 Performance Optimizations

1. **Smart API Usage**: Only fetches when needed
2. **Efficient Caching**: Reduces redundant API calls
3. **Background Timer**: Minimal CPU usage (30s intervals)
4. **Lazy Loading**: Calendar months load on demand
5. **Asset Optimization**: All assets cached for offline use

## 🔐 Privacy & Security

- ✅ No data sent to external servers except Aladhan API
- ✅ Location stored locally only
- ✅ No user tracking or analytics
- ✅ All data stored in browser's local storage

## 🛠️ Future Enhancements

Planned features for upcoming releases:
- [ ] Prayer tracking history
- [ ] Statistics and streaks
- [ ] Multiple location profiles
- [ ] Qibla direction integration
- [ ] Custom Adhan selection
- [ ] Cloud backup/sync

## 📝 API Reference

### Aladhan API
```
Endpoint: https://api.aladhan.com/v1/timings/{timestamp}
Parameters:
  - latitude: User's latitude
  - longitude: User's longitude
  - method: 2 (ISNA)
```

### OpenStreetMap Reverse Geocoding
```
Endpoint: https://nominatim.openstreetmap.org/reverse
Parameters:
  - format: json
  - lat: Latitude
  - lon: Longitude
  - accept-language: en
```

## 🐛 Known Issues & Limitations

1. **Browser Tab Closure**: Background timer stops if all tabs are closed
2. **iOS Safari**: Limited background tab support
3. **Notification Reliability**: Depends on browser implementation
4. **Battery Optimization**: May be throttled by OS power settings

## 💡 Usage Tips

1. **Keep Tab Open**: For background alarms, keep at least one tab open
2. **Enable Notifications**: Grant notification permission for full experience
3. **Check Location**: Verify location accuracy for correct prayer times
4. **Refresh Daily**: App auto-refreshes prayer times every 24 hours
5. **Offline Mode**: Pre-load desired dates while online for offline use

## 🤝 Contributing

For bug reports or feature requests, please follow the project's contribution guidelines.

---

**Last Updated**: 2025-11-10
**Version**: 2.0.0
**Maintained By**: Quran PWA Team
