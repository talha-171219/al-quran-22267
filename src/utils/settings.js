const SETTINGS_KEY = 'appNotificationSettings';

export const getSettings = () => {
  try {
    const storedSettings = localStorage.getItem(SETTINGS_KEY);
    return storedSettings ? JSON.parse(storedSettings) : getDefaultSettings();
  } catch (error) {
    console.error("Error reading settings from localStorage", error);
    return getDefaultSettings();
  }
};

export const saveSettings = (newSettings) => {
  try {
    const currentSettings = getSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
    return updatedSettings;
  } catch (error) {
    console.error("Error saving settings to localStorage", error);
    return getSettings(); // Return current settings if save fails
  }
};

export const getDefaultSettings = () => ({
  enablePrayerNotifications: true,
  enableAdhanNotifications: true,
  adhanOffsetMinutes: 5,
  prayerNotificationPreferences: {
    Fajr: true,
    Dhuhr: true,
    Asr: true,
    Maghrib: true,
    Isha: true,
  },
  enableHadithNotifications: true,
  morningHadithTime: '08:00', // HH:mm format
  eveningHadithTime: '18:00', // HH:mm format
  sentHadithIds: [], // To prevent repetition
  onboardingCompleted: false,
});
