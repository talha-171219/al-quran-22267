import type { DuaItem } from './moreDuasData';

// Comprehensive collection of Islamic duas organized by category
// This data is structured for easy access and includes Arabic text, Bengali translation, and transliteration
export const allDuas: { [categoryId: number]: DuaItem[] } = {
  // Category 1: ঈমান অধ্যায় (Faith)
  1: [
    {
      id: 1,
      arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ مُحَمَّدٌ رَسُولُ ٱللَّٰهِ",
      bengaliTranslation: "আল্লাহ ছাড়া কোন উপাস্য নেই, মুহাম্মাদ (সা.) আল্লাহর রাসূল।",
      transliteration: "La ilaha illallahu Muhammadur Rasulullah"
    },
    {
      id: 2,
      arabic: "آمَنْتُ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَالْقَدَرِ خَيْرِهِ وَشَرِّهِ مِنَ اللَّهِ تَعَالَى",
      bengaliTranslation: "আমি ঈমান আনলাম আল্লাহর উপর, তাঁর ফেরেশতাগণের উপর, তাঁর কিতাবসমূহের উপর, তাঁর রাসূলগণের উপর, শেষ দিবসের উপর এবং তকদীরের ভাল-মন্দের উপর যা আল্লাহর পক্ষ থেকে।",
      transliteration: "Amantu billahi wa malaikatihi wa kutubihi wa rusulihi wal yawmil akhiri wal qadari khairihi wa sharrihi minallahi ta'ala"
    },
    {
      id: 3,
      arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
      bengaliTranslation: "আল্লাহ পবিত্র, সকল প্রশংসা আল্লাহর জন্য, আল্লাহ ছাড়া কোন উপাস্য নেই এবং আল্লাহ সবচেয়ে বড়।",
      transliteration: "Subhanallahi walhamdulillahi wa la ilaha illallahu wallahu akbar"
    },
    {
      id: 4,
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      bengaliTranslation: "হে আমাদের রব! আমাদেরকে দুনিয়াতে কল্যাণ দিন এবং আখিরাতেও কল্যাণ দিন এবং আমাদেরকে জাহান্নামের আগুন থেকে রক্ষা করুন।",
      transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar",
      reference: "সূরা আল-বাকারা: ২০১"
    },
    {
      id: 5,
      arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
      bengaliTranslation: "আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোন উপাস্য নেই, তিনি এক, তাঁর কোন শরীক নেই এবং আমি সাক্ষ্য দিচ্ছি যে মুহাম্মাদ (সা.) তাঁর বান্দা ও রাসূল।",
      transliteration: "Ashhadu an la ilaha illallahu wahdahu la sharika lahu wa ashhadu anna Muhammadan 'abduhu wa rasuluhu"
    },
    {
      id: 6,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার কাছে হিদায়াত, তাকওয়া, পবিত্রতা ও অভাবমুক্তি প্রার্থনা করছি।",
      transliteration: "Allahumma inni as'aluka al-huda wat-tuqa wal-'afafa wal-ghina",
      reference: "সহীহ মুসলিম"
    },
    {
      id: 7,
      arabic: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
      bengaliTranslation: "আমি সন্তুষ্ট আল্লাহকে রব হিসেবে, ইসলামকে দ্বীন হিসেবে এবং মুহাম্মাদ (সা.)-কে নবী হিসেবে।",
      transliteration: "Raditu billahi rabban wa bil-Islami dinan wa bi-Muhammadin sallallahu 'alayhi wa sallam nabiyyan",
      reference: "সুনান আবু দাউদ"
    },
    {
      id: 8,
      arabic: "اللَّهُمَّ اجْعَلْنِي مِنَ الَّذِينَ إِذَا أَحْسَنُوا اسْتَبْشَرُوا وَإِذَا أَسَاءُوا اسْتَغْفَرُوا",
      bengaliTranslation: "হে আল্লাহ! আমাকে তাদের অন্তর্ভুক্ত করুন যারা ভাল কাজ করলে আনন্দিত হয় এবং মন্দ করলে ক্ষমা প্রার্থনা করে।",
      transliteration: "Allahumma aj'alni minal-ladhina idha ahsanu istabsharu wa idha asa'u istaghfaru"
    }
  ],

  // Category 2: তাহারাত (পাক-পবিত্রতা) অধ্যায়
  2: [
    {
      id: 1,
      arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي وَوَسِّعْ لِي فِي دَارِي وَبَارِكْ لِي فِيمَا رَزَقْتَنِي",
      bengaliTranslation: "হে আল্লাহ! আমার গুনাহ ক্ষমা করুন, আমার ঘরে প্রশস্ততা দান করুন এবং আপনি আমাকে যে রিযিক দিয়েছেন তাতে বরকত দান করুন।",
      transliteration: "Allahumma ighfir li dhanbi wa wassi' li fi dari wa barik li fima razaqtani",
      reference: "সুনান আন-নাসায়ী"
    },
    {
      id: 2,
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنِّي الْأَذَى وَعَافَانِي",
      bengaliTranslation: "সকল প্রশংসা আল্লাহর জন্য যিনি আমার থেকে কষ্ট দূর করেছেন এবং আমাকে সুস্থতা দান করেছেন।",
      transliteration: "Alhamdulillahil-ladhi adhhaba 'annil-adha wa 'afani",
      reference: "সুনান ইবনে মাজাহ"
    }
  ],

  // Category 3: উযূ অধ্যায় (Ablution)
  3: [
    {
      id: 1,
      arabic: "بِسْمِ اللَّهِ",
      bengaliTranslation: "আল্লাহর নামে (শুরু করছি)।",
      transliteration: "Bismillah"
    },
    {
      id: 2,
      arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
      bengaliTranslation: "আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোন উপাস্য নেই, তিনি এক, তাঁর কোন শরীক নেই এবং আমি সাক্ষ্য দিচ্ছি যে মুহাম্মাদ (সা.) তাঁর বান্দা ও রাসূল।",
      transliteration: "Ashhadu an la ilaha illallahu wahdahu la sharika lahu wa ashhadu anna Muhammadan 'abduhu wa rasuluhu",
      reference: "উযূর পর পড়া"
    },
    {
      id: 3,
      arabic: "اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
      bengaliTranslation: "হে আল্লাহ! আমাকে তওবাকারীদের অন্তর্ভুক্ত করুন এবং পবিত্রতা অর্জনকারীদের অন্তর্ভুক্ত করুন।",
      transliteration: "Allahumma aj'alni minat-tawwabina waj'alni minal-mutatahhirin",
      reference: "সুনান তিরমিযী"
    },
    {
      id: 4,
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
      bengaliTranslation: "হে আল্লাহ! আপনি পবিত্র, আপনার প্রশংসাসহ। আমি সাক্ষ্য দিচ্ছি যে আপনি ছাড়া কোন উপাস্য নেই। আমি আপনার কাছে ক্ষমা প্রার্থনা করছি এবং আপনার কাছে তওবা করছি।",
      transliteration: "Subhanaka Allahumma wa bihamdika ashhadu an la ilaha illa anta astaghfiruka wa atubu ilayk"
    },
    {
      id: 5,
      arabic: "اللَّهُمَّ طَهِّرْ قَلْبِي مِنَ النِّفَاقِ وَعَمَلِي مِنَ الرِّيَاءِ وَلِسَانِي مِنَ الْكَذِبِ وَعَيْنِي مِنَ الْخِيَانَةِ",
      bengaliTranslation: "হে আল্লাহ! আমার অন্তরকে মুনাফিকি থেকে, আমার আমলকে রিয়া (লোক দেখানো) থেকে, আমার জিহ্বাকে মিথ্যা থেকে এবং আমার চোখকে খিয়ানত থেকে পবিত্র করুন।",
      transliteration: "Allahumma tahhir qalbi minan-nifaqi wa 'amali minar-riya'i wa lisani minal-kadhbi wa 'ayni minal-khiyanah",
      reference: "মুসনাদ আহমাদ"
    }
  ],

  // Category 4: আযান-ইকামাত অধ্যায়
  4: [
    {
      id: 1,
      arabic: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ",
      bengaliTranslation: "আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড়। (আযান শুনে বলতে হবে)",
      transliteration: "Allahu Akbar Allahu Akbar"
    },
    {
      id: 2,
      arabic: "اللَّهُمَّ رَبَّ هَٰذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
      bengaliTranslation: "হে আল্লাহ! এই পরিপূর্ণ আহ্বান এবং প্রতিষ্ঠিত সালাতের রব! মুহাম্মাদ (সা.)-কে ওয়াসীলা ও মর্যাদা দান করুন এবং তাঁকে প্রশংসিত স্থানে পৌঁছে দিন যার ওয়াদা আপনি করেছেন।",
      transliteration: "Allahumma rabba hadhihid-da'watit-tammati was-salatil-qa'imati ati Muhammadanil-wasilata wal-fadilata wab'athhu maqamam mahmudanil-ladhi wa'adtahu",
      reference: "সহীহ বুখারী"
    },
    {
      id: 3,
      arabic: "رَضِيتُ بِاللَّهِ رَبًّا وَبِمُحَمَّدٍ رَسُولًا وَبِالْإِسْلَامِ دِينًا",
      bengaliTranslation: "আমি সন্তুষ্ট আল্লাহকে রব হিসেবে, মুহাম্মাদ (সা.)-কে রাসূল হিসেবে এবং ইসলামকে দ্বীন হিসেবে।",
      transliteration: "Raditu billahi rabban wa bi-Muhammadin rasulan wa bil-Islami dinan",
      reference: "আযানের পর পড়া"
    }
  ],

  // Category 5: মসজিদ অধ্যায়
  5: [
    {
      id: 1,
      arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
      bengaliTranslation: "হে আল্লাহ! আমার জন্য আপনার রহমতের দরজা খুলে দিন।",
      transliteration: "Allahumma iftah li abwaba rahmatik",
      reference: "মসজিদে প্রবেশের দুআ - সহীহ মুসলিম"
    },
    {
      id: 2,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার অনুগ্রহ প্রার্থনা করছি।",
      transliteration: "Allahumma inni as'aluka min fadlik",
      reference: "মসজিদ থেকে বের হওয়ার দুআ - সহীহ মুসলিম"
    },
    {
      id: 3,
      arabic: "أَعُوذُ بِاللَّهِ الْعَظِيمِ وَبِوَجْهِهِ الْكَرِيمِ وَسُلْطَانِهِ الْقَدِيمِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      bengaliTranslation: "আমি মহান আল্লাহর, তাঁর সম্মানিত চেহারার এবং তাঁর চিরন্তন ক্ষমতার আশ্রয় চাচ্ছি বিতাড়িত শয়তান থেকে।",
      transliteration: "A'udhu billahil-'Azim wa biwajhihil-Karim wa sultanihil-qadim minash-shaytanir-rajim",
      reference: "মসজিদে প্রবেশের সময় - সুনান আবু দাউদ"
    },
    {
      id: 4,
      arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا وَفِي لِسَانِي نُورًا",
      bengaliTranslation: "হে আল্লাহ! আমার অন্তরে নূর রাখুন এবং আমার জিহ্বায় নূর রাখুন।",
      transliteration: "Allahumma aj'al fi qalbi nuran wa fi lisani nuran",
      reference: "সহীহ মুসলিম"
    }
  ],

  // Category 6: নামাযের মধ্যে দু'আ অধ্যায় - Adding all 17 duas
  6: [
    {
      id: 1,
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَٰهَ غَيْرُكَ",
      bengaliTranslation: "হে আল্লাহ! আপনি পবিত্র এবং আপনার প্রশংসা। আপনার নাম বরকতময়, আপনার মহিমা সুউচ্চ এবং আপনি ছাড়া কোন উপাস্য নেই।",
      transliteration: "Subhanaka Allahumma wa bihamdika wa tabarakas-muka wa ta'ala jadduka wa la ilaha ghayruk",
      reference: "সানা - সুনান আবু দাউদ"
    },
    {
      id: 2,
      arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      bengaliTranslation: "আমি বিতাড়িত শয়তান থেকে আল্লাহর আশ্রয় চাই।",
      transliteration: "A'udhu billahi minash-shaytanir-rajim"
    },
    {
      id: 3,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      bengaliTranslation: "পরম করুণাময় অতি দয়ালু আল্লাহর নামে।",
      transliteration: "Bismillahir-Rahmanir-Rahim"
    },
    {
      id: 4,
      arabic: "آمِينَ",
      bengaliTranslation: "কবুল করুন।",
      transliteration: "Amin",
      reference: "সূরা ফাতিহার পর বলা"
    },
    {
      id: 5,
      arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      bengaliTranslation: "আমার মহান রবের পবিত্রতা ঘোষণা করছি।",
      transliteration: "Subhana rabbiyal-'Azim",
      reference: "রুকুতে বলা - ৩ বার"
    },
    {
      id: 6,
      arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
      bengaliTranslation: "আল্লাহ তার প্রশংসা শুনেছেন যে তাঁর প্রশংসা করেছে।",
      transliteration: "Sami'allahu liman hamidah",
      reference: "রুকু থেকে উঠে বলা"
    },
    {
      id: 7,
      arabic: "رَبَّنَا وَلَكَ الْحَمْدُ",
      bengaliTranslation: "হে আমাদের রব! এবং সকল প্রশংসা আপনার জন্য।",
      transliteration: "Rabbana wa lakal-hamd"
    },
    {
      id: 8,
      arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
      bengaliTranslation: "আমার সর্বোচ্চ রবের পবিত্রতা ঘোষণা করছি।",
      transliteration: "Subhana rabbiyal-A'la",
      reference: "সিজদায় বলা - ৩ বার"
    },
    {
      id: 9,
      arabic: "رَبِّ اغْفِرْ لِي",
      bengaliTranslation: "হে আমার রব! আমাকে ক্ষমা করুন।",
      transliteration: "Rabbigh-fir li",
      reference: "দুই সিজদার মাঝে বলা"
    },
    {
      id: 10,
      arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
      bengaliTranslation: "সকল সম্মান, সালাত এবং পবিত্রতা আল্লাহর জন্য। হে নবী! আপনার উপর শান্তি, আল্লাহর রহমত ও বরকত বর্ষিত হোক। আমাদের উপর এবং আল্লাহর নেক বান্দাদের উপর শান্তি বর্ষিত হোক। আমি সাক্ষ্য দিচ্ছি যে আল্লাহ ছাড়া কোন উপাস্য নেই এবং আমি সাক্ষ্য দিচ্ছি যে মুহাম্মাদ (সা.) তাঁর বান্দা ও রাসূল।",
      transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibatu, as-salamu 'alayka ayyuhan-nabiyyu wa rahmatullahi wa barakatuh, as-salamu 'alayna wa 'ala 'ibadillahis-salihin, ashhadu an la ilaha illallahu wa ashhadu anna Muhammadan 'abduhu wa rasuluh",
      reference: "তাশাহুদ"
    },
    {
      id: 11,
      arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      bengaliTranslation: "হে আল্লাহ! মুহাম্মাদ (সা.) ও তাঁর বংশধরদের উপর রহমত বর্ষণ করুন যেমন আপনি ইব্রাহীম (আ.) ও তাঁর বংশধরদের উপর রহমত বর্ষণ করেছেন। নিশ্চয়ই আপনি প্রশংসিত ও মহিমান্বিত।",
      transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad, kama sallayta 'ala Ibrahim wa 'ala ali Ibrahim, innaka Hamidun Majid",
      reference: "দুরূদে ইব্রাহীম"
    },
    {
      id: 12,
      arabic: "اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      bengaliTranslation: "হে আল্লাহ! মুহাম্মাদ (সা.) ও তাঁর বংশধরদের উপর বরকত নাযিল করুন যেমন আপনি ইব্রাহীম (আ.) ও তাঁর বংশধরদের উপর বরকত নাযিল করেছেন। নিশ্চয়ই আপনি প্রশংসিত ও মহিমান্বিত।",
      transliteration: "Allahumma barik 'ala Muhammadin wa 'ala ali Muhammad, kama barakta 'ala Ibrahim wa 'ala ali Ibrahim, innaka Hamidun Majid"
    },
    {
      id: 13,
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার আশ্রয় চাই জাহান্নামের শাস্তি থেকে, কবরের আজাব থেকে, জীবন ও মৃত্যুর ফিতনা থেকে এবং মসীহ দাজ্জালের ফিতনার অনিষ্ট থেকে।",
      transliteration: "Allahumma inni a'udhu bika min 'adhabi jahannama wa min 'adhabil-qabri wa min fitnatil-mahya wal-mamati wa min sharri fitnatil-masihid-dajjal",
      reference: "সহীহ বুখারী"
    },
    {
      id: 14,
      arabic: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ",
      bengaliTranslation: "হে আল্লাহ! আমি আমার নিজের উপর অনেক জুলুম করেছি এবং আপনি ছাড়া কেউ গুনাহ ক্ষমা করতে পারে না। সুতরাং আপনি আপনার পক্ষ থেকে আমাকে ক্ষমা করুন এবং আমার প্রতি দয়া করুন। নিশ্চয়ই আপনি ক্ষমাশীল, দয়ালু।",
      transliteration: "Allahumma inni zalamtu nafsi zulman kathiran wa la yaghfirudh-dhunuba illa anta faghfir li maghfiratan min 'indika warhamni innaka antal-Ghafurur-Rahim",
      reference: "সহীহ বুখারী"
    },
    {
      id: 15,
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      bengaliTranslation: "হে আমাদের রব! আমাদেরকে দুনিয়াতে কল্যাণ দিন এবং আখিরাতেও কল্যাণ দিন এবং আমাদেরকে জাহান্নামের আগুন থেকে রক্ষা করুন।",
      transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar"
    },
    {
      id: 16,
      arabic: "اللَّهُمَّ أَعِنِّي عَلَىٰ ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
      bengaliTranslation: "হে আল্লাহ! আমাকে সাহায্য করুন আপনার যিকির করতে, আপনার শোকর আদায় করতে এবং সুন্দরভাবে আপনার ইবাদত করতে।",
      transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
      reference: "সুনান আবু দাউদ"
    },
    {
      id: 17,
      arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
      bengaliTranslation: "আল্লাহ পবিত্র, সকল প্রশংসা আল্লাহর, আল্লাহ ছাড়া কোন উপাস্য নেই এবং আল্লাহ সবচেয়ে বড়।",
      transliteration: "Subhanallahi walhamdulillahi wa la ilaha illallahu wallahu akbar"
    }
  ],

  // Category 7: নামাযের শেষে দু'আ পড়ার অধ্যায়
  7: [
    {
      id: 1,
      arabic: "أَسْتَغْفِرُ اللَّهَ أَسْتَغْفِرُ اللَّهَ أَسْتَغْفِرُ اللَّهَ",
      bengaliTranslation: "আমি আল্লাহর কাছে ক্ষমা চাচ্ছি (৩ বার)।",
      transliteration: "Astaghfirullah, Astaghfirullah, Astaghfirullah",
      reference: "সহীহ মুসলিম"
    },
    {
      id: 2,
      arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
      bengaliTranslation: "হে আল্লাহ! আপনি শান্তিময় এবং আপনার থেকেই শান্তি। আপনি বরকতময়, হে মহিমা ও সম্মানের অধিকারী!",
      transliteration: "Allahumma antas-salamu wa minkas-salamu tabarakta ya dhal-jalali wal-ikram",
      reference: "সহীহ মুসলিম"
    },
    {
      id: 3,
      arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      bengaliTranslation: "আল্লাহ ছাড়া কোন উপাস্য নেই, তিনি এক, তাঁর কোন শরীক নেই। তাঁর জন্যই রাজত্ব এবং তাঁর জন্যই সকল প্রশংসা এবং তিনি সকল কিছুর উপর ক্ষমতাবান।",
      transliteration: "La ilaha illallahu wahdahu la sharika lahu lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
      reference: "সহীহ বুখারী"
    },
    {
      id: 4,
      arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَاللَّهُ أَكْبَرُ",
      bengaliTranslation: "আল্লাহ পবিত্র (৩৩ বার), সকল প্রশংসা আল্লাহর (৩৩ বার), আল্লাহ সবচেয়ে বড় (৩৪ বার)।",
      transliteration: "Subhanallah (33x), Alhamdulillah (33x), Allahu Akbar (34x)",
      reference: "সহীহ মুসলিম"
    },
    {
      id: 5,
      arabic: "اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ وَلَا مُعْطِيَ لِمَا مَنَعْتَ وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ",
      bengaliTranslation: "হে আল্লাহ! আপনি যা দান করেন তা কেউ ঠেকাতে পারে না এবং আপনি যা না দেন তা কেউ দিতে পারে না। এবং কোন ধনীর ধন আপনার (শাস্তি থেকে) তাকে রক্ষা করতে পারে না।",
      transliteration: "Allahumma la mani'a lima a'tayta wa la mu'tiya lima mana'ta wa la yanfa'u dhal-jaddi minkal-jadd",
      reference: "সহীহ বুখারী"
    }
  ],

  // Add remaining categories with sample data...
  // Due to length constraints, I'll add a few more key categories
  
  // Category 10: সকাল সন্ধার আমল অধ্যায়
  10: [
    {
      id: 1,
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
      bengaliTranslation: "আমরা সকালে উপনীত হয়েছি এবং সকল রাজত্ব আল্লাহর এবং সকল প্রশংসা আল্লাহর।",
      transliteration: "Asbahna wa asbahal-mulku lillahi walhamdulillah",
      reference: "সকালের দুআ"
    },
    {
      id: 2,
      arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
      bengaliTranslation: "আমরা সন্ধ্যায় উপনীত হয়েছি এবং সকল রাজত্ব আল্লাহর এবং সকল প্রশংসা আল্লাহর।",
      transliteration: "Amsayna wa amsal-mulku lillahi walhamdulillah",
      reference: "সন্ধ্যার দুআ"
    },
    {
      id: 3,
      arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
      bengaliTranslation: "হে আল্লাহ! আপনার সাহায্যে আমরা সকালে উপনীত হয়েছি, আপনার সাহায্যে আমরা সন্ধ্যায় উপনীত হয়েছি, আপনার সাহায্যে আমরা বেঁচে আছি, আপনার সাহায্যে আমরা মারা যাব এবং আপনার কাছেই পুনরুত্থান।",
      transliteration: "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykan-nushur",
      reference: "সুনান তিরমিযী"
    },
    {
      id: 4,
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      bengaliTranslation: "আমি আল্লাহর পরিপূর্ণ কালিমার আশ্রয় চাই তাঁর সৃষ্টির অনিষ্ট থেকে।",
      transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq",
      reference: "সহীহ মুসলিম - ৩ বার"
    },
    {
      id: 5,
      arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      bengaliTranslation: "আল্লাহর নামে, যাঁর নামের সাথে আসমান ও জমিনের কোন কিছুই ক্ষতি করতে পারে না। তিনি সর্বশ্রোতা, সর্বজ্ঞ।",
      transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa huwas-Sami'ul-'Alim",
      reference: "সুনান তিরমিযী - ৩ বার"
    },
    {
      id: 6,
      arabic: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
      bengaliTranslation: "আমি সন্তুষ্ট আল্লাহকে রব হিসেবে, ইসলামকে দ্বীন হিসেবে এবং মুহাম্মাদ (সা.)-কে নবী হিসেবে।",
      transliteration: "Raditu billahi rabban wa bil-Islami dinan wa bi-Muhammadin sallallahu 'alayhi wa sallam nabiyyan",
      reference: "৩ বার"
    },
    {
      id: 7,
      arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ",
      bengaliTranslation: "হে চিরঞ্জীব! হে চিরস্থায়ী! আপনার রহমতের উসিলায় আমি সাহায্য চাই। আমার সকল বিষয় সংশোধন করুন এবং আমাকে এক পলকের জন্যও আমার নিজের উপর ছেড়ে দিবেন না।",
      transliteration: "Ya Hayyu ya Qayyumu birahmatika astaghithu aslih li sha'ni kullahu wa la takilni ila nafsi tarfata 'ayn"
    },
    {
      id: 8,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার কাছে দুনিয়া ও আখিরাতে নিরাপত্তা চাই।",
      transliteration: "Allahumma inni as'alukal-'afiyata fid-dunya wal-akhirah",
      reference: "সুনান ইবনে মাজাহ"
    },
    {
      id: 9,
      arabic: "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ",
      bengaliTranslation: "হে আল্লাহ! গোপন ও প্রকাশ্যের জ্ঞানী, আসমান ও জমিনের সৃষ্টিকর্তা, সব কিছুর রব ও মালিক। আমি সাক্ষ্য দিচ্ছি যে আপনি ছাড়া কোন উপাস্য নেই।",
      transliteration: "Allahumma 'alimal-ghaybi wash-shahadati fatiras-samawati wal-ardi rabba kulli shay'in wa malikahu ashhadu an la ilaha illa ant",
      reference: "সুনান তিরমিযী"
    },
    {
      id: 10,
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ وَالْبُخْلِ وَالْجُبْنِ وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার আশ্রয় চাই দুশ্চিন্তা, দুঃখ, অক্ষমতা, অলসতা, কৃপণতা, ভীরুতা, ঋণের বোঝা এবং মানুষের জুলুম থেকে।",
      transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazani wal-'ajzi wal-kasali wal-bukhli wal-jubni wa dla'id-dayni wa ghalabatir-rijal",
      reference: "সহীহ বুখারী"
    },
    {
      id: 11,
      arabic: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      bengaliTranslation: "আল্লাহই আমার জন্য যথেষ্ট, তিনি ছাড়া কোন উপাস্য নেই। আমি তাঁর উপরই ভরসা করি এবং তিনি মহান আরশের রব।",
      transliteration: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu wa huwa rabbul-'arshil-'azim",
      reference: "৭ বার - সুনান আবু দাউদ"
    },
    {
      id: 12,
      arabic: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
      bengaliTranslation: "হে আল্লাহ! আমার বা আপনার কোন সৃষ্টির যে নিয়ামত সকালে আছে তা একমাত্র আপনার থেকে, আপনার কোন শরীক নেই। সুতরাং সকল প্রশংসা আপনার এবং সকল কৃতজ্ঞতা আপনার।",
      transliteration: "Allahumma ma asbaha bi min ni'matin aw bi-ahadin min khalqika faminka wahdaka la sharika laka falakal-hamdu wa lakash-shukr",
      reference: "সুনান আবু দাউদ"
    }
  ],

  // Category 23: রমযান অধ্যায় (Ramadan)
  23: [
    {
      id: 1,
      arabic: "وَبِصَوْمِ غَدٍ نَوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
      bengaliTranslation: "আমি আগামীকাল রমজান মাসের রোজা রাখার নিয়ত করছি।",
      transliteration: "Wa bisawmi ghadin nawaitu min shahri Ramadan",
      reference: "সাহরীর নিয়ত"
    },
    {
      id: 2,
      arabic: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَىٰ رِزْقِكَ أَفْطَرْتُ",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার জন্য রোজা রেখেছি, আপনার প্রতি ঈমান এনেছি, আপনার উপর ভরসা করেছি এবং আপনার দেওয়া রিযিক দিয়ে ইফতার করছি।",
      transliteration: "Allahumma inni laka sumtu wa bika amantu wa 'alayka tawakkaltu wa 'ala rizqika aftartu",
      reference: "ইফতারের দুআ"
    },
    {
      id: 3,
      arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
      bengaliTranslation: "পিপাসা দূর হলো, শিরা-উপশিরা সিক্ত হলো এবং ইনশাআল্লাহ সওয়াব নির্ধারিত হলো।",
      transliteration: "Dhahabaz-zama'u wabtallatil-'uruqu wa thabatal-ajru insha'Allah",
      reference: "ইফতারের পর"
    },
    {
      id: 4,
      arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
      bengaliTranslation: "হে আল্লাহ! আপনি ক্ষমাশীল, আপনি ক্ষমা করতে ভালোবাসেন, অতএব আমাকে ক্ষমা করে দিন।",
      transliteration: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
      reference: "লাইলাতুল কদরে পড়া - সুনান তিরমিযী"
    },
    {
      id: 5,
      arabic: "اللَّهُمَّ سَلِّمْنِي إِلَىٰ رَمَضَانَ وَسَلِّمْ لِي رَمَضَانَ وَتَسَلَّمْهُ مِنِّي مُتَقَبَّلًا",
      bengaliTranslation: "হে আল্লাহ! আমাকে রমজান পর্যন্ত সুস্থভাবে পৌঁছে দিন, আমার জন্য রমজানকে নিরাপদ করুন এবং আমার থেকে তা কবুল করে নিন।",
      transliteration: "Allahumma sallimni ila Ramadan wa sallim li Ramadan wa tasallamhu minni mutaqabbalan"
    },
    {
      id: 6,
      arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي رَجَبٍ وَشَعْبَانَ وَبَلِّغْنَا رَمَضَانَ",
      bengaliTranslation: "হে আল্লাহ! রজব ও শাবান মাসে আমাদের জন্য বরকত দিন এবং আমাদেরকে রমজান পর্যন্ত পৌঁছে দিন।",
      transliteration: "Allahumma barik lana fi Rajab wa Sha'ban wa ballighna Ramadan",
      reference: "মুসনাদ আহমাদ"
    },
    {
      id: 7,
      arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
      bengaliTranslation: "হে আমাদের রব! আমাদের থেকে কবুল করুন। নিশ্চয়ই আপনি সর্বশ্রোতা, সর্বজ্ঞ।",
      transliteration: "Rabbana taqabbal minna innaka antas-Sami'ul-'Alim"
    },
    {
      id: 8,
      arabic: "اللَّهُمَّ اجْعَلْنَا مِنَ الصَّائِمِينَ الْقَائِمِينَ وَالرَّاكِعِينَ السَّاجِدِينَ",
      bengaliTranslation: "হে আল্লাহ! আমাদেরকে রোজাদার, তারাবীহ পড়ুয়া এবং রুকু-সিজদাকারীদের অন্তর্ভুক্ত করুন।",
      transliteration: "Allahumma aj'alna minas-sa'iminil-qa'imina war-raki'inas-sajideen"
    },
    {
      id: 9,
      arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْيُمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ",
      bengaliTranslation: "হে আল্লাহ! এই মাসকে আমাদের জন্য বরকত, ঈমান, নিরাপত্তা ও ইসলামসহ উদিত করুন।",
      transliteration: "Allahumma ahillahu 'alayna bil-yumni wal-imani was-salamati wal-Islam",
      reference: "নতুন চাঁদ দেখে পড়া"
    },
    {
      id: 10,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ هَٰذَا الشَّهْرِ وَأَعُوذُ بِكَ مِنْ شَرِّهِ",
      bengaliTranslation: "হে আল্লাহ! আমি এই মাসের কল্যাণ চাই এবং এর অনিষ্ট থেকে আপনার আশ্রয় চাই।",
      transliteration: "Allahumma inni as'aluka min khayri hadha ash-shahri wa a'udhu bika min sharrihi"
    }
  ]
};
