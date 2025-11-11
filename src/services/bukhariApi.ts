// API service for fetching Sahih al-Bukhari data from fawazahmed0/hadith-api
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

// সহীহ বুখারী - সম্পূর্ণ ৯৭টি অধ্যায়ের সঠিক নাম (Sunnah.com থেকে)
const chapterNamesBangla: Record<string, string> = {
  '1': 'ওহী শুরু', '2': 'ঈমান', '3': 'ইলম (জ্ঞান)', '4': 'ওযু', '5': 'গোসল',
  '6': 'হায়েয', '7': 'তায়াম্মুম', '8': 'সালাত', '9': 'সালাতের ওয়াক্তসমূহ', '10': 'আযান',
  '11': 'জুমআ', '12': 'ভয়ের সালাত', '13': 'দুই ঈদ', '14': 'বিতর', '15': 'ইস্তিসকা (বৃষ্টির জন্য দুআ)',
  '16': 'সূর্যগ্রহণ', '17': 'সিজদায়ে তিলাওয়াত', '18': 'সালাত সংক্ষিপ্তকরণ', '19': 'তাহাজ্জুদ', '20': 'মসজিদে নববী ও মক্কায় সালাত',
  '21': 'সালাতে আমল', '22': 'সাহু (ভুলে যাওয়া)', '23': 'জানাযা', '24': 'যাকাত', '25': 'হজ্জ',
  '26': 'উমরা', '27': 'মুহসার', '28': 'হজ্জে শিকারের জরিমানা', '29': 'মদীনার ফযিলত', '30': 'সাওম (রোযা)',
  '31': 'তারাবীহ', '32': 'লাইলাতুল কদর', '33': 'ইতিকাফ', '34': 'ব্যবসা-বাণিজ্য', '35': 'সালাম',
  '36': 'শুফআ', '37': 'ভাড়া', '38': 'হাওয়ালা', '39': 'কাফালত (জামিন)', '40': 'ওয়াকালত (প্রতিনিধিত্ব)',
  '41': 'কৃষিকাজ', '42': 'পানি বন্টন', '43': 'ঋণ', '44': 'বিবাদ', '45': 'হারানো জিনিস',
  '46': 'অত্যাচার', '47': 'অংশীদারিত্ব', '48': 'বন্ধক', '49': 'দাস মুক্তি', '50': 'মুকাতাব',
  '51': 'হাদিয়া', '52': 'সাক্ষী', '53': 'সন্ধি', '54': 'শর্তসমূহ', '55': 'অসিয়ত',
  '56': 'জিহাদ', '57': 'খুমুস', '58': 'জিযিয়া', '59': 'সৃষ্টির সূচনা', '60': 'নবীগণ',
  '61': 'নবী (ﷺ) এর ফযিলত', '62': 'সাহাবায়ে কিরাম', '63': 'আনসারদের ফযিলত', '64': 'মাগাজি (যুদ্ধসমূহ)', '65': 'তাফসীর',
  '66': 'কুরআনের ফযিলত', '67': 'বিবাহ', '68': 'তালাক', '69': 'ভরণপোষণ', '70': 'খাদ্য',
  '71': 'আকিকা', '72': 'জবাই ও শিকার', '73': 'কুরবানী', '74': 'পানীয়', '75': 'রোগী',
  '76': 'চিকিৎসা', '77': 'পোশাক', '78': 'আদব', '79': 'অনুমতি', '80': 'দুআ',
  '81': 'রিকাক (হৃদয় নরম)', '82': 'তাকদীর', '83': 'শপথ ও মানত', '84': 'কসমের কাফফারা', '85': 'মীরাস (উত্তরাধিকার)',
  '86': 'হুদুদ (শাস্তি)', '87': 'দিয়াত (রক্তমূল্য)', '88': 'মুরতাদ (ধর্মত্যাগী)', '89': 'জোরজবরদস্তি', '90': 'হীলা (কৌশল)',
  '91': 'স্বপ্নের ব্যাখ্যা', '92': 'ফিতনা', '93': 'বিচার-আচার', '94': 'আশা-আকাঙ্ক্ষা', '95': 'খবরে ওয়াহিদ',
  '96': 'কুরআন ও সুন্নাহকে আঁকড়ে ধরা', '97': 'তাওহীদ',
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
          `https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/ara-bukhari/sections/${section}.json`
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
          `https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/ben-bukhari/sections/${section}.json`
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
  // ALWAYS try IndexedDB cache first for instant loading
  const cachedHadiths = await hadithCache.getChapter('bukhari', chapterNumber);
  
  if (cachedHadiths && cachedHadiths.length > 0) {
    // Cache hit - return immediately without any API calls
    const totalCount = cachedHadiths.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const hasMore = endIndex < totalCount;
    const paginatedHadiths = cachedHadiths.slice(startIndex, endIndex);
    
    const combined = paginatedHadiths.map(h => ({
      id: h.id,
      hadithNumber: h.hadithNumber,
      arabic: h.arabic,
      bangla: h.bangla,
      bookNumber: h.bookNumber,
      bookName: h.bookName,
      chapterNumber: h.chapterNumber,
      chapterArabic: h.chapterArabic,
      chapterEnglish: h.chapterEnglish,
      reference: h.reference,
    }));
    
    console.log(`✅ বুখারী অধ্যায় ${chapterNumber} ক্যাশ থেকে লোড হয়েছে`);
    return { hadiths: combined, totalCount, hasMore };
  }

  // Cache miss - fetch from API and save to cache
  console.log(`📥 বুখারী অধ্যায় ${chapterNumber} API থেকে ডাউনলোড হচ্ছে...`);
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
  
  // Save all chapter hadiths to cache for future use
  const allChapterHadiths: CachedHadith[] = chapterHadiths.map((arabic) => {
    const bangla = banglaData[arabic.hadithNumber];
    return {
      id: arabic.hadithNumber,
      hadithNumber: arabic.hadithNumber,
      arabic: arabic.arabicText,
      bangla: bangla || 'অনুবাদ শীঘ্রই যুক্ত হবে',
      bookId: 'bukhari',
      bookNumber: arabic.book.bookNumber,
      bookName: 'সহীহ বুখারী',
      chapterNumber: arabic.chapter.chapterNumber,
      chapterArabic: arabic.chapter.chapterArabic,
      chapterEnglish: arabic.chapter.chapterEnglish,
      reference: `সহীহ বুখারী ${arabic.hadithNumber}`,
    };
  });
  
  // Save to IndexedDB cache
  await hadithCache.saveChapter('bukhari', chapterNumber, allChapterHadiths);
  console.log(`💾 বুখারী অধ্যায় ${chapterNumber} ক্যাশে সংরক্ষিত হয়েছে`);
  
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
