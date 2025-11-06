// Pre-download all surahs for offline reading
import { verseCache, Verse } from "./verseCache";
import { surahList } from "@/data/surahs";

const PRELOAD_KEY = 'surah-preload-status';
const BATCH_SIZE = 3; // Download 3 surahs at a time to avoid overwhelming the API

interface PreloadStatus {
  completed: number[];
  lastUpdate: number;
  isComplete: boolean;
}

class SurahPreloader {
  private isPreloading = false;

  async getStatus(): Promise<PreloadStatus> {
    const stored = localStorage.getItem(PRELOAD_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return { completed: [], lastUpdate: 0, isComplete: false };
  }

  private async saveStatus(status: PreloadStatus): Promise<void> {
    localStorage.setItem(PRELOAD_KEY, JSON.stringify(status));
  }

  async startPreloading(): Promise<void> {
    if (this.isPreloading) return;
    if (!navigator.onLine) return;

    this.isPreloading = true;
    const status = await this.getStatus();
    
    if (status.isComplete) {
      this.isPreloading = false;
      return;
    }

    const remaining = surahList
      .map(s => s.number)
      .filter(num => !status.completed.includes(num));

    console.log(`📥 Pre-loading ${remaining.length} surahs for offline reading...`);

    // Process in batches
    for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
      const batch = remaining.slice(i, i + BATCH_SIZE);
      
      await Promise.all(
        batch.map(surahNum => this.downloadSurah(surahNum, status))
      );

      // Small delay between batches
      if (i + BATCH_SIZE < remaining.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    status.isComplete = true;
    status.lastUpdate = Date.now();
    await this.saveStatus(status);
    
    console.log('✅ All surahs cached for offline reading!');
    this.isPreloading = false;
  }

  private async downloadSurah(surahNum: number, status: PreloadStatus): Promise<void> {
    try {
      // Check if already cached
      const cached = await verseCache.getVerses(surahNum);
      if (cached && cached.length > 0) {
        if (!status.completed.includes(surahNum)) {
          status.completed.push(surahNum);
          await this.saveStatus(status);
        }
        return;
      }

      // Fetch and cache
      const [arabicRes, bengaliRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/ar.alafasy`),
        fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/bn.bengali`)
      ]);

      if (!arabicRes.ok || !bengaliRes.ok) {
        console.warn(`Failed to download surah ${surahNum}`);
        return;
      }

      const [arabicData, bengaliData] = await Promise.all([
        arabicRes.json(),
        bengaliRes.json()
      ]);

      const verses: Verse[] = arabicData.data.ayahs.map((ayah: any, idx: number) => ({
        numberInSurah: ayah.numberInSurah,
        text: ayah.text,
        translation: bengaliData.data.ayahs[idx]?.text || ""
      }));

      await verseCache.saveVerses(surahNum, verses);
      
      if (!status.completed.includes(surahNum)) {
        status.completed.push(surahNum);
        await this.saveStatus(status);
      }

      console.log(`✓ Cached surah ${surahNum} (${status.completed.length}/114)`);
    } catch (error) {
      console.error(`Error caching surah ${surahNum}:`, error);
    }
  }

  async checkAndResume(): Promise<void> {
    const status = await this.getStatus();
    if (!status.isComplete && navigator.onLine) {
      // Resume preloading in the background
      setTimeout(() => this.startPreloading(), 2000);
    }
  }
}

export const surahPreloader = new SurahPreloader();
