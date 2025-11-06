// API service for fetching Sahih al-Bukhari data from fawazahmed0/hadith-api

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

interface BanglaHadith {
  hadithnumber: number;
  text: string;
}

interface BanglaData {
  [key: string]: string;  // hadith number -> bangla text
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

// সম্পূর্ণ বাংলা অধ্যায়ের নাম - সহীহ বুখারী ৯৭টি অধ্যায়
const chapterNamesBangla: Record<string, string> = {
  '1': 'ওহী শুরু হওয়ার বর্ণনা',
  '2': 'ঈমান',
  '3': 'ইলম (জ্ঞান)',
  '4': 'ওযু',
  '5': 'গোসল',
  '6': 'হায়েয',
  '7': 'তায়াম্মুম',
  '8': 'সালাত',
  '9': 'সালাতের ওয়াক্তসমূহ',
  '10': 'আযান',
  '11': 'জুমআ',
  '12': 'ভয়ের সালাত',
  '13': 'ঈদ',
  '14': 'বিতর',
  '15': 'ইস্তিসকা',
  '16': 'কুসুফ (সূর্যগ্রহণ)',
  '17': 'সিজদা',
  '18': 'সালাত সংক্ষিপ্তকরণ',
  '19': 'তাহাজ্জুদ',
  '20': 'সালাতে দুআ',
  '21': 'আমল বিল লাইল (রাতের আমল)',
  '22': 'মসজিদসমূহের ফযিলত',
  '23': 'জানাযা',
  '24': 'যাকাত',
  '25': 'হজ্জ',
  '26': 'উমরা',
  '27': 'মুহসার',
  '28': 'জাযায়ে সায়েদ (শিকার)',
  '29': 'ফাযায়েলে মদীনা',
  '30': 'সাওম (রোযা)',
  '31': 'তারাবীহ',
  '32': 'ইতিকাফ',
  '33': 'বিক্রয়',
  '34': 'সালাম',
  '35': 'শুফআ',
  '36': 'ইজারা',
  '37': 'হাওয়ালা',
  '38': 'কাফালত',
  '39': 'ওয়াকালা',
  '40': 'কৃষিকাজ',
  '41': 'পানি সেচ',
  '42': 'ঋণ',
  '43': 'হাওয়ালা ও মাজলুম',
  '44': 'সন্ধি',
  '45': 'শর্ত',
  '46': 'অসিয়ত',
  '47': 'জিহাদ',
  '48': 'সৃষ্টির সূচনা',
  '49': 'আম্বিয়া কিরাম',
  '50': 'মানাকিব',
  '51': 'ফাযায়েলে সাহাবা',
  '52': 'মদীনার ফযিলত',
  '53': 'মাগাজি',
  '54': 'মানাকিবুল আনসার',
  '55': 'খুমুস',
  '56': 'জিযিয়া',
  '57': 'সৃষ্টির সূচনা',
  '58': 'নবীদের ঘটনা',
  '59': 'ফাযায়েল',
  '60': 'সাহাবিদের ফযিলত',
  '61': 'খায়বার যুদ্ধ',
  '62': 'মাগাজি বিবরণ',
  '63': 'মানাকিবুল আনসার',
  '64': 'খুমুস বন্টন',
  '65': 'জিযিয়া ও যুদ্ধবিরতি',
  '66': 'কুরআনের ফযিলত',
  '67': 'বিবাহ',
  '68': 'তালাক',
  '69': 'ভরণপোষণ',
  '70': 'খাদ্য',
  '71': 'আকিকা',
  '72': 'জবেহ ও শিকার',
  '73': 'কুরবানী',
  '74': 'পানীয়',
  '75': 'রোগী',
  '76': 'চিকিৎসা',
  '77': 'পোশাক',
  '78': 'আদব',
  '79': 'অনুমতি চাওয়া',
  '80': 'দুআ',
  '81': 'রিকাক (হৃদয় নরমকারী)',
  '82': 'কদর (তাকদীর)',
  '83': 'শপথ ও মানত',
  '84': 'কসম',
  '85': 'উত্তরাধিকার',
  '86': 'হুদুদ (শাস্তি)',
  '87': 'দিয়াত (রক্তমূল্য)',
  '88': 'মুহারিবীন (বিদ্রোহী)',
  '89': 'ফিতান',
  '90': 'আহকাম',
  '91': 'ইচ্ছাপূরণ',
  '92': 'কসম ও মানত',
  '93': 'তাওহীদ',
  '94': 'ইতিসাম (কুরআন সুন্নাহ)',
  '95': 'কদর ও তাকদীর',
  '96': 'ইলম (জ্ঞানের ফযিলত)',
  '97': 'তাওহীদের মূলনীতি',
};

// Enhanced caching
let arabicCache: ArabicHadith[] | null = null;
let banglaCache: BanglaData | null = null;
let chapterCache: Map<string, ArabicHadith[]> = new Map();
let fetchPromises: Map<string, Promise<any>> = new Map();

// Fetch all sections for Arabic hadiths
async function fetchArabicHadiths(): Promise<ArabicHadith[]> {
  if (arabicCache) return arabicCache;
  
  const cacheKey = 'arabic_all';
  if (fetchPromises.has(cacheKey)) {
    return fetchPromises.get(cacheKey)!;
  }
  
  const promise = (async () => {
    // Fetch all 97 sections
    const allHadiths: ArabicHadith[] = [];
    
    for (let section = 1; section <= 97; section++) {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari/sections/${section}.json`
        );
        const data: ApiSection = await response.json();
        
        const sectionName = data.metadata.section[section] || `Section ${section}`;
        
        data.hadiths.forEach((h) => {
          allHadiths.push({
            hadithNumber: h.hadithnumber.toString(),
            arabicText: h.text,
            book: {
              bookNumber: '1',
              bookName: 'Sahih al-Bukhari'
            },
            chapter: {
              chapterNumber: section.toString(),
              chapterArabic: '',
              chapterEnglish: sectionName
            }
          });
        });
      } catch (error) {
        console.error(`Failed to fetch section ${section}:`, error);
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
async function fetchBanglaHadiths(): Promise<BanglaData> {
  if (banglaCache) return banglaCache;
  
  const cacheKey = 'bangla_all';
  if (fetchPromises.has(cacheKey)) {
    return fetchPromises.get(cacheKey)!;
  }
  
  const promise = (async () => {
    const allBangla: BanglaData = {};
    
    // Fetch all 97 sections
    for (let section = 1; section <= 97; section++) {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-bukhari/sections/${section}.json`
        );
        const data: ApiSection = await response.json();
        
        data.hadiths.forEach((h) => {
          allBangla[h.hadithnumber.toString()] = h.text;
        });
      } catch (error) {
        console.error(`Failed to fetch Bengali section ${section}:`, error);
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
export async function getBukhariChapters(): Promise<Chapter[]> {
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
  pageSize: number = 20
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
      reference: `সহীহ বুখারী ${arabic.hadithNumber}`,
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
    reference: `সহীহ বুখারী ${arabic.hadithNumber}`,
  };
}

// Prefetch next page in background for instant loading
export function prefetchNextPage(chapterNumber: string, currentPage: number, pageSize: number = 20) {
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
      reference: `সহীহ বুখারী ${arabic.hadithNumber}`,
    };
  });
}
