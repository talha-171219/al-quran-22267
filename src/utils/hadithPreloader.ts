// Pre-download all hadiths for offline reading
import { hadithCache, CachedHadith } from "./hadithCache";

const PRELOAD_KEY = 'hadith-preload-status';
const BATCH_SIZE = 2; // Download 2 chapters at a time

interface PreloadStatus {
  bukhari: { completed: string[]; total: number };
  tirmidhi: { completed: string[]; total: number };
  lastUpdate: number;
  isComplete: boolean;
}

interface ApiHadith {
  hadithnumber: number;
  arabicnumber: number;
  text: string;
  grades: any[];
  reference: {
    book: number;
    hadith: number;
  };
}

interface ApiSection {
  metadata: {
    name: string;
    section: Record<string, string>;
    section_detail: Record<string, any>;
  };
  hadiths: ApiHadith[];
}

class HadithPreloader {
  private isPreloading = false;

  async getStatus(): Promise<PreloadStatus> {
    const stored = localStorage.getItem(PRELOAD_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      bukhari: { completed: [], total: 97 },
      tirmidhi: { completed: [], total: 46 },
      lastUpdate: 0,
      isComplete: false
    };
  }

  private async saveStatus(status: PreloadStatus): Promise<void> {
    localStorage.setItem(PRELOAD_KEY, JSON.stringify(status));
  }

  async startPreloading(): Promise<void> {
    if (this.isPreloading) return;

    this.isPreloading = true;
    const status = await this.getStatus();
    
    if (status.isComplete) {
      this.isPreloading = false;
      return;
    }

    console.log(`📥 হাদিস ডাউনলোড শুরু হচ্ছে...`);

    // Download Bukhari chapters
    const bukhariRemaining = Array.from({ length: 97 }, (_, i) => (i + 1).toString())
      .filter(num => !status.bukhari.completed.includes(num));

    for (let i = 0; i < bukhariRemaining.length; i += BATCH_SIZE) {
      const batch = bukhariRemaining.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(chapter => this.downloadChapter('bukhari', chapter, status))
      );
      if (i + BATCH_SIZE < bukhariRemaining.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Download Tirmidhi chapters
    const tirmidhiRemaining = Array.from({ length: 46 }, (_, i) => (i + 1).toString())
      .filter(num => !status.tirmidhi.completed.includes(num));

    for (let i = 0; i < tirmidhiRemaining.length; i += BATCH_SIZE) {
      const batch = tirmidhiRemaining.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(chapter => this.downloadChapter('tirmidhi', chapter, status))
      );
      if (i + BATCH_SIZE < tirmidhiRemaining.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    status.isComplete = true;
    status.lastUpdate = Date.now();
    await this.saveStatus(status);
    
    console.log('✅ সব হাদিস ডাউনলোড সম্পূর্ণ হয়েছে!');
    this.isPreloading = false;
  }

  private async downloadChapter(bookId: string, chapterNumber: string, status: PreloadStatus): Promise<void> {
    try {
      const cached = await hadithCache.getChapter(bookId, chapterNumber);
      if (cached && cached.length > 0) {
        const bookStatus = bookId === 'bukhari' ? status.bukhari : status.tirmidhi;
        if (!bookStatus.completed.includes(chapterNumber)) {
          bookStatus.completed.push(chapterNumber);
          await this.saveStatus(status);
        }
        return;
      }

      const edition = bookId === 'bukhari' ? 'bukhari' : 'tirmizi';
      const benEdition = bookId === 'bukhari' ? 'bukhari' : 'tirmizi';

      const [arabicRes, bengaliRes] = await Promise.all([
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${edition}/sections/${chapterNumber}.json`),
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-${benEdition}/sections/${chapterNumber}.json`)
      ]);

      if (!arabicRes.ok || !bengaliRes.ok) {
        console.warn(`Failed to download ${bookId} chapter ${chapterNumber}`);
        return;
      }

      const [arabicData, bengaliData] = await Promise.all([
        arabicRes.json() as Promise<ApiSection>,
        bengaliRes.json() as Promise<ApiSection>
      ]);

      const hadiths: CachedHadith[] = arabicData.hadiths.map((h, idx) => ({
        id: h.hadithnumber.toString(),
        hadithNumber: h.hadithnumber.toString(),
        arabic: h.text,
        bangla: bengaliData.hadiths[idx]?.text || 'অনুবাদ শীঘ্রই যুক্ত হবে',
        bookId,
        bookNumber: '1',
        bookName: bookId === 'bukhari' ? 'সহীহ বুখারী' : 'জামে তিরমিযি',
        chapterNumber,
        chapterArabic: '',
        chapterEnglish: arabicData.metadata.section[parseInt(chapterNumber)] || '',
        reference: `${bookId === 'bukhari' ? 'সহীহ বুখারী' : 'জামে তিরমিযি'} ${h.hadithnumber}`
      }));

      await hadithCache.saveChapter(bookId, chapterNumber, hadiths);
      
      const bookStatus = bookId === 'bukhari' ? status.bukhari : status.tirmidhi;
      if (!bookStatus.completed.includes(chapterNumber)) {
        bookStatus.completed.push(chapterNumber);
        await this.saveStatus(status);
      }

      const totalCompleted = status.bukhari.completed.length + status.tirmidhi.completed.length;
      const totalChapters = status.bukhari.total + status.tirmidhi.total;
      console.log(`✓ ডাউনলোড সম্পন্ন: ${bookId} অধ্যায় ${chapterNumber} (${totalCompleted}/${totalChapters})`);
    } catch (error) {
      console.error(`Error downloading ${bookId} chapter ${chapterNumber}:`, error);
    }
  }

  async checkAndResume(): Promise<void> {
    const status = await this.getStatus();
    if (!status.isComplete) {
      setTimeout(() => this.startPreloading(), 1000);
    }
  }
}

export const hadithPreloader = new HadithPreloader();
