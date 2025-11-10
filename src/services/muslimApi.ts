// API service for fetching Sahih Muslim data from fawazahmed0/hadith-api
import { hadithCache, CachedHadith } from "@/utils/hadithCache";

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

interface ArabicHadith {
  hadithNumber: string;
  arabicText: string;
  book: {
    bookNumber: string;
    bookName: string;
  };
  chapter: {
    chapterNumber: string;
    chapterArabic: string;
    chapterEnglish: string;
  };
}

interface CombinedHadith {
  id: string;
  hadithNumber: string;
  chapterHadithNumber?: string; // Chapter-relative hadith number (1, 2, 3...)
  arabic: string;
  bangla: string;
  bookNumber: string;
  bookName: string;
  chapterNumber: string;
  chapterArabic: string;
  chapterEnglish: string;
  reference: string;
}

interface Chapter {
  id: string;
  nameBangla: string;
  nameEnglish: string;
  nameArabic: string;
  hadithCount: number;
}

// সহীহ মুসলিম - সম্পূর্ণ ৫৬টি অধ্যায়ের সঠিক নাম (Sunnah.com থেকে সংগৃহীত)
export const muslimChapterNames: Record<string, string> = {
  '1': 'ঈমান', '2': 'পবিত্রতা', '3': 'হায়েয', '4': 'সালাত', '5': 'মসজিদসমূহ ও সালাতের স্থান',
  '6': 'মুসাফিরের সালাত ও তা সংক্ষিপ্তকরণ', '7': 'জুমআ', '8': 'দুই ঈদের সালাত', '9': 'ইস্তিসকা (বৃষ্টির সালাত)', '10': 'সূর্যগ্রহণ',
  '11': 'জানাযা', '12': 'যাকাত', '13': 'সাওম (রোযা)', '14': 'ইতিকাফ', '15': 'হজ্জ',
  '16': 'বিবাহ', '17': 'দুধপান', '18': 'তালাক', '19': 'লিআন', '20': 'মুক্তি ও দাসত্ব',
  '21': 'ক্রয়-বিক্রয়', '22': 'মুসাকাত (ফসল ভাগাভাগি)', '23': 'মীরাস (উত্তরাধিকার)', '24': 'হাদিয়া (উপহার)', '25': 'অসিয়ত',
  '26': 'মানত', '27': 'শপথ', '28': 'কিসাস (প্রতিশোধ)', '29': 'হুদুদ (দণ্ডবিধি)', '30': 'বিচার-আচার',
  '31': 'হারানো বস্তু', '32': 'জিহাদ ও সিয়ার', '33': 'ইমারত (নেতৃত্ব)', '34': 'শিকার ও জবেহ', '35': 'কুরবানী',
  '36': 'পানীয়', '37': 'পোশাক ও সাজসজ্জা', '38': 'আদব', '39': 'সালাম', '40': 'শব্দ ও কথাবার্তা',
  '41': 'কবিতা', '42': 'স্বপ্ন', '43': 'ফযিলত', '44': 'সাহাবায়ে কিরামের ফযিলত', '45': 'সৎকাজ ও আত্মীয়তার সম্পর্ক',
  '46': 'তাকদীর', '47': 'ইলম (জ্ঞান)', '48': 'যিকির, দুআ, তাওবা ও ইস্তিগফার', '49': 'তাওবা', '50': 'মুনাফিকদের বৈশিষ্ট্য ও বিধান',
  '51': 'জান্নাত, জান্নাতের নিআমত ও জান্নাতিদের বর্ণনা', '52': 'ফিতনা ও কিয়ামতের আলামত', '53': 'যুহুদ ও কোমল হৃদয়ের বর্ণনা', '54': 'তাফসীর', '55': 'তাওবা ও আল্লাহর নিকট ক্ষমা প্রার্থনা',
  '56': 'জান্নাতিদের গুণাবলী ও তাদের প্রাপ্য নিআমত',
};

// Caching system
let arabicCache: ArabicHadith[] | null = null;
let banglaCache: Record<string, string> | null = null;
let chapterCache: Map<string, ArabicHadith[]> = new Map();
let fetchPromises: Map<string, Promise<any>> = new Map();

// Fetch all sections for Arabic hadiths (56 sections for Muslim)
async function fetchArabicHadiths(): Promise<ArabicHadith[]> {
  if (arabicCache) return arabicCache;
  
  const cacheKey = 'muslim_arabic_all';
  if (fetchPromises.has(cacheKey)) {
    return fetchPromises.get(cacheKey)!;
  }
  
  const promise = (async () => {
    const allHadiths: ArabicHadith[] = [];
    
    // Muslim has 56 sections
    for (let section = 1; section <= 56; section++) {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/ara-muslim/sections/${section}.json`
        );
        const data: ApiSection = await response.json();
        
        const sectionName = data.metadata.section[section] || `Section ${section}`;
        
        data.hadiths.forEach((h) => {
          allHadiths.push({
            hadithNumber: h.hadithnumber.toString(),
            arabicText: h.text,
            book: {
              bookNumber: '1',
              bookName: 'Sahih Muslim'
            },
            chapter: {
              chapterNumber: section.toString(),
              chapterArabic: '',
              chapterEnglish: sectionName
            }
          });
        });
      } catch (error) {
        console.error(`Failed to fetch Muslim section ${section}:`, error);
      }
    }
    
    arabicCache = allHadiths;
    fetchPromises.delete(cacheKey);
    return arabicCache;
  })();
  
  fetchPromises.set(cacheKey, promise);
  return promise;
}

// Fetch Bangla translations
async function fetchBanglaHadiths(): Promise<Record<string, string>> {
  if (banglaCache) return banglaCache;
  
  const cacheKey = 'muslim_bangla_all';
  if (fetchPromises.has(cacheKey)) {
    return fetchPromises.get(cacheKey)!;
  }
  
  const promise = (async () => {
    const allBangla: Record<string, string> = {};
    
    // Fetch all 56 sections  
    for (let section = 1; section <= 56; section++) {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/ben-muslim/sections/${section}.json`
        );
        const data: ApiSection = await response.json();
        
        data.hadiths.forEach((h) => {
          allBangla[h.hadithnumber.toString()] = h.text;
        });
      } catch (error) {
        console.error(`Failed to fetch Bengali Muslim section ${section}:`, error);
      }
    }
    
    banglaCache = allBangla;
    fetchPromises.delete(cacheKey);
    return banglaCache;
  })();
  
  fetchPromises.set(cacheKey, promise);
  return promise;
}

// Get all chapters (instant from cache)
export async function getMuslimChapters(): Promise<Chapter[]> {
  const arabicHadiths = await fetchArabicHadiths();
  
  const chaptersMap = new Map<string, Chapter>();
  
  arabicHadiths.forEach((hadith) => {
    const chapterId = hadith.chapter.chapterNumber;
    if (!chaptersMap.has(chapterId)) {
      chaptersMap.set(chapterId, {
        id: chapterId,
        nameBangla: muslimChapterNames[chapterId] || hadith.chapter.chapterEnglish,
        nameEnglish: hadith.chapter.chapterEnglish,
        nameArabic: hadith.chapter.chapterArabic,
        hadithCount: 0,
      });
    }
    const chapter = chaptersMap.get(chapterId)!;
    chapter.hadithCount++;
  });
  
  // Cache by chapter for instant access
  arabicHadiths.forEach((hadith) => {
    const chapterId = hadith.chapter.chapterNumber;
    if (!chapterCache.has(chapterId)) {
      chapterCache.set(chapterId, []);
    }
    chapterCache.get(chapterId)!.push(hadith);
  });
  
  return Array.from(chaptersMap.values()).sort((a, b) => 
    parseInt(a.id) - parseInt(b.id)
  );
}

// Get hadiths for a specific chapter with instant pagination
export async function getChapterHadiths(
  chapterNumber: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ hadiths: CombinedHadith[]; totalCount: number; hasMore: boolean }> {
  // Try cache first
  const cachedHadiths = await hadithCache.getChapter('muslim', chapterNumber);
  
  if (cachedHadiths && cachedHadiths.length > 0) {
    // Sort by hadith number to ensure sequential display
    const sortedHadiths = [...cachedHadiths].sort((a, b) => 
      parseInt(a.hadithNumber) - parseInt(b.hadithNumber)
    );
    
    const totalCount = sortedHadiths.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const hasMore = endIndex < totalCount;
    const paginatedHadiths = sortedHadiths.slice(startIndex, endIndex);
    
    const combined = paginatedHadiths.map((h, index) => ({
      id: h.id,
      hadithNumber: h.hadithNumber,
      chapterHadithNumber: h.chapterHadithNumber || (startIndex + index + 1).toString(),
      arabic: h.arabic,
      bangla: h.bangla,
      bookNumber: h.bookNumber,
      bookName: h.bookName,
      chapterNumber: h.chapterNumber,
      chapterArabic: h.chapterArabic,
      chapterEnglish: h.chapterEnglish,
      reference: h.reference,
    }));
    
    return { hadiths: combined, totalCount, hasMore };
  }

  // Fallback to API
  let chapterHadiths: ArabicHadith[];
  
  if (chapterCache.has(chapterNumber)) {
    chapterHadiths = chapterCache.get(chapterNumber)!;
  } else {
    const arabicHadiths = await fetchArabicHadiths();
    chapterHadiths = arabicHadiths.filter(
      (h) => h.chapter.chapterNumber === chapterNumber
    );
    chapterCache.set(chapterNumber, chapterHadiths);
  }
  
  // Sort hadiths by their global hadith number for sequential display
  chapterHadiths.sort((a, b) => parseInt(a.hadithNumber) - parseInt(b.hadithNumber));
  
  const banglaData = await fetchBanglaHadiths();
  
  const totalCount = chapterHadiths.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const hasMore = endIndex < totalCount;
  const paginatedHadiths = chapterHadiths.slice(startIndex, endIndex);
  
  const combined = paginatedHadiths.map((arabic, index) => {
    const bangla = banglaData[arabic.hadithNumber];
    return {
      id: arabic.hadithNumber,
      hadithNumber: arabic.hadithNumber,
      chapterHadithNumber: (startIndex + index + 1).toString(),
      arabic: arabic.arabicText,
      bangla: bangla || 'অনুবাদ শীঘ্রই যুক্ত হবে',
      bookNumber: arabic.book.bookNumber,
      bookName: arabic.book.bookName,
      chapterNumber: arabic.chapter.chapterNumber,
      chapterArabic: arabic.chapter.chapterArabic,
      chapterEnglish: arabic.chapter.chapterEnglish,
      reference: `সহীহ মুসলিম ${arabic.hadithNumber}`,
    };
  });
  
  return { hadiths: combined, totalCount, hasMore };
}

// Get a single hadith by number (instant from cache)
export async function getHadithByNumber(hadithNumber: string): Promise<CombinedHadith | null> {
  const [arabicHadiths, banglaData] = await Promise.all([
    fetchArabicHadiths(),
    fetchBanglaHadiths(),
  ]);
  
  const arabic = arabicHadiths.find((h) => h.hadithNumber === hadithNumber);
  if (!arabic) return null;
  
  const bangla = banglaData[hadithNumber];
  
  return {
    id: arabic.hadithNumber,
    hadithNumber: arabic.hadithNumber,
    arabic: arabic.arabicText,
    bangla: bangla || 'অনুবাদ শীঘ্রই যুক্ত হবে',
    bookNumber: arabic.book.bookNumber,
    bookName: arabic.book.bookName,
    chapterNumber: arabic.chapter.chapterNumber,
    chapterArabic: arabic.chapter.chapterArabic,
    chapterEnglish: arabic.chapter.chapterEnglish,
    reference: `সহীহ মুসলিম ${arabic.hadithNumber}`,
  };
}

// Prefetch next page in background for instant loading
export function prefetchNextPage(chapterNumber: string, currentPage: number, pageSize: number = 10) {
  setTimeout(() => {
    getChapterHadiths(chapterNumber, currentPage + 1, pageSize).catch(() => {});
  }, 100);
}

// Search hadiths
export async function searchHadiths(query: string): Promise<CombinedHadith[]> {
  const [arabicHadiths, banglaData] = await Promise.all([
    fetchArabicHadiths(),
    fetchBanglaHadiths(),
  ]);
  
  const lowerQuery = query.toLowerCase();
  const filtered = arabicHadiths.filter((arabic) => {
    const bangla = banglaData[arabic.hadithNumber];
    return (
      arabic.arabicText.toLowerCase().includes(lowerQuery) ||
      bangla?.toLowerCase().includes(lowerQuery) ||
      arabic.hadithNumber.includes(query)
    );
  }).slice(0, 50); // Limit search results
  
  return filtered.map((arabic) => {
    const bangla = banglaData[arabic.hadithNumber];
    return {
      id: arabic.hadithNumber,
      hadithNumber: arabic.hadithNumber,
      arabic: arabic.arabicText,
      bangla: bangla || 'অনুবাদ শীঘ্রই যুক্ত হবে',
      bookNumber: arabic.book.bookNumber,
      bookName: arabic.book.bookName,
      chapterNumber: arabic.chapter.chapterNumber,
      chapterArabic: arabic.chapter.chapterArabic,
      chapterEnglish: arabic.chapter.chapterEnglish,
      reference: `সহীহ মুসলিম ${arabic.hadithNumber}`,
    };
  });
}
