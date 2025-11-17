import nteClient from '../lib/nteClient';
import { getSettings, saveSettings } from '../utils/settings';
import { bukhariHadiths, muslimHadiths, tirmidhiHadiths } from '../data/hadiths';

// Normalize available hadith arrays into a single `hadiths` array
const hadiths = [];
const pushNormalized = (h) => {
  // normalize fields to { id, text, reference, bookId, chapterId }
  const text = h.bangla || h.arabic || h.text || '';
  hadiths.push({
    id: h.id || `${h.bookId || 'unknown'}-${h.chapterId || '0'}-${h.hadithNumber || ''}`,
    text,
    reference: h.reference || '',
    bookId: h.bookId || h.book || 'unknown',
    chapterId: h.chapterId || h.chapter || ''
  });
};

if (Array.isArray(bukhariHadiths)) bukhariHadiths.forEach(pushNormalized);
if (Array.isArray(muslimHadiths)) muslimHadiths.forEach(pushNormalized);
if (Array.isArray(tirmidhiHadiths)) tirmidhiHadiths.forEach(pushNormalized);

let morningHadithTimeout;
let eveningHadithTimeout;

const HADITH_SENT_KEY = 'sentHadithIds';

const getRandomHadith = (excludeIds = []) => {
  const availableHadiths = hadiths.filter(h => !excludeIds.includes(h.id));
  if (availableHadiths.length === 0) {
    // If all hadiths have been sent, reset the list
    console.log('[HadithNotifications] All hadiths sent, resetting sent list.');
    return getRandomHadith([]); // Try again with no exclusions
  }
  const randomIndex = Math.floor(Math.random() * availableHadiths.length);
  return availableHadiths[randomIndex];
};

const scheduleHadithNotification = async () => {
  clearTimeout(morningHadithTimeout);
  clearTimeout(eveningHadithTimeout);

  const settings = getSettings();
  if (!settings.enableHadithNotifications) {
    console.log('[HadithNotifications] Daily Hadith notifications disabled in settings.');
    return;
  }

  const now = new Date();
  const today = now.toDateString();

  // Get sent Hadith IDs for today
  let sentHadithIds = settings.sentHadithIds || [];
  // Filter out old Hadith IDs (e.g., keep only last 30 days)
  // For simplicity, we'll just reset if it's a new day for now, or keep a rolling 30-day window
  // For this implementation, we'll just clear if it's a new day to ensure fresh Hadiths
  const lastSentDate = localStorage.getItem('lastHadithSentDate');
  if (lastSentDate !== today) {
    sentHadithIds = [];
    localStorage.setItem('lastHadithSentDate', today);
  }

  const morningTimeParts = settings.morningHadithTime.split(':').map(Number);
  const eveningTimeParts = settings.eveningHadithTime.split(':').map(Number);

  const morningNotificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), morningTimeParts[0], morningTimeParts[1], 0);
  const eveningNotificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), eveningTimeParts[0], eveningTimeParts[1], 0);

  let nextMorningDelay = morningNotificationTime.getTime() - now.getTime();
  let nextEveningDelay = eveningNotificationTime.getTime() - now.getTime();

  // If morning time has passed today, schedule for tomorrow
  if (nextMorningDelay < 0) {
    morningNotificationTime.setDate(morningNotificationTime.getDate() + 1);
    nextMorningDelay = morningNotificationTime.getTime() - now.getTime();
  }

  // If evening time has passed today, schedule for tomorrow
  if (nextEveningDelay < 0) {
    eveningNotificationTime.setDate(eveningNotificationTime.getDate() + 1);
    nextEveningDelay = eveningNotificationTime.getTime() - now.getTime();
  }

  console.log(`[HadithNotifications] Next morning Hadith in ${nextMorningDelay / 1000 / 60} minutes at ${morningNotificationTime.toLocaleTimeString()}`);
  console.log(`[HadithNotifications] Next evening Hadith in ${nextEveningDelay / 1000 / 60} minutes at ${eveningNotificationTime.toLocaleTimeString()}`);

  morningHadithTimeout = setTimeout(async () => {
    const hadith = getRandomHadith(sentHadithIds);
    if (hadith) {
      nteClient.triggerEvent(
        'DAILY_HADITH_MORNING',
        { hadithId: hadith.id, text: hadith.text, reference: hadith.reference },
        {
          title: 'Daily Hadith',
          body: `${hadith.text.substring(0, 100)}...`,
          icon: '/hadith-icon.png', // Ensure this icon exists
          data: { fullHadith: hadith.text, reference: hadith.reference, page: `/hadith/detail/${hadith.bookId}/${hadith.chapterId}/${hadith.id}` }
        }
      );
      sentHadithIds.push(hadith.id);
      saveSettings({ sentHadithIds });
    }
    scheduleHadithNotification(); // Reschedule for next occurrence
  }, nextMorningDelay);

  eveningHadithTimeout = setTimeout(async () => {
    const hadith = getRandomHadith(sentHadithIds);
    if (hadith) {
      nteClient.triggerEvent(
        'DAILY_HADITH_EVENING',
        { hadithId: hadith.id, text: hadith.text, reference: hadith.reference },
        {
          title: 'Evening Hadith',
          body: `${hadith.text.substring(0, 100)}...`,
          icon: '/hadith-icon.png', // Ensure this icon exists
          data: { fullHadith: hadith.text, reference: hadith.reference, page: `/hadith/detail/${hadith.bookId}/${hadith.chapterId}/${hadith.id}` }
        }
      );
      sentHadithIds.push(hadith.id);
      saveSettings({ sentHadithIds });
    }
    scheduleHadithNotification(); // Reschedule for next occurrence
  }, nextEveningDelay);
};

export const startHadithNotificationScheduler = () => {
  console.log('[HadithNotifications] Starting Hadith notification scheduler.');
  scheduleHadithNotification();
};

export const stopHadithNotificationScheduler = () => {
  console.log('[HadithNotifications] Stopping Hadith notification scheduler.');
  clearTimeout(morningHadithTimeout);
  clearTimeout(eveningHadithTimeout);
};

// Function to handle notification clicks (to be integrated into a global listener or service worker)
export const handleHadithNotificationClick = (notificationData) => {
  if (notificationData && notificationData.page) {
    console.log('[HadithNotifications] Navigating to Hadith detail page:', notificationData.page);
    // Example: navigate using react-router-dom or similar
    // window.location.href = notificationData.page;
    // Or if using react-router-dom, you'd need access to history/navigate object
  }
};
