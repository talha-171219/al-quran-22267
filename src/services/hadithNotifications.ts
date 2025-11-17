import nteClient from '../lib/nteClient';
import { hadithCache, CachedHadith } from '../utils/hadithCache';

const PREF_KEY = 'notif_hadith_prefs';
const SENT_KEY = 'notif_hadith_sent_ids';

interface HadithPrefs {
  enabled: boolean;
  morningTime: string; // HH:MM
  eveningTime: string; // HH:MM
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
  // Remove old entries
  const filtered = sent.filter(s => s.timestamp > thirtyDaysAgo);
  // Add new one
  filtered.push({ id: hadithId, timestamp: Date.now() });
  saveSentIds(filtered);
}

async function getRandomHadith(): Promise<CachedHadith | null> {
  try {
    const books = ['bukhari', 'muslim', 'tirmidhi'];
    const allHadiths: CachedHadith[] = [];

    for (const book of books) {
      // get a limited set of chapters to avoid long scans
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
      // reset sent list and pick any
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
      data: { hadithId: hadith.id, bookId: hadith.bookId }
    });
    markSent(hadith.id);
  } catch (err) {
    console.error('sendHadithNotification error', err);
  }
}

export async function startHadithNotificationScheduler() {
  try {
    const prefs = loadPrefs();
    if (!prefs.enabled) return;

    clearTimers();
    const now = new Date();

    // Morning
    const morningDate = parseTimeToDate(prefs.morningTime, now);
    let msMorning = morningDate.getTime() - now.getTime();
    if (msMorning < 0) msMorning += 24 * 60 * 60 * 1000;

    scheduleAt(msMorning, async () => {
      const hadith = await getRandomHadith();
      await sendHadithNotification('Daily Hadith', hadith);
      // Reschedule next day
      scheduleAt(24 * 60 * 60 * 1000, () => startHadithNotificationScheduler());
    });

    // Evening
    const eveningDate = parseTimeToDate(prefs.eveningTime, now);
    let msEvening = eveningDate.getTime() - now.getTime();
    if (msEvening < 0) msEvening += 24 * 60 * 60 * 1000;

    scheduleAt(msEvening, async () => {
      const hadith = await getRandomHadith();
      await sendHadithNotification('Evening Hadith', hadith);
      scheduleAt(24 * 60 * 60 * 1000, () => startHadithNotificationScheduler());
    });
  } catch (err) {
    console.error('startHadithNotificationScheduler error', err);
  }
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
import nteClient from '@/nteClient';

// Simple hadith notification scheduler
// Defaults: morning 08:00, evening 18:00

type Hadith = {
  id: string | number;
  text: string;
  reference?: string;
};

const STORAGE_KEY_SENT = 'hadith_sent_ids';
const STORAGE_KEY_SETTINGS = 'hadith_notification_settings';

export interface HadithSettings {
  enabled: boolean;
  morningTime: string; // '08:00'
  eveningTime: string; // '18:00'
}

const DEFAULT_SETTINGS: HadithSettings = {
  enabled: true,
  morningTime: '08:00',
  eveningTime: '18:00',
};

let morningTimeout: number | null = null;
let eveningTimeout: number | null = null;

// Placeholder: fetch a random hadith from existing collection
// The app has hadith data in src/data or pages; try to load via dynamic import
async function fetchAllHadiths(): Promise<Hadith[]> {
  try {
    // Try to import a module that contains hadiths; fallback to API call if needed
    // Adjust this path if your hadith data lives elsewhere
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = await import('@/data/hadiths.json').catch(() => null);
    if (module && module.default) {
      return module.default as Hadith[];
    }
  } catch (e) {
    console.warn('Hadith import failed:', e);
  }

  // Last resort: empty array
  return [];
}

function loadSettings(): HadithSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (raw) return JSON.parse(raw) as HadithSettings;
  } catch (e) {
    /* ignore */
  }
  return DEFAULT_SETTINGS;
}

function saveSettings(s: HadithSettings) {
  try { localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(s)); } catch (e) { }
}

function loadSentIds(): { id: string | number; ts: number }[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SENT);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveSentIds(arr: { id: string | number; ts: number }[]) {
  try { localStorage.setItem(STORAGE_KEY_SENT, JSON.stringify(arr)); } catch (e) { }
}

function pickRandomHadith(all: Hadith[], excludeIds: Set<string | number>): Hadith | null {
  const pool = all.filter(h => !excludeIds.has(String(h.id)) && !excludeIds.has(h.id));
  if (pool.length === 0) return null;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}

function msUntilNextTime(timeStr: string): number {
  const [hh, mm] = timeStr.split(':').map(Number);
  const now = new Date();
  const target = new Date(now);
  target.setHours(hh, mm, 0, 0);
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 1);
  return target.getTime() - now.getTime();
}

async function sendHadithNotification(hadith: Hadith, when: 'morning' | 'evening') {
  const title = when === 'morning' ? 'Daily Hadith' : 'Evening Hadith';
  const body = hadith.text.length > 100 ? hadith.text.slice(0, 100) + '...' : hadith.text;

  try {
    nteClient.triggerEvent('HADITH_NOTIFICATION', { hadithId: hadith.id }, {
      title,
      body,
      icon: '/icon-192.png',
      tag: `hadith-${hadith.id}`,
      data: { hadith }
    });
  } catch (err) {
    console.error('NTE trigger error (hadith):', err);
    // fallback to local Notification
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, { body, icon: '/icon-192.png', tag: `hadith-${hadith.id}`, data: hadith as any });
      } catch (e) { console.error(e); }
    }
  }

  // record sent id with timestamp
  const sent = loadSentIds();
  sent.push({ id: hadith.id, ts: Date.now() });
  // keep only last 180 days to avoid unbounded growth
  const cutoff = Date.now() - 180 * 24 * 60 * 60 * 1000;
  const pruned = sent.filter(s => s.ts >= cutoff);
  saveSentIds(pruned);
}

export async function scheduleHadiths() {
  const settings = loadSettings();
  if (!settings.enabled) return;

  const all = await fetchAllHadiths();
  if (!all || all.length === 0) return;

  const sent = loadSentIds();
  // build exclude set of ids sent in last 30 days
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recent = new Set(sent.filter(s => s.ts >= thirtyDaysAgo).map(s => s.id));

  // Schedule morning
  if (morningTimeout) {
    window.clearTimeout(morningTimeout as any);
    morningTimeout = null;
  }
  const msMorning = msUntilNextTime(settings.morningTime);
  morningTimeout = window.setTimeout(async () => {
    // pick hadith
    const hadith = pickRandomHadith(all, recent);
    if (hadith) {
      await sendHadithNotification(hadith, 'morning');
    } else {
      // if exhausted, reset recent and pick again
      const had = pickRandomHadith(all, new Set());
      if (had) await sendHadithNotification(had, 'morning');
    }
    // reschedule next day
    scheduleHadiths();
  }, msMorning) as unknown as number;

  // Schedule evening
  if (eveningTimeout) {
    window.clearTimeout(eveningTimeout as any);
    eveningTimeout = null;
  }
  const msEvening = msUntilNextTime(settings.eveningTime);
  eveningTimeout = window.setTimeout(async () => {
    const hadith = pickRandomHadith(all, recent);
    if (hadith) {
      await sendHadithNotification(hadith, 'evening');
    } else {
      const had = pickRandomHadith(all, new Set());
      if (had) await sendHadithNotification(had, 'evening');
    }
    scheduleHadiths();
  }, msEvening) as unknown as number;
}

export function stopHadithSchedule() {
  if (morningTimeout) { window.clearTimeout(morningTimeout as any); morningTimeout = null; }
  if (eveningTimeout) { window.clearTimeout(eveningTimeout as any); eveningTimeout = null; }
}

export function updateHadithSettings(s: Partial<HadithSettings>) {
  const cur = loadSettings();
  const merged = { ...cur, ...s };
  saveSettings(merged);
  // reschedule
  stopHadithSchedule();
  if (merged.enabled) scheduleHadiths();
}

export function sendTestHadith() {
  // pick first available hadith quickly
  fetchAllHadiths().then(all => {
    if (!all || all.length === 0) return;
    const h = all[Math.floor(Math.random() * all.length)];
    sendHadithNotification(h, 'morning');
  });
}

// Notification click handler should be implemented in service worker / NTE side to open app and navigate.

export default {
  scheduleHadiths,
  stopHadithSchedule,
  updateHadithSettings,
  sendTestHadith,
};
