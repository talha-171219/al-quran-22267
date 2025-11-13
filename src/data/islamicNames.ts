export interface IslamicName {
  id: number;
  name: string;
  arabic: string;
  meaning: string;
  meaningBengali: string;
  origin: string;
  gender: 'male' | 'female' | 'unisex';
  category: string;
}

export const islamicNames: IslamicName[] = [
  // Male Names
  {
    id: 1,
    name: "Muhammad",
    arabic: "محمد",
    meaning: "Praised, praiseworthy",
    meaningBengali: "প্রশংসিত, প্রশংসনীয়",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 2,
    name: "Ahmed",
    arabic: "أحمد",
    meaning: "Most praised, commendable",
    meaningBengali: "সর্বাধিক প্রশংসিত",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 3,
    name: "Abdullah",
    arabic: "عبد الله",
    meaning: "Servant of Allah",
    meaningBengali: "আল্লাহর দাস",
    origin: "Arabic",
    gender: "male",
    category: "Divine Names"
  },
  {
    id: 4,
    name: "Ibrahim",
    arabic: "إبراهيم",
    meaning: "Father of nations",
    meaningBengali: "জাতির পিতা",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 5,
    name: "Yusuf",
    arabic: "يوسف",
    meaning: "God increases",
    meaningBengali: "আল্লাহ বৃদ্ধি করেন",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 6,
    name: "Omar",
    arabic: "عمر",
    meaning: "Long-lived, flourishing",
    meaningBengali: "দীর্ঘজীবী, সমৃদ্ধশীল",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 7,
    name: "Ali",
    arabic: "علي",
    meaning: "Elevated, high",
    meaningBengali: "উন্নত, উচ্চ",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 8,
    name: "Hassan",
    arabic: "حسن",
    meaning: "Handsome, good",
    meaningBengali: "সুদর্শন, ভালো",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 9,
    name: "Hussain",
    arabic: "حسين",
    meaning: "Good, beautiful",
    meaningBengali: "সুন্দর, ভালো",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 10,
    name: "Hamza",
    arabic: "حمزة",
    meaning: "Lion, strong",
    meaningBengali: "সিংহ, শক্তিশালী",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 11,
    name: "Bilal",
    arabic: "بلال",
    meaning: "Moistening, refreshing",
    meaningBengali: "সতেজকারী",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 12,
    name: "Zayd",
    arabic: "زيد",
    meaning: "Growth, increase",
    meaningBengali: "বৃদ্ধি, প্রবৃদ্ধি",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 13,
    name: "Idris",
    arabic: "إدريس",
    meaning: "Studious, learned",
    meaningBengali: "পণ্ডিত, জ্ঞানী",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 14,
    name: "Isa",
    arabic: "عيسى",
    meaning: "Jesus (prophet)",
    meaningBengali: "ঈসা (নবী)",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 15,
    name: "Musa",
    arabic: "موسى",
    meaning: "Moses (prophet)",
    meaningBengali: "মূসা (নবী)",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 16,
    name: "Sulaiman",
    arabic: "سليمان",
    meaning: "Solomon (prophet)",
    meaningBengali: "সুলাইমান (নবী)",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 17,
    name: "Ismail",
    arabic: "إسماعيل",
    meaning: "God hears",
    meaningBengali: "আল্লাহ শোনেন",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 18,
    name: "Ishaq",
    arabic: "إسحاق",
    meaning: "He will laugh",
    meaningBengali: "সে হাসবে",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 19,
    name: "Yahya",
    arabic: "يحيى",
    meaning: "John (prophet)",
    meaningBengali: "ইয়াহইয়া (নবী)",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 20,
    name: "Zakariya",
    arabic: "زكريا",
    meaning: "Zacharias (prophet)",
    meaningBengali: "জাকারিয়া (নবী)",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 21,
    name: "Ayman",
    arabic: "أيمن",
    meaning: "Blessed, fortunate",
    meaningBengali: "আশীর্বাদপ্রাপ্ত, ভাগ্যবান",
    origin: "Arabic",
    gender: "male",
    category: "Popular Names"
  },
  {
    id: 22,
    name: "Tariq",
    arabic: "طارق",
    meaning: "Morning star",
    meaningBengali: "প্রভাতী তারা",
    origin: "Arabic",
    gender: "male",
    category: "Popular Names"
  },
  {
    id: 23,
    name: "Khalid",
    arabic: "خالد",
    meaning: "Eternal, immortal",
    meaningBengali: "চিরন্তন, অমর",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 24,
    name: "Rashid",
    arabic: "رشيد",
    meaning: "Rightly guided",
    meaningBengali: "সঠিক পথপ্রাপ্ত",
    origin: "Arabic",
    gender: "male",
    category: "Popular Names"
  },
  {
    id: 25,
    name: "Karim",
    arabic: "كريم",
    meaning: "Generous, noble",
    meaningBengali: "উদার, মহৎ",
    origin: "Arabic",
    gender: "male",
    category: "Divine Names"
  },

  // Female Names
  {
    id: 26,
    name: "Aisha",
    arabic: "عائشة",
    meaning: "Living, prosperous",
    meaningBengali: "জীবিত, সমৃদ্ধশালী",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 27,
    name: "Fatima",
    arabic: "فاطمة",
    meaning: "Captivating, one who weans",
    meaningBengali: "মুগ্ধকর",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 28,
    name: "Khadija",
    arabic: "خديجة",
    meaning: "Premature child",
    meaningBengali: "প্রথমে জন্মগ্রহণকারী",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 29,
    name: "Maryam",
    arabic: "مريم",
    meaning: "Mary, mother of Isa",
    meaningBengali: "মারইয়াম, ঈসার মা",
    origin: "Arabic",
    gender: "female",
    category: "Noble Women"
  },
  {
    id: 30,
    name: "Zainab",
    arabic: "زينب",
    meaning: "Fragrant flower",
    meaningBengali: "সুগন্ধি ফুল",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 31,
    name: "Hafsa",
    arabic: "حفصة",
    meaning: "Young lioness",
    meaningBengali: "তরুণ সিংহী",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 32,
    name: "Safiya",
    arabic: "صفية",
    meaning: "Pure, best friend",
    meaningBengali: "পবিত্র, উত্তম বন্ধু",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 33,
    name: "Ruqayya",
    arabic: "رقية",
    meaning: "Gentle, ascent",
    meaningBengali: "কোমল, উত্থান",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 34,
    name: "Umm Kulthum",
    arabic: "أم كلثوم",
    meaning: "Mother of Kulthum",
    meaningBengali: "কুলসুমের মা",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 35,
    name: "Asma",
    arabic: "أسماء",
    meaning: "Excellent, precious",
    meaningBengali: "উৎকৃষ্ট, মূল্যবান",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 36,
    name: "Sumayya",
    arabic: "سمية",
    meaning: "High, elevated",
    meaningBengali: "উচ্চ, উন্নত",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 37,
    name: "Amina",
    arabic: "آمنة",
    meaning: "Trustworthy, faithful",
    meaningBengali: "বিশ্বস্ত, বিশ্বাসযোগ্য",
    origin: "Arabic",
    gender: "female",
    category: "Noble Women"
  },
  {
    id: 38,
    name: "Layla",
    arabic: "ليلى",
    meaning: "Night, dark beauty",
    meaningBengali: "রাত্রি, অন্ধকার সৌন্দর্য",
    origin: "Arabic",
    gender: "female",
    category: "Popular Names"
  },
  {
    id: 39,
    name: "Nadia",
    arabic: "نادية",
    meaning: "Caller, announcer",
    meaningBengali: "আহ্বানকারী",
    origin: "Arabic",
    gender: "female",
    category: "Popular Names"
  },
  {
    id: 40,
    name: "Sara",
    arabic: "سارة",
    meaning: "Princess, lady",
    meaningBengali: "রাজকন্যা, মহিলা",
    origin: "Arabic",
    gender: "female",
    category: "Noble Women"
  },
  {
    id: 41,
    name: "Hawa",
    arabic: "حواء",
    meaning: "Eve, life",
    meaningBengali: "হাওয়া, জীবন",
    origin: "Arabic",
    gender: "female",
    category: "Noble Women"
  },
  {
    id: 42,
    name: "Rahma",
    arabic: "رحمة",
    meaning: "Mercy, compassion",
    meaningBengali: "দয়া, করুণা",
    origin: "Arabic",
    gender: "female",
    category: "Divine Names"
  },
  {
    id: 43,
    name: "Noor",
    arabic: "نور",
    meaning: "Light, radiance",
    meaningBengali: "আলো, দীপ্তি",
    origin: "Arabic",
    gender: "female",
    category: "Divine Names"
  },
  {
    id: 44,
    name: "Hana",
    arabic: "هناء",
    meaning: "Happiness, bliss",
    meaningBengali: "সুখ, আনন্দ",
    origin: "Arabic",
    gender: "female",
    category: "Popular Names"
  },
  {
    id: 45,
    name: "Salma",
    arabic: "سلمى",
    meaning: "Safe, peaceful",
    meaningBengali: "নিরাপদ, শান্তিপূর্ণ",
    origin: "Arabic",
    gender: "female",
    category: "Popular Names"
  },
  {
    id: 46,
    name: "Zahra",
    arabic: "زهراء",
    meaning: "Bright, shining",
    meaningBengali: "উজ্জ্বল, আলোকিত",
    origin: "Arabic",
    gender: "female",
    category: "Popular Names"
  },
  {
    id: 47,
    name: "Jannah",
    arabic: "جنة",
    meaning: "Paradise, garden",
    meaningBengali: "জান্নাত, বাগান",
    origin: "Arabic",
    gender: "female",
    category: "Divine Names"
  },
  {
    id: 48,
    name: "Sabrina",
    arabic: "صابرينا",
    meaning: "Patient, enduring",
    meaningBengali: "ধৈর্যশীল, সহনশীল",
    origin: "Arabic",
    gender: "female",
    category: "Popular Names"
  },
  {
    id: 49,
    name: "Iman",
    arabic: "إيمان",
    meaning: "Faith, belief",
    meaningBengali: "বিশ্বাস, ঈমান",
    origin: "Arabic",
    gender: "female",
    category: "Divine Names"
  },
  {
    id: 50,
    name: "Samira",
    arabic: "سميرة",
    meaning: "Companion, entertainer",
    meaningBengali: "সঙ্গী, বিনোদনকারী",
    origin: "Arabic",
    gender: "female",
    category: "Popular Names"
  }
];

export const categories = [
  "All",
  "Prophet Names",
  "Sahabi Names",
  "Sahabiyyah Names",
  "Divine Names",
  "Noble Women",
  "Popular Names"
];
