import nteClient from '../lib/nteClient';
import { hadithCache, CachedHadith } from '../utils/hadithCache';

const PREF_KEY = 'notif_hadith_prefs';
const SENT_KEY = 'notif_hadith_sent_ids';

interface HadithPrefs {
  enabled: boolean;
  morningTime: string;
  eveningTime: string;
}

interface SentHadith {
  id: string;
  timestamp: number;
}

const DEFAULT_PREFS: HadithPrefs = {
  enabled: true,
  morningTime: '08:00',
  eveningTime: '18:00'
};

let timers: number[] = [];

function loadPrefs(): HadithPrefs {
  try {
    const raw = localStorage.getItem(PREF_KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...(JSON.parse(raw) || {}) };
  } catch (e) {
    return DEFAULT_PREFS;
  }
}

function savePrefs(p: HadithPrefs) {
  try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch (e) {}
}

function loadSentIds(): SentHadith[] {
  try {
    const raw = localStorage.getItem(SENT_KEY);
    if (!raw) return [];
    return JSON.parse(raw) || [];
  } catch (e) {
    return [];
  }
}

function saveSentIds(items: SentHadith[]) {
  try { localStorage.setItem(SENT_KEY, JSON.stringify(items)); } catch (e) {}
}

function clearTimers() {
  timers.forEach(t => clearTimeout(t));
  timers = [];
}

function scheduleAt(ms: number, fn: () => void) {
  if (ms <= 0) return null;
  const id = window.setTimeout(fn, ms);
  timers.push(id);
  return id;
}

function isRecentlySent(hadithId: string): boolean {
  const sent = loadSentIds();
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return sent.some(s => s.id === hadithId && s.timestamp > thirtyDaysAgo);
}

function markSent(hadithId: string) {
  const sent = loadSentIds();
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const filtered = sent.filter(s => s.timestamp > thirtyDaysAgo);
  filtered.push({ id: hadithId, timestamp: Date.now() });
  saveSentIds(filtered);
}

async function getRandomHadith(): Promise<CachedHadith | null> {
  try {
    const books = ['bukhari', 'muslim', 'tirmidhi'];
    const allHadiths: CachedHadith[] = [];

    for (const book of books) {
      const chapters = await hadithCache.getAllCachedChapters(book);
      for (const chapter of (chapters || []).slice(0, 10)) {
        const hadiths = await hadithCache.getChapter(book, chapter);
        if (hadiths && hadiths.length > 0) {
          allHadiths.push(...hadiths);
        }
      }
    }

    if (allHadiths.length === 0) return null;

    const available = allHadiths.filter(h => !isRecentlySent(h.id));
    if (available.length === 0) {
      saveSentIds([]);
      return allHadiths[Math.floor(Math.random() * allHadiths.length)];
    }

    return available[Math.floor(Math.random() * available.length)];
  } catch (err) {
    console.error('getRandomHadith error', err);
    return null;
  }
}

function parseTimeToDate(time: string, reference = new Date()) {
  const [hh, mm] = time.split(':').map(Number);
  const d = new Date(reference);
  d.setHours(hh, mm, 0, 0);
  return d;
}

async function sendHadithNotification(title: string, hadith: CachedHadith | null) {
  if (!hadith) {
    console.warn('No hadith available for notification');
    return;
  }

  const body = (hadith.bangla || hadith.arabic || '').substring(0, 100) + ((hadith.bangla || hadith.arabic || '').length > 100 ? '...' : '');
  
  try {
    await nteClient.triggerEvent('DAILY_HADITH', { hadithId: hadith.id, full: hadith.bangla || hadith.arabic }, {
      title,
      body,
      icon: '/icons/hadith-icon.png',
      tag: 'daily-hadith',
    });
    markSent(hadith.id);
  } catch (err) {
    console.error('Failed to send hadith notification:', err);
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/icon-192.png',
          tag: 'daily-hadith',
        });
        markSent(hadith.id);
      } catch (e) { console.error(e); }
    }
  }
}

async function scheduleNextNotification() {
  const prefs = loadPrefs();
  if (!prefs.enabled) return;

  const now = new Date();
  const morningTarget = parseTimeToDate(prefs.morningTime, now);
  const eveningTarget = parseTimeToDate(prefs.eveningTime, now);

  if (morningTarget < now) morningTarget.setDate(morningTarget.getDate() + 1);
  if (eveningTarget < now) eveningTarget.setDate(eveningTarget.getDate() + 1);

  const morningMs = morningTarget.getTime() - now.getTime();
  const eveningMs = eveningTarget.getTime() - now.getTime();

  scheduleAt(morningMs, async () => {
    const hadith = await getRandomHadith();
    await sendHadithNotification('Morning Hadith', hadith);
    scheduleNextNotification();
  });

  scheduleAt(eveningMs, async () => {
    const hadith = await getRandomHadith();
    await sendHadithNotification('Evening Hadith', hadith);
    scheduleNextNotification();
  });
}

export function startHadithNotificationScheduler() {
  clearTimers();
  scheduleNextNotification();
}

export function stopHadithNotificationScheduler() {
  clearTimers();
}

export function updateHadithPrefs(updater: Partial<HadithPrefs>) {
  const prefs = loadPrefs();
  const merged = { ...prefs, ...updater } as HadithPrefs;
  savePrefs(merged);
  stopHadithNotificationScheduler();
  startHadithNotificationScheduler();
}

export function getHadithPrefs(): HadithPrefs {
  return loadPrefs();
}
