export interface HajjStep {
  slug: string;
  title_bn: string;
  summary_bn: string;
  arabic_text: string;
  transliteration: string;
  translation_bn: string;
  images: string[];
  audio?: string;
  duration_minutes: number;
  tips_bn: string[];
  crowd_level?: 'low' | 'medium' | 'high';
}

export interface HajjDua {
  id: string;
  title_bn: string;
  arabic: string;
  transliteration: string;
  translation_bn: string;
  audio?: string;
}

export interface HajjChecklistItem {
  id: string;
  title_bn: string;
  note_bn: string;
  category: 'documents' | 'clothing' | 'health' | 'essentials' | 'electronics';
}

export interface HajjFAQ {
  q_bn: string;
  a_bn: string;
}

export interface HajjMapLocation {
  id: string;
  name_bn: string;
  description_bn: string;
  image: string;
}

export const hajjData = {
  title: "হজ গাইড",
  subtitle: "শতভাগ বাংলায় — ধাপে ধাপে",
  overview: "হজ ইসলামের পাঁচ স্তম্ভের একটি এবং প্রত্যেক সক্ষম মুসলমানের জন্য জীবনে একবার হজ করা ফরজ। এটি একটি পবিত্র যাত্রা যা মক্কায় পালন করা হয় এবং এতে বিভিন্ন ধর্মীয় আচার-অনুষ্ঠান অন্তর্ভুক্ত রয়েছে যা হযরত ইব্রাহিম (আঃ) এবং তাঁর পরিবারের ঐতিহ্যের স্মরণ করিয়ে দেয়।",
  locations: "মক্কা, মিনা, আরাফাহ, মুযদালিফাহ",
  
  steps: [
    {
      slug: "ihram",
      title_bn: "ইহরাম",
      summary_bn: "ইহরাম হল হজের সূচনা যেখানে পুরুষরা দুই টুকরো সেলাইবিহীন সাদা কাপড় পরে এবং মহিলারা সাধারণ পোশাক পরে। এটি পবিত্রতার অবস্থা এবং সব হাজিদের সমতার প্রতীক।",
      arabic_text: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ",
      transliteration: "Labbaik Allahumma labbaik, labbaika la sharika laka labbaik, innal hamda wan-ni'mata laka wal-mulk, la sharika lak",
      translation_bn: "আমি হাজির, হে আল্লাহ আমি হাজির। আমি হাজির, তোমার কোনো অংশীদার নেই, আমি হাজির। নিশ্চয়ই সমস্ত প্রশংসা, অনুগ্রহ এবং রাজত্ব তোমারই, তোমার কোনো অংশীদার নেই।",
      images: ["ihram"],
      duration_minutes: 30,
      tips_bn: [
        "ইহরামের আগে গোসল করুন এবং পরিচ্ছন্ন থাকুন",
        "পারফিউম বা সুগন্ধি ব্যবহার করবেন না",
        "নখ কাটা, চুল কাটা বা শেভ করা নিষিদ্ধ",
        "ইহরাম অবস্থায় যৌন সম্পর্ক নিষিদ্ধ",
        "ঝগড়া-বিবাদ এড়িয়ে চলুন"
      ],
      crowd_level: 'medium'
    },
    {
      slug: "tawaf",
      title_bn: "তাওয়াফ",
      summary_bn: "তাওয়াফ হল পবিত্র কাবা ঘরের চারপাশে ৭ বার প্রদক্ষিণ করা। এটি আল্লাহর একত্বের প্রতি আমাদের ভালোবাসা এবং আনুগত্যের প্রতীক।",
      arabic_text: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
      transliteration: "Subhan-Allahi wal-hamdu lillahi wa la ilaha illallahu wallahu akbar",
      translation_bn: "আল্লাহ পবিত্র, সমস্ত প্রশংসা আল্লাহর, আল্লাহ ছাড়া কোনো উপাস্য নেই, আল্লাহ সর্বশ্রেষ্ঠ।",
      images: ["tawaf"],
      duration_minutes: 45,
      tips_bn: [
        "হাজরে আসওয়াদ থেকে শুরু করুন এবং বাম দিকে কাবা রেখে ঘুরুন",
        "ভিড়ের সময় ধৈর্য ধরুন এবং অন্যদের ঠেলাঠেলি করবেন না",
        "প্রতিটি চক্করে দোয়া পড়ুন",
        "তাওয়াফ শেষে ২ রাকাত নামাজ পড়ুন",
        "যমযম পানি পান করুন"
      ],
      crowd_level: 'high'
    },
    {
      slug: "sai",
      title_bn: "সাঈ",
      summary_bn: "সাঈ হল সাফা ও মারওয়া পাহাড়ের মধ্যে ৭ বার হাঁটা। এটি হযরত হাজেরা (আঃ) এর পানির সন্ধানের স্মৃতির প্রতীক।",
      arabic_text: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ",
      transliteration: "Inna as-Safa wal-Marwata min sha'a'irillah",
      translation_bn: "নিশ্চয়ই সাফা ও মারওয়া আল্লাহর নিদর্শনসমূহের অন্তর্ভুক্ত।",
      images: ["sai"],
      duration_minutes: 40,
      tips_bn: [
        "সাফা থেকে শুরু করে মারওয়ায় যান",
        "সবুজ চিহ্নিত স্থানে পুরুষরা দ্রুত হাঁটবেন",
        "মহিলারা স্বাভাবিক গতিতে হাঁটবেন",
        "প্রতিটি যাত্রায় দোয়া করুন",
        "হুইলচেয়ার সুবিধা রয়েছে"
      ],
      crowd_level: 'medium'
    },
    {
      slug: "arafah",
      title_bn: "আরাফাহ",
      summary_bn: "আরাফাতের দিন হজের সবচেয়ে গুরুত্বপূর্ণ দিন। এই দিনে হাজিরা আরাফাহ ময়দানে সূর্যোদয় থেকে সূর্যাস্ত পর্যন্ত অবস্থান করেন এবং দোয়া করেন।",
      arabic_text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
      translation_bn: "আল্লাহ ছাড়া কোনো উপাস্য নেই, তিনি এক, তাঁর কোনো অংশীদার নেই, রাজত্ব তাঁরই, প্রশংসা তাঁরই এবং তিনি সবকিছুর উপর ক্ষমতাবান।",
      images: ["arafah"],
      duration_minutes: 480,
      tips_bn: [
        "সূর্যোদয়ের পর আরাফাহ পৌঁছান",
        "সূর্যাস্ত পর্যন্ত দোয়া এবং জিকিরে লিপ্ত থাকুন",
        "পানি এবং খাবার সাথে রাখুন",
        "ছায়ায় বসুন এবং রোদ এড়িয়ে চলুন",
        "সূর্যাস্ত পর্যন্ত আরাফাহ ত্যাগ করবেন না"
      ],
      crowd_level: 'high'
    },
    {
      slug: "muzdalifah",
      title_bn: "মুযদালিফাহ",
      summary_bn: "আরাফাহ থেকে মিনার মধ্যবর্তী স্থান মুযদালিফাহে রাত কাটানো এবং জামরাতে নিক্ষেপের জন্য ৪৯টি কঙ্কর সংগ্রহ করা।",
      arabic_text: "اللَّهُمَّ اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا",
      transliteration: "Allahumma ighfir lana dhunubana wa israfana fi amrina",
      translation_bn: "হে আল্লাহ, আমাদের পাপ এবং আমাদের কাজে অতিরিক্ততা ক্ষমা করুন।",
      images: ["muzdalifah"],
      duration_minutes: 420,
      tips_bn: [
        "সূর্যাস্তের পর মুযদালিফাহ পৌঁছান",
        "মাগরিব ও ইশার নামাজ একসাথে পড়ুন",
        "খোলা আকাশের নিচে রাত কাটান",
        "৪৯টি ছোট পাথর সংগ্রহ করুন",
        "ফজরের পর মিনার উদ্দেশ্যে রওনা হন"
      ],
      crowd_level: 'high'
    },
    {
      slug: "rami",
      title_bn: "রমি আল জামরাত",
      summary_bn: "শয়তানের প্রতীক তিনটি স্তম্ভে (জামরাত) কঙ্কর নিক্ষেপ করা। এটি শয়তানকে প্রত্যাখ্যান এবং আল্লাহর প্রতি দৃঢ় থাকার প্রতীক।",
      arabic_text: "اللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation_bn: "আল্লাহ সর্বশ্রেষ্ঠ।",
      images: ["muzdalifah"],
      duration_minutes: 60,
      tips_bn: [
        "প্রতি জামরাতে ৭টি কঙ্কর নিক্ষেপ করুন",
        "প্রতিটি নিক্ষেপে 'আল্লাহু আকবার' বলুন",
        "ভিড় কম থাকলে সকাল বা রাতে যান",
        "নিরাপদ দূরত্ব বজায় রাখুন",
        "পরবর্তী ৩ দিন পুনরায় রমি করুন"
      ],
      crowd_level: 'high'
    },
    {
      slug: "qurbani",
      title_bn: "কুরবানী",
      summary_bn: "আল্লাহর সন্তুষ্টির জন্য একটি পশু কুরবানী দেওয়া। এটি হযরত ইব্রাহিম (আঃ) এর ত্যাগের স্মরণ।",
      arabic_text: "بِسْمِ اللَّهِ اللَّهُ أَكْبَرُ",
      transliteration: "Bismillahi Allahu Akbar",
      translation_bn: "আল্লাহর নামে, আল্লাহ সর্বশ্রেষ্ঠ।",
      images: ["ihram"],
      duration_minutes: 30,
      tips_bn: [
        "ছাগল, ভেড়া, গরু বা উট কুরবানী করা যায়",
        "কুরবানীর কুপন কেনা যায়",
        "মাংস দরিদ্রদের মধ্যে বিতরণ করা হয়",
        "রমির পরে কুরবানী করুন",
        "নিয়ত করে দোয়া পড়ুন"
      ],
      crowd_level: 'low'
    },
    {
      slug: "halq",
      title_bn: "হালক (মাথা মুণ্ডন)",
      summary_bn: "মাথার চুল কাটা বা মুণ্ডন করা। পুরুষরা সম্পূর্ণ মাথা মুণ্ডন করে এবং মহিলারা চুলের এক ইঞ্চি কাটে।",
      arabic_text: "الْحَمْدُ لِلَّهِ",
      transliteration: "Alhamdulillah",
      translation_bn: "সমস্ত প্রশংসা আল্লাহর।",
      images: ["ihram"],
      duration_minutes: 15,
      tips_bn: [
        "নাপিত সেবা উপলব্ধ রয়েছে",
        "পুরো মাথা মুণ্ডন করা উত্তম",
        "মহিলারা শুধু এক ইঞ্চি কাটবেন",
        "এরপর ইহরাম থেকে মুক্ত হবেন",
        "স্বাভাবিক পোশাক পরতে পারবেন"
      ],
      crowd_level: 'medium'
    },
    {
      slug: "tawaf-ifadah",
      title_bn: "তাওয়াফে ইফাদাহ",
      summary_bn: "হজের প্রধান তাওয়াফ যা ঈদের দিন বা পরে সম্পন্ন করতে হয়। এটি হজের ফরজ অংশ।",
      arabic_text: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
      transliteration: "Subhan-Allahi wal-hamdu lillahi wa la ilaha illallahu wallahu akbar",
      translation_bn: "আল্লাহ পবিত্র, সমস্ত প্রশংসা আল্লাহর, আল্লাহ ছাড়া কোনো উপাস্য নেই, আল্লাহ সর্বশ্রেষ্ঠ।",
      images: ["tawaf"],
      duration_minutes: 45,
      tips_bn: [
        "ঈদের দিন বা পরে সম্পন্ন করুন",
        "৭ বার তাওয়াফ করুন",
        "সাঈ আবার করুন যদি উমরাহ না করে থাকেন",
        "ভিড় এড়াতে রাতে যাওয়ার চেষ্টা করুন",
        "তাওয়াফের পর ২ রাকাত নামাজ পড়ুন"
      ],
      crowd_level: 'high'
    }
  ] as HajjStep[],
  
  duas: [
    {
      id: "talbiyah",
      title_bn: "তালবিয়াহ",
      arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ",
      transliteration: "Labbaik Allahumma labbaik, labbaika la sharika laka labbaik, innal hamda wan-ni'mata laka wal-mulk, la sharika lak",
      translation_bn: "আমি হাজির, হে আল্লাহ আমি হাজির। আমি হাজির, তোমার কোনো অংশীদার নেই, আমি হাজির। নিশ্চয়ই সমস্ত প্রশংসা, অনুগ্রহ এবং রাজত্ব তোমারই, তোমার কোনো অংশীদার নেই।",
      audio: "/hajj/talbiyah.mp3"
    },
    {
      id: "tawaf_dua",
      title_bn: "তাওয়াফের দোয়া",
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
      translation_bn: "হে আমাদের রব! আমাদেরকে দুনিয়াতে কল্যাণ দিন, আখিরাতে কল্যাণ দিন এবং আমাদের জাহান্নামের আগুন থেকে রক্ষা করুন।"
    },
    {
      id: "arafah_dua",
      title_bn: "আরাফাহর দোয়া",
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْদُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
      translation_bn: "আল্লাহ ছাড়া কোনো উপাস্য নেই, তিনি এক, তাঁর কোনো অংশীদার নেই, রাজত্ব তাঁরই, প্রশংসা তাঁরই এবং তিনি সবকিছুর উপর ক্ষমতাবান।"
    },
    {
      id: "rami_dua",
      title_bn: "রমির দোয়া",
      arabic: "اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ",
      transliteration: "Allahu Akbar wa lillahil hamd",
      translation_bn: "আল্লাহ সর্বশ্রেষ্ঠ এবং সমস্ত প্রশংসা আল্লাহর।"
    },
    {
      id: "sai_dua",
      title_bn: "সাঈর দোয়া",
      arabic: "رَبِّ اغْفِرْ وَارْحَمْ إِنَّكَ أَنْتَ الْأَعَزُّ الْأَكْرَمُ",
      transliteration: "Rabbi ighfir warham innaka antal-a'azzul-akram",
      translation_bn: "হে আমার রব! ক্ষমা করুন এবং দয়া করুন, নিশ্চয়ই আপনি সবচেয়ে মহান এবং সম্মানিত।"
    }
  ] as HajjDua[],
  
  checklist: [
    // Documents
    { id: "passport", title_bn: "পাসপোর্ট", note_bn: "সঠিক ভিসা ও স্ট্যাম্প সহ (মেয়াদ ৬ মাস)", category: "documents" },
    { id: "visa", title_bn: "হজ ভিসা", note_bn: "সৌদি আরব হজ ভিসা", category: "documents" },
    { id: "vaccination", title_bn: "টিকা সনদপত্র", note_bn: "মেনিনজাইটিস ও কোভিড টিকার সার্টিফিকেট", category: "documents" },
    { id: "flight_ticket", title_bn: "বিমান টিকেট", note_bn: "যাওয়া-আসার টিকেটের কপি", category: "documents" },
    { id: "hotel_voucher", title_bn: "হোটেল ভাউচার", note_bn: "মক্কা ও মদিনার হোটেল বুকিং", category: "documents" },
    { id: "emergency_contact", title_bn: "জরুরি যোগাযোগ তালিকা", note_bn: "পরিবার ও দূতাবাসের নম্বর", category: "documents" },
    
    // Clothing
    { id: "ihram_cloth", title_bn: "ইহরাম কাপড়", note_bn: "পুরুষদের জন্য ২ সেট সেলাইবিহীন সাদা কাপড়", category: "clothing" },
    { id: "comfortable_shoes", title_bn: "আরামদায়ক জুতা", note_bn: "হাঁটার জন্য নরম ও টেকসই", category: "clothing" },
    { id: "extra_clothes", title_bn: "অতিরিক্ত পোশাক", note_bn: "সাধারণ পোশাক ৫-৭ সেট", category: "clothing" },
    { id: "waist_belt", title_bn: "কোমর বেল্ট/পাউচ", note_bn: "টাকা ও কাগজপত্র রাখার জন্য", category: "clothing" },
    
    // Health
    { id: "medicines", title_bn: "ওষুধপত্র", note_bn: "ব্যক্তিগত ওষুধ, ব্যথানাশক, জ্বরের ওষুধ", category: "health" },
    { id: "first_aid", title_bn: "প্রাথমিক চিকিৎসা কিট", note_bn: "ব্যান্ডেজ, অ্যান্টিসেপটিক, মলম", category: "health" },
    { id: "sunscreen", title_bn: "সানস্ক্রিন", note_bn: "SPF 50+ রোদ থেকে সুরক্ষার জন্য", category: "health" },
    { id: "hand_sanitizer", title_bn: "হ্যান্ড স্যানিটাইজার", note_bn: "জীবাণুমুক্ত রাখার জন্য", category: "health" },
    { id: "face_mask", title_bn: "ফেস মাস্ক", note_bn: "ধুলা ও সংক্রমণ থেকে সুরক্ষা", category: "health" },
    
    // Essentials
    { id: "prayer_mat", title_bn: "নামাজের চাটাই", note_bn: "হালকা ও বহনযোগ্য", category: "essentials" },
    { id: "quran", title_bn: "ছোট কুরআন শরীফ", note_bn: "পকেট সাইজ বা মোবাইল অ্যাপ", category: "essentials" },
    { id: "tasbih", title_bn: "তসবিহ", note_bn: "জিকিরের জন্য", category: "essentials" },
    { id: "dua_book", title_bn: "দোয়ার বই", note_bn: "হজের দোয়া সংকলন", category: "essentials" },
    { id: "water_bottle", title_bn: "পানির বোতল", note_bn: "পুনরায় ব্যবহারযোগ্য বোতল", category: "essentials" },
    { id: "umbrella", title_bn: "ছাতা", note_bn: "রোদ ও বৃষ্টির জন্য", category: "essentials" },
    { id: "backpack", title_bn: "ব্যাকপ্যাক", note_bn: "দৈনিক প্রয়োজনীয় জিনিস রাখার জন্য", category: "essentials" },
    
    // Electronics
    { id: "phone", title_bn: "মোবাইল ফোন", note_bn: "ফুল চার্জ সহ", category: "electronics" },
    { id: "charger", title_bn: "চার্জার", note_bn: "ফোন ও অন্যান্য ডিভাইসের", category: "electronics" },
    { id: "power_bank", title_bn: "পাওয়ার ব্যাংক", note_bn: "জরুরি চার্জের জন্য", category: "electronics" },
    { id: "adapter", title_bn: "অ্যাডাপ্টার", note_bn: "সৌদি আরবের প্লাগ টাইপ G", category: "electronics" },
    { id: "sim_card", title_bn: "সিম কার্ড", note_bn: "স্থানীয় সিম কার্ড/রোমিং", category: "electronics" }
  ] as HajjChecklistItem[],
  
  faq: [
    {
      q_bn: "ইহরামে পরফিউম ব্যবহার করা যাবে কি?",
      a_bn: "না, ইহরাম অবস্থায় কোনো ধরনের সুগন্ধি বা পরফিউম ব্যবহার করা নিষিদ্ধ। ইহরামের আগে সুগন্ধি ব্যবহার করতে পারেন।"
    },
    {
      q_bn: "মহিলাদের জন্য ইহরামের বিশেষ নিয়ম আছে কি?",
      a_bn: "মহিলারা তাদের স্বাভাবিক পোশাক পরবেন তবে হাত, মুখ ও পা ছাড়া সারা শরীর ঢাকা থাকতে হবে। তবে মুখে নেকাব লাগানো যাবে না।"
    },
    {
      q_bn: "তাওয়াফের সময় কী পড়তে হয়?",
      a_bn: "তাওয়াফের সময় কোনো নির্দিষ্ট দোয়া নেই। আপনি কুরআন তিলাওয়াত, জিকির বা যেকোনো দোয়া পড়তে পারেন। 'রব্বানা আতিনা' দোয়াটি বিশেষভাবে পড়া হয়।"
    },
    {
      q_bn: "হজের সময় কতটুকু অর্থ সাথে রাখা উচিত?",
      a_bn: "দৈনিক খরচের জন্য ৫০০-১০০০ রিয়াল নগদ রাখুন। বাকি টাকা ক্রেডিট/ডেবিট কার্ডে রাখা নিরাপদ। জরুরি খরচের জন্য অতিরিক্ত রাখুন।"
    },
    {
      q_bn: "আরাফাহর দিন কখন শুরু এবং শেষ হয়?",
      a_bn: "জিলহজ মাসের ৯ তারিখ সূর্যোদয় থেকে সূর্যাস্ত পর্যন্ত আরাফাহর দিন। সূর্যাস্তের আগে আরাফাহ ত্যাগ করা উচিত নয়।"
    },
    {
      q_bn: "কুরবানী কিভাবে করবো?",
      a_bn: "আপনি নিজে কুরবানী করতে পারেন বা কুরবানীর কুপন কিনতে পারেন। কুপনের মাধ্যমে আপনার পক্ষে কুরবানী সম্পন্ন হবে এবং মাংস দরিদ্রদের মধ্যে বিতরণ করা হবে।"
    },
    {
      q_bn: "ভিড়ের সময় নিরাপদ থাকার উপায়?",
      a_bn: "ধৈর্য ধরুন, ঠেলাঠেলি করবেন না, দলছাড়া হলে পূর্বনির্ধারিত স্থানে মিলিত হন, জরুরি নম্বর সাথে রাখুন এবং রাত বা কম ভিড়ের সময় ইবাদত করার চেষ্টা করুন।"
    },
    {
      q_bn: "হজের পর উমরাহ করা যায় কি?",
      a_bn: "হ্যাঁ, হজের পর আপনি তানয়িম বা জি'রানা যেয়ে ইহরাম বেঁধে উমরাহ করতে পারেন। অনেকে এটি করে থাকেন।"
    }
  ] as HajjFAQ[],
  
  maps: [
    {
      id: "makkah",
      name_bn: "মক্কা",
      description_bn: "মসজিদুল হারাম, কাবা শরীফ, সাফা ও মারওয়া পাহাড় এবং তাওয়াফ ও সাঈর স্থান।",
      image: "map-makkah"
    },
    {
      id: "mina",
      name_bn: "মিনা",
      description_bn: "তাঁবু শহর যেখানে হাজিরা অবস্থান করেন এবং জামরাত (শয়তানের স্তম্ভ) যেখানে কঙ্কর নিক্ষেপ করা হয়।",
      image: "map-mina"
    }
  ] as HajjMapLocation[]
};
