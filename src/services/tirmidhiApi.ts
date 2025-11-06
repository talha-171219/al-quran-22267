// API service for fetching Jami` at-Tirmidhi data from fawazahmed0/hadith-api

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

// জামে তিরমিযি - সম্পূর্ণ ৪৬টি অধ্যায়ের সঠিক নাম (Sunnah.com থেকে)
const chapterNamesBangla: Record<string, string> = {
  '1': 'পবিত্রতা', '2': 'সালাত', '3': 'বিতর', '4': 'জুমআ', '5': 'দুই ঈদ',
  '6': 'সফর', '7': 'যাকাত', '8': 'সাওম (রোযা)', '9': 'হজ্জ', '10': 'জানাযা',
  '11': 'বিবাহ', '12': 'দুধপান', '13': 'তালাক ও লিআন', '14': 'ব্যবসা-বাণিজ্য', '15': 'বিচার-ফয়সালা',
  '16': 'দিয়াত (রক্তমূল্য)', '17': 'হুদুদ (শাস্তি)', '18': 'শিকার ও জবেহ', '19': 'কুরবানী', '20': 'মানত ও শপথ',
  '21': 'সামরিক অভিযান', '22': 'জিহাদের ফযিলত', '23': 'জিহাদ', '24': 'পোশাক', '25': 'খাদ্য',
  '26': 'পানীয়', '27': 'সদাচার ও আত্মীয়তার সম্পর্ক', '28': 'চিকিৎসা', '29': 'মীরাস (উত্তরাধিকার)', '30': 'অসিয়ত',
  '31': 'ওয়ালা ও হাদিয়া', '32': 'তাকদীর', '33': 'ফিতনা', '34': 'স্বপ্ন', '35': 'সাক্ষী',
  '36': 'যুহদ (দুনিয়া বিমুখতা)', '37': 'কিয়ামত ও রিকাক', '38': 'জান্নাতের বর্ণনা', '39': 'জাহান্নামের বর্ণনা', '40': 'ঈমান',
  '41': 'ইলম (জ্ঞান)', '42': 'অনুমতি', '43': 'আদব (শিষ্টাচার)', '44': 'ব্যভিচার', '45': 'দুআ',
  '46': 'তাফসীর',
};

// Caching system
let arabicCache: ArabicHadith[] | null = null;
let banglaCache: Record<string, string> | null = null;
let chapterCache: Map<string, ArabicHadith[]> = new Map();
let fetchPromises: Map<string, Promise<any>> = new Map();

// Fetch all sections for Arabic hadiths (46 sections for Tirmidhi)
async function fetchArabicHadiths(): Promise<ArabicHadith[]> {
  if (arabicCache) return arabicCache;
  
  const cacheKey = 'tirmidhi_arabic_all';
  if (fetchPromises.has(cacheKey)) {
    return fetchPromises.get(cacheKey)!;
  }
  
  const promise = (async () => {
    const allHadiths: ArabicHadith[] = [];
    
    // Tirmidhi has 46 sections
    for (let section = 1; section <= 46; section++) {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-tirmizi/sections/${section}.json`
        );
        const data: ApiSection = await response.json();
        
        const sectionName = data.metadata.section[section] || `Section ${section}`;
        
        data.hadiths.forEach((h) => {
          allHadiths.push({
            hadithNumber: h.hadithnumber.toString(),
            arabicText: h.text,
            book: {
              bookNumber: '1',
              bookName: 'Jami` at-Tirmidhi'
            },
            chapter: {
              chapterNumber: section.toString(),
              chapterArabic: '',
              chapterEnglish: sectionName
            }
          });
        });
      } catch (error) {
        console.error(`Failed to fetch Tirmidhi section ${section}:`, error);
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
  
  const cacheKey = 'tirmidhi_bangla_all';
  if (fetchPromises.has(cacheKey)) {
    return fetchPromises.get(cacheKey)!;
  }
  
  const promise = (async () => {
    const allBangla: Record<string, string> = {};
    
    // Fetch all 46 sections
    for (let section = 1; section <= 46; section++) {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-tirmizi/sections/${section}.json`
        );
        const data: ApiSection = await response.json();
        
        data.hadiths.forEach((h) => {
          allBangla[h.hadithnumber.toString()] = h.text;
        });
      } catch (error) {
        console.error(`Failed to fetch Bengali Tirmidhi section ${section}:`, error);
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
export async function getTirmidhiChapters(): Promise<Chapter[]> {
  const arabicHadiths = await fetchArabicHadiths();
  
  const chaptersMap = new Map<string, Chapter>();
  
  arabicHadiths.forEach((hadith) => {
    const chapterId = hadith.chapter.chapterNumber;
    if (!chaptersMap.has(chapterId)) {
      chaptersMap.set(chapterId, {
        id: chapterId,
        nameBangla: chapterNamesBangla[chapterId] || hadith.chapter.chapterEnglish,
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
  // Use cached chapter data if available for instant response
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
  
  // Get Bangla data (will use cache if available)
  const banglaData = await fetchBanglaHadiths();
  
  const totalCount = chapterHadiths.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const hasMore = endIndex < totalCount;
  const paginatedHadiths = chapterHadiths.slice(startIndex, endIndex);
  
  const combined = paginatedHadiths.map((arabic) => {
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
      reference: `জামে তিরমিযি ${arabic.hadithNumber}`,
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
    reference: `জামে তিরমিযি ${arabic.hadithNumber}`,
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
      reference: `জামে তিরমিযি ${arabic.hadithNumber}`,
    };
  });
}
