// Prayer calculation settings for Bangladesh

export interface PrayerCalculationSettings {
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

export const CALCULATION_METHODS = {
  KARACHI: {
    id: 1,
    name: "University of Islamic Sciences, Karachi",
    nameBn: "বাংলাদেশ (কারাচি মেথড)",
    description: "Standard for Bangladesh, Pakistan, India",
  },
  ISNA: {
    id: 2,
    name: "Islamic Society of North America (ISNA)",
    nameBn: "আইএসএনএ",
    description: "Used in North America",
  },
  MWL: {
    id: 3,
    name: "Muslim World League",
    nameBn: "মুসলিম ওয়ার্ল্ড লীগ",
    description: "Used in Europe, Far East",
  },
  MAKKAH: {
    id: 4,
    name: "Umm Al-Qura University, Makkah",
    nameBn: "মক্কা",
    description: "Used in Saudi Arabia",
  },
};

// Default Bangladesh settings
export const BANGLADESH_DEFAULT_SETTINGS: PrayerCalculationSettings = {
  method: 1, // Karachi method
  tuneOffsets: {
    Imsak: 2,
    Fajr: 1,
    Sunrise: 0,
    Dhuhr: 2,
    Asr: 0,
    Maghrib: 2,
    Isha: 1,
  },
};

// Save prayer calculation settings
export const savePrayerCalculationSettings = (settings: PrayerCalculationSettings) => {
  localStorage.setItem('prayerCalculationSettings', JSON.stringify(settings));
};

// Load prayer calculation settings
export const loadPrayerCalculationSettings = (): PrayerCalculationSettings => {
  const saved = localStorage.getItem('prayerCalculationSettings');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return BANGLADESH_DEFAULT_SETTINGS;
    }
  }
  return BANGLADESH_DEFAULT_SETTINGS;
};

// Build tune parameter string for API
export const buildTuneParameter = (offsets: PrayerCalculationSettings['tuneOffsets']): string => {
  return `${offsets.Fajr},${offsets.Sunrise},${offsets.Dhuhr},${offsets.Asr},${offsets.Maghrib},${offsets.Isha},${offsets.Imsak}`;
};

// Build full API URL with settings
export const buildPrayerTimesApiUrl = (
  lat: number,
  lon: number,
  timestamp: number,
  settings?: PrayerCalculationSettings
): string => {
  const config = settings || loadPrayerCalculationSettings();
  const tuneParam = buildTuneParameter(config.tuneOffsets);
  
  return `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=${config.method}&tune=${tuneParam}`;
};

// Build API URL for city-based lookup
export const buildPrayerTimesByCityApiUrl = (
  city: string,
  country: string,
  date: string,
  settings?: PrayerCalculationSettings
): string => {
  const config = settings || loadPrayerCalculationSettings();
  const tuneParam = buildTuneParameter(config.tuneOffsets);
  
  return `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${config.method}&tune=${tuneParam}&date=${date}`;
};

// Reset to default Bangladesh settings
export const resetToDefaultSettings = () => {
  savePrayerCalculationSettings(BANGLADESH_DEFAULT_SETTINGS);
};

// Common Bangladesh cities with coordinates
export const BANGLADESH_CITIES = [
  { name: "Dhaka", nameBn: "ঢাকা", lat: 23.8103, lon: 90.4125 },
  { name: "Bogura", nameBn: "বগুড়া", lat: 24.8465, lon: 89.3776 },
  { name: "Chittagong", nameBn: "চট্টগ্রাম", lat: 22.3569, lon: 91.7832 },
  { name: "Rajshahi", nameBn: "রাজশাহী", lat: 24.3745, lon: 88.6042 },
  { name: "Khulna", nameBn: "খুলনা", lat: 22.8456, lon: 89.5403 },
  { name: "Sylhet", nameBn: "সিলেট", lat: 24.8949, lon: 91.8687 },
  { name: "Barisal", nameBn: "বরিশাল", lat: 22.7010, lon: 90.3535 },
  { name: "Rangpur", nameBn: "রংপুর", lat: 25.7439, lon: 89.2752 },
  { name: "Mymensingh", nameBn: "ময়মনসিংহ", lat: 24.7471, lon: 90.4203 },
  { name: "Comilla", nameBn: "কুমিল্লা", lat: 23.4607, lon: 91.1809 },
];
