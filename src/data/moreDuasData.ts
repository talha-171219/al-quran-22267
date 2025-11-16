export interface DuaCategory {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  duaCount: number;
  categoryUrl: string; // Relative URL on muslimbangla.com
}

export interface DuaItem {
  id: number;
  arabic: string;
  bengaliTranslation: string;
  transliteration?: string;
  reference?: string;
  // Add other fields as needed, e.g., audio, etc.
}

export const duaCategories: DuaCategory[] = [
  {
    id: 1,
    title: 'ঈমান অধ্যায়',
    slug: 'ঈমান-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/faith.png',
    duaCount: 8,
    categoryUrl: '/dua-category/1'
  },
  {
    id: 2,
    title: 'তাহারাত (পাক-পবিত্রতা) অধ্যায়',
    slug: 'তাহারাত-(পাক-পবিত্রতা)-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/pure-holiness.png',
    duaCount: 2,
    categoryUrl: '/dua-category/2'
  },
  {
    id: 3,
    title: 'উযূ অধ্যায়',
    slug: 'উযূ-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/ablution.png',
    duaCount: 5,
    categoryUrl: '/dua-category/3'
  },
  {
    id: 4,
    title: 'আযান-ইকামাত অধ্যায়',
    slug: 'আযান-ইকামাত-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/azan-iqamat.png',
    duaCount: 3,
    categoryUrl: '/dua-category/4'
  },
  {
    id: 5,
    title: 'মসজিদ অধ্যায়',
    slug: 'মসজিদ-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/mosque.png',
    duaCount: 4,
    categoryUrl: '/dua-category/5'
  },
  {
    id: 6,
    title: 'নামাযের মধ্যে দু‘আ অধ্যায়',
    slug: 'নামাযের-মধ্যে-দু‘আ-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/in-salah.png',
    duaCount: 17,
    categoryUrl: '/dua-category/6'
  },
  {
    id: 7,
    title: 'নামাযের শেষে দু‘আ পড়ার অধ্যায়',
    slug: 'নামাযের-শেষে-দু‘আ-পড়ার-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/after-salah.png',
    duaCount: 5,
    categoryUrl: '/dua-category/7'
  },
  {
    id: 8,
    title: 'নফল নামায অধ্যায়',
    slug: 'নফল-নামায-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/nafal-salah.png',
    duaCount: 4,
    categoryUrl: '/dua-category/8'
  },
  {
    id: 9,
    title: 'রাব্বানা দু‘আ অধ্যায় (কুরআনে বর্ণিত)',
    slug: 'রাব্বানা-দু‘আ-অধ্যায়-(কুরআনে-বর্ণিত)',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/described-in-the-quran.png',
    duaCount: 14,
    categoryUrl: '/dua-category/9'
  },
  {
    id: 10,
    title: 'সকাল সন্ধার আমল অধ্যায়',
    slug: 'সকাল-সন্ধার-আমল-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/day-and-night.png',
    duaCount: 12,
    categoryUrl: '/dua-category/10'
  },
  {
    id: 11,
    title: 'দুরুদ পাঠ অধ্যায়',
    slug: 'দুরুদ-পাঠ-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/darud-sharif.png',
    duaCount: 6,
    categoryUrl: '/dua-category/11'
  },
  {
    id: 12,
    title: 'ইস্তিগফার ও কৃতজ্ঞতা অধ্যায়',
    slug: 'ইস্তিগফার-ও-কৃতজ্ঞতা-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/Istighfar.png',
    duaCount: 8,
    categoryUrl: '/dua-category/12'
  },
  {
    id: 13,
    title: 'খাবার ও পানাহার অধ্যায়',
    slug: 'খাবার-ও-পানাহার-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/regarding-drinking.png',
    duaCount: 13,
    categoryUrl: '/dua-category/13'
  },
  {
    id: 14,
    title: 'ঘুম অধ্যায়',
    slug: 'ঘুম-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/sleeping.png',
    duaCount: 16,
    categoryUrl: '/dua-category/14'
  },
  {
    id: 15,
    title: 'বাসস্থান অধ্যায়',
    slug: 'বাসস্থান-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/house.png',
    duaCount: 6,
    categoryUrl: '/dua-category/15'
  },
  {
    id: 16,
    title: 'সফর অধ্যায়',
    slug: 'সফর-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/tourism.png',
    duaCount: 14,
    categoryUrl: '/dua-category/16'
  },
  {
    id: 17,
    title: 'পরিবার সম্পর্কিত অধ্যায়',
    slug: 'পরিবার-সম্পর্কিত-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/family.png',
    duaCount: 10,
    categoryUrl: '/dua-category/17'
  },
  {
    id: 18,
    title: 'সাজসজ্জা অধ্যায়',
    slug: 'সাজসজ্জা-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/get-up.png',
    duaCount: 6,
    categoryUrl: '/dua-category/18'
  },
  {
    id: 19,
    title: 'সামাজিকতা অধ্যায়',
    slug: 'সামাজিকতা-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/sociability.png',
    duaCount: 17,
    categoryUrl: '/dua-category/19'
  },
  {
    id: 20,
    title: 'বিভিন্ন পরিস্থিতিতে পাঠ্য দু‘আ অধ্যায়',
    slug: 'বিভিন্ন-পরিস্থিতিতে-পাঠ্য-দু‘আ-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/in-various-situations.png',
    duaCount: 24,
    categoryUrl: '/dua-category/20'
  },
  {
    id: 21,
    title: 'সুস্থতা-অসুস্থতা অধ্যায়',
    slug: 'সুস্থতা-অসুস্থতা-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/health-and-illness.png',
    duaCount: 12,
    categoryUrl: '/dua-category/21'
  },
  {
    id: 22,
    title: 'ঝড়-বৃষ্টি অধ্যায়',
    slug: 'ঝড়-বৃষ্টি-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/storm-and-rain.png',
    duaCount: 8,
    categoryUrl: '/dua-category/22'
  },
  {
    id: 23,
    title: 'রমযান অধ্যায়',
    slug: 'রমযান-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/fasting.png',
    duaCount: 10,
    categoryUrl: '/dua-category/23'
  },
  {
    id: 24,
    title: 'ঈদ অধ্যায়',
    slug: 'ঈদ-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/eid.png',
    duaCount: 3,
    categoryUrl: '/dua-category/24'
  },
  {
    id: 25,
    title: 'হজ্জ অধ্যায়',
    slug: 'হজ্জ-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/hajj.png',
    duaCount: 12,
    categoryUrl: '/dua-category/25'
  },
  {
    id: 26,
    title: 'ফযীলতপূর্ণ সূরা সমূহের অধ্যায়',
    slug: 'ফযীলতপূর্ণ-সূরা-সমূহের-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/virtuous-surahs-and-verses.png',
    duaCount: 17,
    categoryUrl: '/dua-category/26'
  },
  {
    id: 27,
    title: 'মানযিল (কুরআনে বর্ণিত আয়াতের মাধ্যমে দ্রুত মুক্তি লাভ করা) অধ্যায়',
    slug: 'মানযিল-(কুরআনে-বর্ণিত-আয়াতের-মাধ্যমে-দ্রুত-মুক্তি-লাভ-করা)-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/manzil.png',
    duaCount: 17,
    categoryUrl: '/dua-category/27'
  },
  {
    id: 28,
    title: 'জামে দু‘আ অধ্যায়',
    slug: 'জামে-দু‘আ-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/jame-dua.png',
    duaCount: 16,
    categoryUrl: '/dua-category/28'
  },
  {
    id: 29,
    title: "রুকাইয়ার দু'আ সমূহের অধ্যায় (কুরআন ও হাদীসে বর্ণিত)",
    slug: "রুকাইয়ার-দু'আ-সমূহের-অধ্যায়-(কুরআন-ও-হাদীসে-বর্ণিত)",
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/rukiya-quran.png',
    duaCount: 20,
    categoryUrl: '/dua-category/29'
  },
  {
    id: 30,
    title: 'মৃত্যুর পূর্বাপর পড়ার দু‘আ সমূহ অধ্যায়',
    slug: 'মৃত্যুর-পূর্বাপর-পড়ার-দু‘আ-সমূহ-অধ্যায়',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/before-and-after-death.png',
    duaCount: 19,
    categoryUrl: '/dua-category/30'
  },
  {
    id: 38,
    title: 'জ্বীনের আছর, বান ইত্যাদি ক্ষেত্রে উপকারী আয়াত',
    slug: 'জ্বীনের-আছর,-বান-ইত্যাদি-ক্ষেত্রে-উপকারী-আয়াত',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/rukiya-jin.png',
    duaCount: 25,
    categoryUrl: '/dua-category/38'
  },
  {
    id: 31,
    title: 'মুনাজাতে মাকবুল - শনিবার',
    slug: 'মুনাজাতে-মাকবুল---শনিবার',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/munajate-makbul.png',
    duaCount: 54,
    categoryUrl: '/dua-category/31'
  },
  {
    id: 32,
    title: 'মুনাজাতে মাকবুল - রবিবার',
    slug: 'মুনাজাতে-মাকবুল---রবিবার',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/munajate-makbul.png',
    duaCount: 31,
    categoryUrl: '/dua-category/32'
  },
  {
    id: 33,
    title: 'মুনাজাতে মাকবুল - সোমবার',
    slug: 'মুনাজাতে-মাকবুল---সোমবার',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/munajate-makbul.png',
    duaCount: 31,
    categoryUrl: '/dua-category/33'
  },
  {
    id: 34,
    title: 'মুনাজাতে মাকবুল - الثلاثاء',
    slug: 'মুনাজাতে-মাকবুল---মঙ্গলবার',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/munajate-makbul.png',
    duaCount: 34,
    categoryUrl: '/dua-category/34'
  },
  {
    id: 35,
    title: 'মুনাজাতে মাকবুল - বুধবার',
    slug: 'মুনাজাতে-মাকবুল---বুধবার',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/munajate-makbul.png',
    duaCount: 24,
    categoryUrl: '/dua-category/35'
  },
  {
    id: 36,
    title: 'মুনাজাতে মাকবুল - বৃহস্পতিবার',
    slug: 'মুনাজাতে-মাকবুল---বৃহস্পতিবার',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/munajate-makbul.png',
    duaCount: 16,
    categoryUrl: '/dua-category/36'
  },
  {
    id: 37,
    title: 'মুনাজাতে মাকবুল - শুক্রবার',
    slug: 'মুনাজাতে-মাকবুল---শুক্রবার',
    thumbnail: 'https://cdn.topofstacksoftware.com/dua-category-thumbnails/munajate-makbul.png',
    duaCount: 16,
    categoryUrl: '/dua-category/37'
  }
];

// `allDuas` will be provided from generated file after scraping and merging.
export { allDuas } from './moreDuasGenerated';
