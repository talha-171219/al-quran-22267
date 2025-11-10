// Azkar collection - Morning, Evening, and After-prayer

export interface Dhikr {
  arabic: string;
  translation: string;
  transliteration?: string;
  count: number;
  reference?: string;
}

export interface AzkarCategory {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  dhikrs: Dhikr[];
}

export const azkarCategories: AzkarCategory[] = [
  {
    id: "morning",
    title: "Morning Azkar",
    titleBn: "সকালের আযকার",
    description: "To be recited after Fajr until sunrise",
    dhikrs: [
      {
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
        translation: "আমরা সকালে উপনীত হলাম এবং রাজত্ব আল্লাহর জন্য, সমস্ত প্রশংসা আল্লাহর জন্য",
        transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah",
        count: 1,
        reference: "Muslim"
      },
      {
        arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
        translation: "হে আল্লাহ! আপনার সাহায্যেই আমরা সকালে উপনীত হই, আপনারই সাহায্যে সন্ধ্যায় উপনীত হই, আপনারই সাহায্যে আমরা জীবিত থাকি, আপনারই সাহায্যে মৃত্যুবরণ করি এবং আপনার দিকেই প্রত্যাবর্তন",
        transliteration: "Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilaykan nushur",
        count: 1,
        reference: "Tirmidhi"
      },
      {
        arabic: "أَعُوذُ بِاللَّهِ السَّمِيعِ الْعَلِيمِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        translation: "আমি সর্বশ্রোতা সর্বজ্ঞ আল্লাহর কাছে অভিশপ্ত শয়তান থেকে আশ্রয় চাই",
        transliteration: "A'udhu billahis sami'il 'alimi minash shaytanir rajim",
        count: 3,
        reference: "Abu Dawud"
      },
      {
        arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        translation: "আল্লাহর নামে, যার নামের সাথে আসমান ও জমিনের কোন কিছুই ক্ষতি করতে পারে না, তিনি সর্বশ্রোতা, সর্বজ্ঞ",
        transliteration: "Bismillahil ladhi la yadurru ma'asmihi shay'un fil ardi wa la fis sama'i wa huwas sami'ul 'alim",
        count: 3,
        reference: "Abu Dawud, Tirmidhi"
      }
    ]
  },
  {
    id: "evening",
    title: "Evening Azkar",
    titleBn: "সন্ধ্যার আযকার",
    description: "To be recited after Asr until Maghrib",
    dhikrs: [
      {
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
        translation: "আমরা সন্ধ্যায় উপনীত হলাম এবং রাজত্ব আল্লাহর জন্য, সমস্ত প্রশংসা আল্লাহর জন্য",
        transliteration: "Amsayna wa amsal mulku lillah, walhamdu lillah",
        count: 1,
        reference: "Muslim"
      },
      {
        arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
        translation: "হে আল্লাহ! আপনার সাহায্যেই আমরা সন্ধ্যায় উপনীত হই, আপনারই সাহায্যে সকালে উপনীত হই, আপনারই সাহায্যে আমরা জীবিত থাকি, আপনারই সাহায্যে মৃত্যুবরণ করি এবং আপনার দিকেই প্রত্যাবর্তন",
        transliteration: "Allahumma bika amsayna, wa bika asbahna, wa bika nahya, wa bika namutu, wa ilaykal masir",
        count: 1,
        reference: "Tirmidhi"
      },
      {
        arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        translation: "আল্লাহর নামে, যার নামের সাথে আসমান ও জমিনের কোন কিছুই ক্ষতি করতে পারে না, তিনি সর্বশ্রোতা, সর্বজ্ঞ",
        transliteration: "Bismillahil ladhi la yadurru ma'asmihi shay'un fil ardi wa la fis sama'i wa huwas sami'ul 'alim",
        count: 3,
        reference: "Abu Dawud, Tirmidhi"
      }
    ]
  },
  {
    id: "after-prayer",
    title: "After Prayer Azkar",
    titleBn: "নামাজের পরের আযকার",
    description: "To be recited after each obligatory prayer",
    dhikrs: [
      {
        arabic: "أَسْتَغْفِرُ اللَّهَ",
        translation: "আমি আল্লাহর কাছে ক্ষমা প্রার্থনা করছি",
        transliteration: "Astaghfirullah",
        count: 3,
        reference: "Muslim"
      },
      {
        arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
        translation: "হে আল্লাহ! আপনি শান্তি এবং আপনার থেকেই শান্তি আসে। আপনি বরকতময়, হে মহিমাময় ও সম্মানিত",
        transliteration: "Allahumma antas salam wa minkas salam, tabarakta ya dhal jalali wal ikram",
        count: 1,
        reference: "Muslim"
      },
      {
        arabic: "سُبْحَانَ اللَّهِ",
        translation: "আল্লাহ পবিত্র",
        transliteration: "Subhanallah",
        count: 33,
        reference: "Muslim"
      },
      {
        arabic: "الْحَمْدُ لِلَّهِ",
        translation: "সমস্ত প্রশংসা আল্লাহর জন্য",
        transliteration: "Alhamdulillah",
        count: 33,
        reference: "Muslim"
      },
      {
        arabic: "اللَّهُ أَكْبَرُ",
        translation: "আল্লাহ মহান",
        transliteration: "Allahu Akbar",
        count: 34,
        reference: "Muslim"
      },
      {
        arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        translation: "আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি এক, তাঁর কোন শরিক নেই, তাঁর জন্যই রাজত্ব এবং তাঁর জন্যই সমস্ত প্রশংসা, তিনি সব কিছুর উপর ক্ষমতাবান",
        transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul mulku wa lahul hamdu wa huwa 'ala kulli shay'in qadir",
        count: 1,
        reference: "Muslim"
      },
      {
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
        translation: "আয়াতুল কুরসি (সূরা বাকারা: ২৫৫)",
        transliteration: "Ayatul Kursi",
        count: 1,
        reference: "Bukhari"
      }
    ]
  }
];

export const getAzkarByCategory = (categoryId: string): AzkarCategory | undefined => {
  return azkarCategories.find(cat => cat.id === categoryId);
};
