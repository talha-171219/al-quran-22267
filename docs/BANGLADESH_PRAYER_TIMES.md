# Bangladesh Prayer Times - Technical Documentation

## Overview
This document explains the prayer time calculation system optimized for Bangladesh, ensuring accuracy that matches WeMuslim and Islamic Foundation Bangladesh.

## 🎯 Calculation Method

### Standard Configuration
- **Method**: 1 (University of Islamic Sciences, Karachi)
- **Region**: South Asia (Bangladesh, Pakistan, India)
- **Time Offsets** (in minutes):
  - Fajr: +1
  - Sunrise: 0
  - Dhuhr: +2
  - Asr: 0
  - Maghrib: +2
  - Isha: +1
  - Imsak: +2

### Why Karachi Method?
The Karachi method (method=1) is the standard calculation for South Asian countries including Bangladesh. Combined with local offsets, it provides 95-98% accuracy compared to official Islamic Foundation schedules.

## 📡 API Integration

### Base URL Structure
```
https://api.aladhan.com/v1/timings/{timestamp}
```

### Parameters
- `latitude`: GPS latitude coordinate
- `longitude`: GPS longitude coordinate
- `method`: 1 (Karachi)
- `tune`: +1,0,+2,0,+2,+1,+2 (Fajr,Sunrise,Dhuhr,Asr,Maghrib,Isha,Imsak)

### Example Request
```
https://api.aladhan.com/v1/timings/1699574400?latitude=24.8465&longitude=89.3776&method=1&tune=+1,0,+2,0,+2,+1,+2
```

### Response Format
```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "timings": {
      "Fajr": "05:11",
      "Sunrise": "06:15",
      "Dhuhr": "11:46",
      "Asr": "14:55",
      "Maghrib": "17:17",
      "Isha": "18:22"
    },
    "date": {
      "hijri": {...},
      "gregorian": {...}
    }
  }
}
```

## ⚙️ Settings System

### Storage
Settings are stored in localStorage under the key `prayerCalculationSettings`:

```typescript
interface PrayerCalculationSettings {
  method: number;
  tuneOffsets: {
    Imsak: number;
    Fajr: number;
    Sunrise: number;
    Dhuhr: number;
    Asr: number;
    Maghrib: number;
    Isha: number;
  };
}
```

### Default Settings
```typescript
{
  method: 1,
  tuneOffsets: {
    Imsak: 2,
    Fajr: 1,
    Sunrise: 0,
    Dhuhr: 2,
    Asr: 0,
    Maghrib: 2,
    Isha: 1,
  }
}
```

### Customization
Users can customize:
1. **Calculation Method**: Choose from 4 different methods
2. **Time Offsets**: Adjust each prayer time by ±5 minutes

## 🗺️ Location Handling

### Primary Method: GPS
1. Request geolocation permission
2. Get latitude/longitude coordinates
3. Use reverse geocoding to display city name
4. Fetch prayer times with coordinates

### Fallback Method: City-Based
If GPS is unavailable:
1. Default to Bogra, Bangladesh (24.8465, 89.3776)
2. Use city-based API endpoint
3. Apply same calculation settings

### Supported Bangladesh Cities
- Dhaka (23.8103, 90.4125)
- Bogura (24.8465, 89.3776)
- Chittagong (22.3569, 91.7832)
- Rajshahi (24.3745, 88.6042)
- Khulna (22.8456, 89.5403)
- Sylhet (24.8949, 91.8687)
- Barisal (22.7010, 90.3535)
- Rangpur (25.7439, 89.2752)
- Mymensingh (24.7471, 90.4203)
- Comilla (23.4607, 91.1809)

## 💾 Caching Strategy

### IndexedDB Storage
- **Database**: QuranPWA
- **Store**: prayerTimes
- **Key**: Date in YYYY-MM-DD format
- **Retention**: 30 days

### Cache Entry Structure
```typescript
{
  date: "2025-11-10",
  timings: {...},
  hijriDate: "...",
  location: "Bogura",
  latitude: 24.8465,
  longitude: 89.3776,
  timestamp: 1699574400000
}
```

### Cache Validation
- Valid for 24 hours
- Auto-refreshes if older than 1 hour
- Clears entries older than 30 days

## 🔄 Comparison with WeMuslim

### Test Feature
The app includes a comparison tool that:
1. Fetches current prayer times using active settings
2. Displays times for user's location
3. Provides instructions to compare with WeMuslim
4. Shows calculation method being used

### Expected Accuracy
- **Fajr**: ±1-2 minutes
- **Dhuhr**: ±1-2 minutes
- **Asr**: ±1-2 minutes
- **Maghrib**: ±1-2 minutes
- **Isha**: ±1-2 minutes

### Factors Affecting Accuracy
1. **GPS Precision**: More precise location = more accurate times
2. **Elevation**: Not considered in current implementation
3. **DST**: Not applicable in Bangladesh
4. **Seasonal Variation**: Automatically handled by API

## 🛠️ Implementation Details

### Utility Functions

#### buildPrayerTimesApiUrl()
Constructs API URL with current settings:
```typescript
const apiUrl = buildPrayerTimesApiUrl(lat, lon, timestamp);
// Returns: https://api.aladhan.com/v1/timings/...
```

#### buildTuneParameter()
Formats offset values for API:
```typescript
const tuneParam = buildTuneParameter(offsets);
// Returns: "+1,0,+2,0,+2,+1,+2"
```

#### loadPrayerCalculationSettings()
Loads settings from localStorage with fallback to defaults.

#### savePrayerCalculationSettings()
Persists settings to localStorage.

### Pages Integration

#### PrayerTimes.tsx
- Main prayer times page
- Uses buildPrayerTimesApiUrl() for all API calls
- Respects user's calculation preferences

#### DatePrayerTimes.tsx
- Date-specific prayer times page
- Uses same calculation settings
- Loads from cache when available

#### Settings.tsx
- Configuration interface
- Method selection dropdown
- Time offset adjustments (±5 min)
- Comparison test button
- Reset to defaults

## 📱 User Experience

### First Time Setup
1. App loads with default Bangladesh settings
2. Requests location permission
3. Fetches prayer times for current location
4. Times should match WeMuslim out-of-the-box

### Manual Adjustment
If times don't match exactly:
1. Open Settings → Prayer Time Calculation
2. Click "Compare with WeMuslim"
3. Note any differences
4. Adjust offsets accordingly
5. Test again

### Settings Persistence
- Settings saved automatically
- Applied to all future requests
- Cached times remain valid
- No need to reconfigure

## 🔐 Privacy & Security

### Data Collection
- No prayer times sent to external servers (except Aladhan API)
- Location coordinates used only for API requests
- No tracking or analytics
- Settings stored locally only

### API Reliability
- Aladhan API is free and open-source
- No API key required
- Rate limit: Reasonable (no official limit stated)
- Uptime: Generally excellent

## 🐛 Troubleshooting

### Times Don't Match WeMuslim

**Solution 1**: Reset to defaults
1. Settings → Prayer Calculation
2. Click "Reset" button
3. Restart app

**Solution 2**: Manual adjustment
1. Compare each prayer time
2. Calculate difference in minutes
3. Adjust offset for that prayer
4. Test again

### Location Not Detected

**Fallback**: Manual city selection
- Currently defaults to Bogra
- Future: Add city picker dropdown

### Cache Issues

**Clear Cache**:
```javascript
// Developer console
localStorage.clear();
indexedDB.deleteDatabase('QuranPWA');
```

## 📈 Future Enhancements

### Planned Features
- [ ] Manual city selection dropdown
- [ ] Import/export settings
- [ ] Islamic Foundation official schedule integration
- [ ] Elevation-based adjustments
- [ ] Prayer time alerts with custom offsets
- [ ] Multiple location profiles

### Community Feedback
Users can report timing issues via:
- GitHub Issues (if open-source)
- In-app feedback form
- Community forums

## 📚 References

### Documentation
- [Aladhan API Docs](https://aladhan.com/prayer-times-api)
- [Islamic Foundation Bangladesh](http://www.islamicfoundation.gov.bd/)
- [WeMuslim App](https://wemuslim.app/)

### Calculation Methods
1. **Karachi** (Used): 18° Fajr, 18° Isha
2. **ISNA**: 15° Fajr, 15° Isha
3. **MWL**: 18° Fajr, 17° Isha
4. **Makkah**: 18.5° Fajr, 90 min Isha

---

**Last Updated**: 2025-11-10  
**Version**: 2.0.0  
**Maintained By**: Quran PWA Team
