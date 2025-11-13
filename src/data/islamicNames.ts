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
  },
  
  // More Sahabi Names (Male)
  {
    id: 51,
    name: "Abu Bakr",
    arabic: "أبو بكر",
    meaning: "Father of the young camel",
    meaningBengali: "তরুণ উটের পিতা",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 52,
    name: "Uthman",
    arabic: "عثمان",
    meaning: "Baby bustard",
    meaningBengali: "শক্তিশালী",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 53,
    name: "Talha",
    arabic: "طلحة",
    meaning: "Tree with beautiful shade",
    meaningBengali: "সুন্দর ছায়াযুক্ত গাছ",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 54,
    name: "Zubair",
    arabic: "زبير",
    meaning: "Strong, intelligent",
    meaningBengali: "শক্তিশালী, বুদ্ধিমান",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 55,
    name: "Sa'ad",
    arabic: "سعد",
    meaning: "Happiness, good fortune",
    meaningBengali: "সুখ, সৌভাগ্য",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 56,
    name: "Abdur Rahman",
    arabic: "عبد الرحمن",
    meaning: "Servant of the Most Merciful",
    meaningBengali: "পরম দয়ালুর দাস",
    origin: "Arabic",
    gender: "male",
    category: "Divine Names"
  },
  {
    id: 57,
    name: "Anas",
    arabic: "أنس",
    meaning: "Friendliness, love",
    meaningBengali: "বন্ধুত্ব, ভালোবাসা",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 58,
    name: "Mu'adh",
    arabic: "معاذ",
    meaning: "Protected, sheltered",
    meaningBengali: "সুরক্ষিত, আশ্রিত",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 59,
    name: "Ubayy",
    arabic: "أبي",
    meaning: "High status",
    meaningBengali: "উচ্চ মর্যাদা",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  {
    id: 60,
    name: "Salman",
    arabic: "سلمان",
    meaning: "Safe, secure",
    meaningBengali: "নিরাপদ, সুরক্ষিত",
    origin: "Arabic",
    gender: "male",
    category: "Sahabi Names"
  },
  
  // Quranic Names (Male)
  {
    id: 61,
    name: "Adam",
    arabic: "آدم",
    meaning: "First human, father of mankind",
    meaningBengali: "প্রথম মানুষ, মানবজাতির পিতা",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 62,
    name: "Nuh",
    arabic: "نوح",
    meaning: "Noah (prophet)",
    meaningBengali: "নূহ (নবী)",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 63,
    name: "Hud",
    arabic: "هود",
    meaning: "Prophet sent to Aad",
    meaningBengali: "আদ জাতির নবী",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 64,
    name: "Salih",
    arabic: "صالح",
    meaning: "Righteous, pious",
    meaningBengali: "ধার্মিক, পুণ্যবান",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 65,
    name: "Yaqub",
    arabic: "يعقوب",
    meaning: "Jacob (prophet)",
    meaningBengali: "ইয়াকুব (নবী)",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 66,
    name: "Ilyas",
    arabic: "إلياس",
    meaning: "Elijah (prophet)",
    meaningBengali: "ইলিয়াস (নবী)",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 67,
    name: "Ayyub",
    arabic: "أيوب",
    meaning: "Job (prophet)",
    meaningBengali: "আইয়ুব (নবী)",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 68,
    name: "Yunus",
    arabic: "يونس",
    meaning: "Jonah (prophet)",
    meaningBengali: "ইউনুস (নবী)",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 69,
    name: "Luqman",
    arabic: "لقمان",
    meaning: "Wise man in Quran",
    meaningBengali: "কুরআনের জ্ঞানী ব্যক্তি",
    origin: "Arabic",
    gender: "male",
    category: "Quranic Names"
  },
  {
    id: 70,
    name: "Dhul Kifl",
    arabic: "ذو الكفل",
    meaning: "Prophet mentioned in Quran",
    meaningBengali: "কুরআনে উল্লেখিত নবী",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 71,
    name: "Haroon",
    arabic: "هارون",
    meaning: "Aaron (prophet)",
    meaningBengali: "হারুন (নবী)",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 72,
    name: "Dawud",
    arabic: "داود",
    meaning: "David (prophet)",
    meaningBengali: "দাউদ (নবী)",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 73,
    name: "Lut",
    arabic: "لوط",
    meaning: "Lot (prophet)",
    meaningBengali: "লূত (নবী)",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 74,
    name: "Shuaib",
    arabic: "شعيب",
    meaning: "Prophet sent to Midian",
    meaningBengali: "মাদইয়ান জাতির নবী",
    origin: "Arabic",
    gender: "male",
    category: "Prophet Names"
  },
  {
    id: 75,
    name: "Uzair",
    arabic: "عزير",
    meaning: "Ezra, helper",
    meaningBengali: "উজাইর, সাহায্যকারী",
    origin: "Arabic",
    gender: "male",
    category: "Quranic Names"
  },
  
  // More Sahabiyyah Names (Female)
  {
    id: 76,
    name: "Umm Salamah",
    arabic: "أم سلمة",
    meaning: "Mother of Salamah",
    meaningBengali: "সালামার মা",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 77,
    name: "Umm Habibah",
    arabic: "أم حبيبة",
    meaning: "Mother of Habibah",
    meaningBengali: "হাবীবার মা",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 78,
    name: "Juwayriya",
    arabic: "جويرية",
    meaning: "Young woman",
    meaningBengali: "তরুণী",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 79,
    name: "Maymunah",
    arabic: "ميمونة",
    meaning: "Blessed, fortunate",
    meaningBengali: "আশীর্বাদপ্রাপ্ত, ভাগ্যবতী",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 80,
    name: "Sawdah",
    arabic: "سودة",
    meaning: "Wife of Prophet Muhammad",
    meaningBengali: "নবী মুহাম্মদের স্ত্রী",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 81,
    name: "Khawlah",
    arabic: "خولة",
    meaning: "Female deer",
    meaningBengali: "হরিণী",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 82,
    name: "Umm Ayman",
    arabic: "أم أيمن",
    meaning: "Mother of Ayman",
    meaningBengali: "আয়মানের মা",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 83,
    name: "Umm Sulaym",
    arabic: "أم سليم",
    meaning: "Mother of Sulaym",
    meaningBengali: "সুলায়মের মা",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  
  // Quranic Names (Female)
  {
    id: 84,
    name: "Bilqis",
    arabic: "بلقيس",
    meaning: "Queen of Sheba",
    meaningBengali: "সাবার রানী",
    origin: "Arabic",
    gender: "female",
    category: "Quranic Names"
  },
  {
    id: 85,
    name: "Asiya",
    arabic: "آسية",
    meaning: "Wife of Pharaoh",
    meaningBengali: "ফেরাউনের স্ত্রী",
    origin: "Arabic",
    gender: "female",
    category: "Quranic Names"
  },
  {
    id: 86,
    name: "Hajar",
    arabic: "هاجر",
    meaning: "Hagar, wife of Ibrahim",
    meaningBengali: "হাজেরা, ইব্রাহিমের স্ত্রী",
    origin: "Arabic",
    gender: "female",
    category: "Quranic Names"
  },
  {
    id: 87,
    name: "Kulthum",
    arabic: "كلثوم",
    meaning: "Full-cheeked, healthy",
    meaningBengali: "স্বাস্থ্যবতী",
    origin: "Arabic",
    gender: "female",
    category: "Popular Names"
  },
  {
    id: 88,
    name: "Ramlah",
    arabic: "رملة",
    meaning: "Sand, desert beauty",
    meaningBengali: "বালি, মরুর সৌন্দর্য",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 89,
    name: "Barakah",
    arabic: "بركة",
    meaning: "Blessing, abundance",
    meaningBengali: "বরকত, প্রাচুর্য",
    origin: "Arabic",
    gender: "female",
    category: "Divine Names"
  },
  {
    id: 90,
    name: "Khadra",
    arabic: "خضراء",
    meaning: "Green, lush",
    meaningBengali: "সবুজ, সতেজ",
    origin: "Arabic",
    gender: "female",
    category: "Popular Names"
  },
  {
    id: 91,
    name: "Sumayyah",
    arabic: "سمية",
    meaning: "First martyr in Islam",
    meaningBengali: "ইসলামের প্রথম শহীদ",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 92,
    name: "Lubna",
    arabic: "لبنى",
    meaning: "Storax tree",
    meaningBengali: "সুগন্ধি গাছ",
    origin: "Arabic",
    gender: "female",
    category: "Popular Names"
  },
  {
    id: 93,
    name: "Rabi'ah",
    arabic: "ربيعة",
    meaning: "Spring, garden",
    meaningBengali: "বসন্ত, বাগান",
    origin: "Arabic",
    gender: "female",
    category: "Popular Names"
  },
  {
    id: 94,
    name: "Umamah",
    arabic: "أمامة",
    meaning: "Leader, aim",
    meaningBengali: "নেতা, লক্ষ্য",
    origin: "Arabic",
    gender: "female",
    category: "Sahabiyyah Names"
  },
  {
    id: 95,
    name: "Thurayya",
    arabic: "ثريا",
    meaning: "Pleiades star cluster",
    meaningBengali: "তারকামণ্ডল",
    origin: "Arabic",
    gender: "female",
    category: "Popular Names"
  },
  
  // More Divine Names
  {
    id: 96,
    name: "Abdul Aziz",
    arabic: "عبد العزيز",
    meaning: "Servant of the Almighty",
    meaningBengali: "পরাক্রমশালীর দাস",
    origin: "Arabic",
    gender: "male",
    category: "Divine Names"
  },
  {
    id: 97,
    name: "Abdul Malik",
    arabic: "عبد الملك",
    meaning: "Servant of the King",
    meaningBengali: "মহারাজার দাস",
    origin: "Arabic",
    gender: "male",
    category: "Divine Names"
  },
  {
    id: 98,
    name: "Abdul Wahab",
    arabic: "عبد الوهاب",
    meaning: "Servant of the Bestower",
    meaningBengali: "দানকারীর দাস",
    origin: "Arabic",
    gender: "male",
    category: "Divine Names"
  },
  {
    id: 99,
    name: "Abdul Jalil",
    arabic: "عبد الجليل",
    meaning: "Servant of the Majestic",
    meaningBengali: "মহিমান্বিতের দাস",
    origin: "Arabic",
    gender: "male",
    category: "Divine Names"
  },
  {
    id: 100,
    name: "Abdul Hakim",
    arabic: "عبد الحكيم",
    meaning: "Servant of the Wise",
    meaningBengali: "প্রজ্ঞাবানের দাস",
    origin: "Arabic",
    gender: "male",
    category: "Divine Names"
  }
];

export const categories = [
  "All",
  "Prophet Names",
  "Sahabi Names",
  "Sahabiyyah Names",
  "Divine Names",
  "Quranic Names",
  "Noble Women",
  "Popular Names"
];
