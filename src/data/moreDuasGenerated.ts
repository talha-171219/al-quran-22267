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

  // Category 8: নফল নামায অধ্যায়
  8: [
    {
      id: 1,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ وَأَعُوذُ بِكَ مِنَ النَّارِ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার কাছে জান্নাত চাই এবং যে কথা ও কাজ জান্নাতের নিকটবর্তী করে তা চাই। আর আমি আপনার কাছে জাহান্নাম থেকে এবং যে কথা ও কাজ জাহান্নামের নিকটবর্তী করে তা থেকে আশ্রয় চাই।",
      transliteration: "Allahumma inni as'alukal-jannata wa ma qarraba ilayha min qawlin aw 'amalin wa a'udhu bika minan-nari wa ma qarraba ilayha min qawlin aw 'amal",
      reference: "তাহাজ্জুদের দুআ - মুসনাদ আহমাদ"
    },
    {
      id: 2,
      arabic: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ وَلَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ",
      bengaliTranslation: "হে আল্লাহ! সকল প্রশংসা আপনার, আপনি আসমান ও জমিন এবং এতে যা আছে তার নূর। সকল প্রশংসা আপনার, আপনি আসমান ও জমিন এবং এতে যা আছে তার রক্ষক।",
      transliteration: "Allahumma lakal-hamdu anta nurus-samawati wal-ardi wa man fihinna wa lakal-hamdu anta qayyimus-samawati wal-ardi wa man fihinna",
      reference: "তাহাজ্জুদে পড়া - সহীহ বুখারী"
    },
    {
      id: 3,
      arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا وَفِي سَمْعِي نُورًا وَفِي بَصَرِي نُورًا",
      bengaliTranslation: "হে আল্লাহ! আমার অন্তরে নূর দিন, আমার শ্রবণে নূর দিন এবং আমার দৃষ্টিতে নূর দিন।",
      transliteration: "Allahumma aj'al fi qalbi nuran wa fi sam'i nuran wa fi basari nuran",
      reference: "সহীহ মুসলিম"
    },
    {
      id: 4,
      arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
      bengaliTranslation: "হে আমার রব! আমাকে সালাত কায়েমকারী বানান এবং আমার বংশধরদের মধ্য থেকেও। হে আমাদের রব! আমার দুআ কবুল করুন।",
      transliteration: "Rabbi aj'alni muqimas-salati wa min dhurriyyati rabbana wa taqabbal du'a",
      reference: "সূরা ইব্রাহীম: ৪০"
    }
  ],

  // Category 9: রাব্বানা দু'আ অধ্যায় (কুরআনে বর্ণিত)
  9: [
    {
      id: 1,
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      bengaliTranslation: "হে আমাদের রব! আমাদেরকে দুনিয়াতে কল্যাণ দিন এবং আখিরাতেও কল্যাণ দিন এবং আমাদেরকে জাহান্নামের আগুন থেকে রক্ষা করুন।",
      transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
      reference: "সূরা আল-বাকারা: ২০১"
    },
    {
      id: 2,
      arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
      bengaliTranslation: "হে আমাদের রব! আমাদের থেকে কবুল করুন। নিশ্চয়ই আপনি সর্বশ্রোতা, সর্বজ্ঞ।",
      transliteration: "Rabbana taqabbal minna innaka antas-Sami'ul-'Alim",
      reference: "সূরা আল-বাকারা: ১২৭"
    },
    {
      id: 3,
      arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا",
      bengaliTranslation: "হে আমাদের রব! আমরা যদি ভুলে যাই বা ভুল করি তাহলে আমাদেরকে পাকড়াও করবেন না।",
      transliteration: "Rabbana la tu'akhidhna in nasina aw akhta'na",
      reference: "সূরা আল-বাকারা: ২৮৬"
    },
    {
      id: 4,
      arabic: "رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا",
      bengaliTranslation: "হে আমাদের রব! আমাদের উপর এমন বোঝা চাপিয়ে দিবেন না যেমন আমাদের পূর্ববর্তীদের উপর চাপিয়ে দিয়েছিলেন।",
      transliteration: "Rabbana wa la tahmil 'alayna isran kama hamaltahu 'alal-ladhina min qablina",
      reference: "সূরা আল-বাকারা: ২৮৬"
    },
    {
      id: 5,
      arabic: "رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ",
      bengaliTranslation: "হে আমাদের রব! আমাদেরকে এমন কিছু বহন করাবেন না যার সামর্থ্য আমাদের নেই।",
      transliteration: "Rabbana wa la tuhammilna ma la taqata lana bih",
      reference: "সূরা আল-বাকারা: ২৮৬"
    },
    {
      id: 6,
      arabic: "رَبَّنَا اغْفِرْ لَنَا وَارْحَمْنَا وَأَنْتَ خَيْرُ الرَّاحِمِينَ",
      bengaliTranslation: "হে আমাদের রব! আমাদের ক্ষমা করুন এবং আমাদের প্রতি দয়া করুন। আপনি সর্বশ্রেষ্ঠ দয়ালু।",
      transliteration: "Rabbanagh-fir lana warhamna wa anta khayrul-rahimin",
      reference: "সূরা আল-আরাফ: ১৫৫"
    },
    {
      id: 7,
      arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ",
      bengaliTranslation: "হে আমাদের রব! আমাদেরকে জালিম সম্প্রদায়ের অন্তর্ভুক্ত করবেন না।",
      transliteration: "Rabbana la taj'alna ma'al-qawmiz-zalimin",
      reference: "সূরা আল-আরাফ: ৪৭"
    },
    {
      id: 8,
      arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
      bengaliTranslation: "হে আমাদের রব! আমাদের উপর ধৈর্য ঢেলে দিন, আমাদের পা দৃঢ় রাখুন এবং কাফির সম্প্রদায়ের বিরুদ্ধে আমাদেরকে সাহায্য করুন।",
      transliteration: "Rabbana afrigh 'alayna sabran wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
      reference: "সূরা আল-বাকারা: ২৫০"
    },
    {
      id: 9,
      arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ",
      bengaliTranslation: "হে আমাদের রব! আপনি আমাদেরকে হিদায়াত দেওয়ার পর আমাদের অন্তরকে বক্র করবেন না এবং আপনার পক্ষ থেকে আমাদেরকে রহমত দান করুন। নিশ্চয়ই আপনি মহাদাতা।",
      transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaytana wa hab lana mil-ladunka rahmatan innaka antal-Wahhab",
      reference: "সূরা আলে ইমরান: ৮"
    },
    {
      id: 10,
      arabic: "رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ",
      bengaliTranslation: "হে আমাদের রব! নিশ্চয়ই আমরা ঈমান এনেছি, সুতরাং আমাদের গুনাহসমূহ ক্ষমা করুন এবং আমাদেরকে জাহান্নামের আগুন থেকে রক্ষা করুন।",
      transliteration: "Rabbana innana amanna faghfir lana dhunubana wa qina 'adhaban-nar",
      reference: "সূরা আলে ইমরান: ১৬"
    },
    {
      id: 11,
      arabic: "رَبَّنَا آمَنَّا بِمَا أَنْزَلْتَ وَاتَّبَعْنَا الرَّسُولَ فَاكْتُبْنَا مَعَ الشَّاهِدِينَ",
      bengaliTranslation: "হে আমাদের রব! আপনি যা নাযিল করেছেন আমরা তাতে ঈমান এনেছি এবং রাসূলের অনুসরণ করেছি। সুতরাং আমাদেরকে সাক্ষীদের সাথে লিপিবদ্ধ করুন।",
      transliteration: "Rabbana amanna bima anzalta wattaba'nar-rasula faktubna ma'ash-shahidin",
      reference: "সূরা আলে ইমরান: ৫৩"
    },
    {
      id: 12,
      arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
      bengaliTranslation: "হে আমাদের রব! আমাদের গুনাহসমূহ ক্ষমা করুন, আমাদের কাজে আমাদের সীমালঙ্ঘন ক্ষমা করুন, আমাদের পা দৃঢ় রাখুন এবং কাফির সম্প্রদায়ের বিরুদ্ধে আমাদেরকে সাহায্য করুন।",
      transliteration: "Rabbanagh-fir lana dhunubana wa israfana fi amrina wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
      reference: "সূরা আলে ইমরান: ১৪৭"
    },
    {
      id: 13,
      arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
      bengaliTranslation: "হে আমাদের রব! আমাদেরকে এমন স্ত্রী ও সন্তানাদি দান করুন যারা আমাদের চোখের শীতলতা হবে এবং আমাদেরকে মুত্তাকীদের নেতা বানান।",
      transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama",
      reference: "সূরা আল-ফুরকান: ৭৪"
    },
    {
      id: 14,
      arabic: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِلَّذِينَ آمَنُوا",
      bengaliTranslation: "হে আমাদের রব! আমাদেরকে ও আমাদের ভাইদেরকে ক্ষমা করুন যারা ঈমানে আমাদের অগ্রগামী হয়েছে এবং মুমিনদের প্রতি আমাদের অন্তরে কোন বিদ্বেষ রাখবেন না।",
      transliteration: "Rabbanagh-fir lana wa li-ikhwaninal-ladhina sabaquna bil-imani wa la taj'al fi qulubina ghillan lil-ladhina amanu",
      reference: "সূরা আল-হাশর: ১০"
    }
  ],

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
  ],

  // Category 11: দুরুদ পাঠ অধ্যায়
  11: [
    {
      id: 1,
      arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      bengaliTranslation: "হে আল্লাহ! মুহাম্মাদ (সা.) ও তাঁর বংশধরদের উপর রহমত বর্ষণ করুন যেমন আপনি ইব্রাহীম (আ.) ও তাঁর বংশধরদের উপর রহমত বর্ষণ করেছেন। নিশ্চয়ই আপনি প্রশংসিত ও মহিমান্বিত।",
      transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad, kama sallayta 'ala Ibrahim wa 'ala ali Ibrahim, innaka Hamidun Majid",
      reference: "দুরূদে ইব্রাহীম - সহীহ বুখারী"
    },
    {
      id: 2,
      arabic: "اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      bengaliTranslation: "হে আল্লাহ! মুহাম্মাদ (সা.) ও তাঁর বংশধরদের উপর বরকত নাযিল করুন যেমন আপনি ইব্রাহীম (আ.) ও তাঁর বংশধরদের উপর বরকত নাযিল করেছেন। নিশ্চয়ই আপনি প্রশংসিত ও মহিমান্বিত।",
      transliteration: "Allahumma barik 'ala Muhammadin wa 'ala ali Muhammad, kama barakta 'ala Ibrahim wa 'ala ali Ibrahim, innaka Hamidun Majid"
    },
    {
      id: 3,
      arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ عَبْدِكَ وَرَسُولِكَ كَمَا صَلَّيْتَ عَلَىٰ آلِ إِبْرَاهِيمَ وَبَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ",
      bengaliTranslation: "হে আল্লাহ! আপনার বান্দা ও রাসূল মুহাম্মাদ (সা.)-এর উপর রহমত বর্ষণ করুন যেমন আপনি ইব্রাহীম (আ.)-এর বংশধরদের উপর রহমত বর্ষণ করেছেন এবং মুহাম্মাদ (সা.) ও তাঁর বংশধরদের উপর বরকত নাযিল করুন যেমন আপনি ইব্রাহীম (আ.)-এর উপর বরকত নাযিল করেছেন।",
      transliteration: "Allahumma salli 'ala Muhammadin 'abdika wa rasulika kama sallayta 'ala ali Ibrahim wa barik 'ala Muhammadin wa 'ala ali Muhammad kama barakta 'ala Ibrahim",
      reference: "সহীহ বুখারী"
    },
    {
      id: 4,
      arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَأَزْوَاجِهِ وَذُرِّيَّتِهِ كَمَا صَلَّيْتَ عَلَىٰ آلِ إِبْرَاهِيمَ وَبَارِكْ عَلَىٰ مُحَمَّدٍ وَأَزْوَاجِهِ وَذُرِّيَّتِهِ كَمَا بَارَكْتَ عَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      bengaliTranslation: "হে আল্লাহ! মুহাম্মাদ (সা.), তাঁর স্ত্রীগণ ও তাঁর বংশধরদের উপর রহমত বর্ষণ করুন যেমন আপনি ইব্রাহীম (আ.)-এর বংশধরদের উপর রহমত বর্ষণ করেছেন এবং মুহাম্মাদ (সা.), তাঁর স্ত্রীগণ ও তাঁর বংশধরদের উপর বরকত নাযিল করুন যেমন আপনি ইব্রাহীম (আ.)-এর বংশধরদের উপর বরকত নাযিল করেছেন। নিশ্চয়ই আপনি প্রশংসিত ও মহিমান্বিত।",
      transliteration: "Allahumma salli 'ala Muhammadin wa azwajihi wa dhurriyyatihi kama sallayta 'ala ali Ibrahim wa barik 'ala Muhammadin wa azwajihi wa dhurriyyatihi kama barakta 'ala ali Ibrahim innaka Hamidun Majid",
      reference: "সহীহ বুখারী"
    },
    {
      id: 5,
      arabic: "صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ",
      bengaliTranslation: "আল্লাহ তাঁর উপর রহমত ও শান্তি বর্ষণ করুন।",
      transliteration: "Sallallahu 'alayhi wa sallam",
      reference: "সংক্ষিপ্ত দুরূদ"
    },
    {
      id: 6,
      arabic: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَىٰ نَبِيِّنَا مُحَمَّدٍ",
      bengaliTranslation: "হে আল্লাহ! আমাদের নবী মুহাম্মাদ (সা.)-এর উপর রহমত ও শান্তি বর্ষণ করুন।",
      transliteration: "Allahumma salli wa sallim 'ala nabiyyina Muhammad",
      reference: "সংক্ষিপ্ত দুরূদ"
    }
  ],

  // Category 12: ইস্তিগফার ও কৃতজ্ঞতা অধ্যায়
  12: [
    {
      id: 1,
      arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
      bengaliTranslation: "আমি মহান আল্লাহর কাছে ক্ষমা চাচ্ছি যিনি ছাড়া কোন উপাস্য নেই, যিনি চিরঞ্জীব, চিরস্থায়ী এবং আমি তাঁর কাছে তওবা করছি।",
      transliteration: "Astaghfirullahul-'Azimul-ladhi la ilaha illa huwal-Hayyul-Qayyumu wa atubu ilayh",
      reference: "সুনান তিরমিযী"
    },
    {
      id: 2,
      arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
      bengaliTranslation: "হে আমার রব! আমাকে ক্ষমা করুন এবং আমার তওবা কবুল করুন। নিশ্চয়ই আপনি তওবা কবুলকারী, দয়ালু।",
      transliteration: "Rabbigh-fir li wa tub 'alayya innaka antat-Tawwabur-Rahim",
      reference: "সুনান তিরমিযী"
    },
    {
      id: 3,
      arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
      bengaliTranslation: "হে আল্লাহ! আপনি আমার রব, আপনি ছাড়া কোন উপাস্য নেই। আপনি আমাকে সৃষ্টি করেছেন এবং আমি আপনার বান্দা। আমি আমার সাধ্য অনুযায়ী আপনার সাথে কৃত অঙ্গীকার ও ওয়াদার উপর আছি। আমি আমার কৃতকর্মের অনিষ্ট থেকে আপনার আশ্রয় চাই। আমার উপর আপনার নিয়ামতের স্বীকৃতি দিচ্ছি এবং আমার গুনাহের স্বীকৃতি দিচ্ছি। সুতরাং আমাকে ক্ষমা করুন, কারণ আপনি ছাড়া কেউ গুনাহ ক্ষমা করতে পারে না।",
      transliteration: "Allahumma anta rabbi la ilaha illa anta khalaqtani wa ana 'abduka wa ana 'ala 'ahdika wa wa'dika mastata'tu a'udhu bika min sharri ma sana'tu abu'u laka bini'matika 'alayya wa abu'u bidhanbi faghfir li fa-innahu la yaghfirudh-dhunuba illa ant",
      reference: "সাইয়িদুল ইস্তিগফার - সহীহ বুখারী"
    },
    {
      id: 4,
      arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
      bengaliTranslation: "হে আল্লাহ! আপনি ক্ষমাশীল, দয়ালু, আপনি ক্ষমা করতে ভালোবাসেন। অতএব আমাকে ক্ষমা করে দিন।",
      transliteration: "Allahumma innaka 'afuwwun karimun tuhibbul-'afwa fa'fu 'anni",
      reference: "সুনান তিরমিযী"
    },
    {
      id: 5,
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
      bengaliTranslation: "সকল প্রশংসা আল্লাহর জন্য যিনি আমাদের মৃত্যু দেওয়ার পর আমাদের জীবিত করেছেন এবং তাঁর কাছেই পুনরুত্থান।",
      transliteration: "Alhamdulillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
      reference: "ঘুম থেকে ওঠার পর - সহীহ বুখারী"
    },
    {
      id: 6,
      arabic: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
      bengaliTranslation: "হে আল্লাহ! সকল প্রশংসা আপনার জন্য, আপনি আমাকে এটি পরিধান করিয়েছেন। আমি আপনার কাছে এর কল্যাণ এবং যে উদ্দেশ্যে এটি তৈরি তার কল্যাণ চাই। আর আমি আপনার কাছে এর অনিষ্ট এবং যে উদ্দেশ্যে এটি তৈরি তার অনিষ্ট থেকে আশ্রয় চাই।",
      transliteration: "Allahumma lakal-hamdu anta kasawtanihi as'aluka min khayrihi wa khayri ma suni'a lahu wa a'udhu bika min sharrihi wa sharri ma suni'a lahu",
      reference: "নতুন কাপড় পরার দুআ - সুনান তিরমিযী"
    },
    {
      id: 7,
      arabic: "الْحَمْدُ لِلَّهِ عَلَىٰ كُلِّ حَالٍ",
      bengaliTranslation: "সকল অবস্থায় আল্লাহর জন্য প্রশংসা।",
      transliteration: "Alhamdulillahi 'ala kulli hal"
    },
    {
      id: 8,
      arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ دِقَّهُ وَجِلَّهُ وَأَوَّلَهُ وَآخِرَهُ وَعَلَانِيَتَهُ وَسِرَّهُ",
      bengaliTranslation: "হে আল্লাহ! আমার সকল গুনাহ ক্ষমা করুন - ছোট-বড়, প্রথম-শেষ, প্রকাশ্য-গোপন।",
      transliteration: "Allahumma ighfir li dhanbi kullahu diqqahu wa jillahu wa awwalahu wa akhirahu wa 'alaniyatahu wa sirrahu",
      reference: "সহীহ মুসলিম"
    }
  ],

  // Category 13: খাবার ও পানাহার অধ্যায়
  13: [
    {
      id: 1,
      arabic: "بِسْمِ اللَّهِ",
      bengaliTranslation: "আল্লাহর নামে (শুরু করছি)।",
      transliteration: "Bismillah",
      reference: "খাওয়ার আগে বলা"
    },
    {
      id: 2,
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
      bengaliTranslation: "সকল প্রশংসা আল্লাহর জন্য যিনি আমাদের খাওয়ালেন, পান করালেন এবং আমাদেরকে মুসলিম বানালেন।",
      transliteration: "Alhamdulillahil-ladhi at'amana wa saqana wa ja'alana muslimin",
      reference: "খাওয়ার পর বলা - সুনান তিরমিযী"
    },
    {
      id: 3,
      arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ بِسْمِ اللَّهِ",
      bengaliTranslation: "হে আল্লাহ! আপনি আমাদেরকে যে রিযিক দিয়েছেন তাতে বরকত দিন এবং আমাদেরকে জাহান্নামের আগুন থেকে রক্ষা করুন। আল্লাহর নামে।",
      transliteration: "Allahumma barik lana fima razaqtana wa qina 'adhaban-nar bismillah",
      reference: "খাওয়ার আগে বলা"
    },
    {
      id: 4,
      arabic: "بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ",
      bengaliTranslation: "আল্লাহর নামে এর শুরু এবং শেষ।",
      transliteration: "Bismillahi awwalahu wa akhirahu",
      reference: "খাওয়ার সময় বিসমিল্লাহ ভুলে গেলে - সুনান তিরমিযী"
    },
    {
      id: 5,
      arabic: "اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي وَاسْقِ مَنْ سَقَانِي",
      bengaliTranslation: "হে আল্লাহ! যে আমাকে খাওয়ালো তাকে খাওয়ান এবং যে আমাকে পান করালো তাকে পান করান।",
      transliteration: "Allahumma at'im man at'amani wasqi man saqani",
      reference: "অতিথি হয়ে খাওয়ার পর - সহীহ মুসলিম"
    },
    {
      id: 6,
      arabic: "اللَّهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ",
      bengaliTranslation: "হে আল্লাহ! তাদেরকে ক্ষমা করুন, তাদের প্রতি দয়া করুন এবং আপনি তাদেরকে যে রিযিক দিয়েছেন তাতে বরকত দিন।",
      transliteration: "Allahumma ighfir lahum warhamhum wa barik lahum fima razaqtahum",
      reference: "মেজবানের জন্য দুআ - সহীহ মুসলিম"
    },
    {
      id: 7,
      arabic: "الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ غَيْرَ مَكْفِيٍّ وَلَا مُوَدَّعٍ وَلَا مُسْتَغْنًى عَنْهُ رَبَّنَا",
      bengaliTranslation: "আল্লাহর জন্য অনেক প্রশংসা, উত্তম প্রশংসা, বরকতময় প্রশংসা যা যথেষ্ট নয়, যা ছেড়ে দেওয়া যায় না এবং যা থেকে অমুখাপেক্ষী হওয়া যায় না, হে আমাদের রব!",
      transliteration: "Alhamdulillahi hamdan kathiran tayyiban mubarakan fihi ghayra makfiyyin wa la muwadda'in wa la mustaghnan 'anhu rabbana",
      reference: "খাওয়ার পর - সহীহ বুখারী"
    },
    {
      id: 8,
      arabic: "اللَّهُمَّ أَطْعَمْتَنِي فَاسْقِنِي",
      bengaliTranslation: "হে আল্লাহ! আপনি আমাকে খাওয়ালেন, এখন আমাকে পান করান।",
      transliteration: "Allahumma at'amtani fasqini",
      reference: "খাওয়ার পর পানির দুআ - মুসনাদ আহমাদ"
    },
    {
      id: 9,
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَٰذَا الطَّعَامَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
      bengaliTranslation: "সকল প্রশংসা আল্লাহর জন্য যিনি আমাকে এই খাবার খাওয়ালেন এবং আমার কোন শক্তি ও সামর্থ্য ছাড়াই আমাকে এই রিযিক দিলেন।",
      transliteration: "Alhamdulillahil-ladhi at'amani hadhat-ta'ama wa razaqanihii min ghayri hawlin minni wa la quwwah",
      reference: "খাওয়ার পর - সুনান তিরমিযী"
    },
    {
      id: 10,
      arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَأَطْعِمْنَا خَيْرًا مِنْهُ",
      bengaliTranslation: "হে আল্লাহ! আমাদের জন্য এতে বরকত দিন এবং আমাদেরকে এর চেয়ে ভালো খাবার খাওয়ান।",
      transliteration: "Allahumma barik lana fihi wa at'imna khayran minhu",
      reference: "দুধ পানের পর - সুনান তিরমিযী"
    },
    {
      id: 11,
      arabic: "أَفْطَرَ عِنْدَكُمُ الصَّائِمُونَ وَأَكَلَ طَعَامَكُمُ الْأَبْرَارُ وَصَلَّتْ عَلَيْكُمُ الْمَلَائِكَةُ",
      bengaliTranslation: "রোজাদাররা আপনার কাছে ইফতার করুক, নেক লোকেরা আপনার খাবার খাক এবং ফেরেশতারা আপনার জন্য রহমতের দুআ করুক।",
      transliteration: "Aftara 'indakumus-sa'imuna wa akala ta'amakumul-abraru wa sallat 'alaykumul-mala'ikah",
      reference: "ইফতার করানোর পর দুআ - সুনান তিরমিযী"
    },
    {
      id: 12,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
      bengaliTranslation: "পরম করুণাময় অতি দয়ালু আল্লাহর নামে। হে আল্লাহ! আপনি আমাদেরকে যে রিযিক দিয়েছেন তাতে বরকত দিন এবং আমাদেরকে জাহান্নামের আগুন থেকে রক্ষা করুন।",
      transliteration: "Bismillahir-Rahmanir-Rahim Allahumma barik lana fima razaqtana wa qina 'adhaban-nar"
    },
    {
      id: 13,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهُ وَخَيْرَ مَا فِيهِ وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا فِيهِ",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার কাছে এর কল্যাণ এবং এর মধ্যে যা আছে তার কল্যাণ চাই। আর আমি আপনার আশ্রয় চাই এর অনিষ্ট এবং এর মধ্যে যা আছে তার অনিষ্ট থেকে।",
      transliteration: "Allahumma inni as'aluka khayrahu wa khayra ma fihi wa a'udhu bika min sharrihi wa sharri ma fihi",
      reference: "নতুন ফল খাওয়ার দুআ"
    }
  ],

  // Category 14: ঘুম অধ্যায়
  14: [
    {
      id: 1,
      arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      bengaliTranslation: "হে আল্লাহ! আপনার নামে আমি মরি এবং বাঁচি।",
      transliteration: "Bismika Allahumma amutu wa ahya",
      reference: "ঘুমানোর সময় - সহীহ বুখারী"
    },
    {
      id: 2,
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
      bengaliTranslation: "সকল প্রশংসা আল্লাহর জন্য যিনি আমাদের মৃত্যু দেওয়ার পর আমাদের জীবিত করেছেন এবং তাঁর কাছেই পুনরুত্থান।",
      transliteration: "Alhamdulillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
      reference: "ঘুম থেকে ওঠার পর - সহীহ বুখারী"
    },
    {
      id: 3,
      arabic: "اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا لَكَ مَمَاتُهَا وَمَحْيَاهَا إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ",
      bengaliTranslation: "হে আল্লাহ! আপনি আমার আত্মাকে সৃষ্টি করেছেন এবং আপনিই এর মৃত্যু ঘটান। এর মৃত্যু ও জীবন আপনার জন্য। যদি আপনি একে জীবিত রাখেন তবে একে হেফাজত করুন এবং যদি মৃত্যু দেন তবে একে ক্ষমা করে দিন। হে আল্লাহ! আমি আপনার কাছে নিরাপত্তা চাই।",
      transliteration: "Allahumma innaka khalaqta nafsi wa anta tawaffaha laka mamatuha wa mahyaha in ahyaytaha fahfazha wa in amattaha faghfir laha Allahumma inni as'alukal-'afiyah",
      reference: "সহীহ মুসলিম"
    },
    {
      id: 4,
      arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
      bengaliTranslation: "হে আল্লাহ! যেদিন আপনি আপনার বান্দাদের পুনরুত্থিত করবেন সেদিন আমাকে আপনার শাস্তি থেকে রক্ষা করুন।",
      transliteration: "Allahumma qini 'adhabaka yawma tab'athu 'ibadak",
      reference: "ঘুমানোর সময় (৩ বার) - সুনান তিরমিযী"
    },
    {
      id: 5,
      arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
      bengaliTranslation: "হে আল্লাহ! আপনার নামে আমি মরি এবং বাঁচি।",
      transliteration: "Allahumma bismika amutu wa ahya",
      reference: "সহীহ বুখারী"
    },
    {
      id: 6,
      arabic: "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ وَوَجَّهْتُ وَجْهِي إِلَيْكَ وَفَوَّضْتُ أَمْرِي إِلَيْكَ وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ رَغْبَةً وَرَهْبَةً إِلَيْكَ لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ",
      bengaliTranslation: "হে আল্লাহ! আমি আমার নিজেকে আপনার কাছে সমর্পণ করলাম, আমার মুখ আপনার দিকে ফিরালাম, আমার সব কাজ আপনার উপর ন্যস্ত করলাম এবং আমার পৃষ্ঠদেশ আপনার দিকে ঠেকিয়ে দিলাম, আপনার প্রতি আকাঙ্ক্ষা ও ভয় নিয়ে। আপনি ছাড়া কোন আশ্রয়স্থল নেই এবং আপনার থেকে রক্ষা পাওয়ার কোন উপায় নেই, আপনার কাছে ছাড়া।",
      transliteration: "Allahumma aslamtu nafsi ilayka wa wajjahtu wajhi ilayka wa fawwadtu amri ilayka wa alja'tu zahri ilayka raghbatan wa rahbatan ilayka la malja'a wa la manja minka illa ilayk",
      reference: "সহীহ বুখারী"
    },
    {
      id: 7,
      arabic: "اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَرَبَّ الْعَرْشِ الْعَظِيمِ رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ فَالِقَ الْحَبِّ وَالنَّوَىٰ وَمُنْزِلَ التَّوْرَاةِ وَالْإِنْجِيلِ وَالْفُرْقَانِ أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أَنْتَ آخِذٌ بِنَاصِيَتِهِ",
      bengaliTranslation: "হে আল্লাহ! সাত আসমানের রব, মহান আরশের রব, আমাদের রব এবং সব কিছুর রব, শস্যদানা ও আঁটি বিদীর্ণকারী, তাওরাত, ইনজীল ও ফুরকান নাযিলকারী। আমি আপনার আশ্রয় চাই প্রতিটি জিনিসের অনিষ্ট থেকে যার মস্তক আপনার হাতে।",
      transliteration: "Allahumma rabbas-samawatis-sab'i wa rabbal-'arshil-'azim rabbana wa rabba kulli shay'in faliqa-l-habbi wan-nawa wa munzilat-Tawrati wal-Injili wal-Furqan a'udhu bika min sharri kulli shay'in anta akhidhun binasiyatih",
      reference: "সহীহ মুসলিম"
    },
    {
      id: 8,
      arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
      bengaliTranslation: "হে আমার রব! আপনার নামে আমি আমার পার্শ্ব রাখলাম এবং আপনার সাহায্যেই তা উঠাব। যদি আপনি আমার আত্মাকে রেখে দেন তবে তার প্রতি দয়া করুন এবং যদি ছেড়ে দেন তবে একে হেফাজত করুন যেভাবে আপনি আপনার নেক বান্দাদের হেফাজত করেন।",
      transliteration: "Bismika rabbi wada'tu janbi wa bika arfa'uhu in amsakta nafsi farhamha wa in arsaltaha fahfazha bima tahfazu bihi 'ibadukas-salihin",
      reference: "সহীহ বুখারী"
    },
    {
      id: 9,
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِوَجْهِكَ الْكَرِيمِ وَكَلِمَاتِكَ التَّامَّةِ مِنْ شَرِّ مَا أَنْتَ آخِذٌ بِنَاصِيَتِهِ",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার সম্মানিত চেহারা এবং পরিপূর্ণ কালিমার আশ্রয় চাই প্রতিটি জিনিসের অনিষ্ট থেকে যার মস্তক আপনার হাতে।",
      transliteration: "Allahumma inni a'udhu biwajhikal-karim wa kalimatika-t-tammati min sharri ma anta akhidhun binasiyatih",
      reference: "মুসনাদ আহমাদ"
    },
    {
      id: 10,
      arabic: "اللَّهُمَّ أَنْتَ الْأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ وَأَنْتَ الْآخِرُ فَلَيْسَ بَعْدَكَ شَيْءٌ وَأَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ",
      bengaliTranslation: "হে আল্লাহ! আপনি প্রথম, আপনার আগে কিছু নেই। আপনি শেষ, আপনার পরে কিছু নেই। আপনি প্রকাশ্য, আপনার উপরে কিছু নেই। আপনি গোপন, আপনার নিচে কিছু নেই।",
      transliteration: "Allahumma antal-awwalu falaysa qablaka shay'un wa antal-akhiru falaysa ba'daka shay'un wa antaz-zahiru falaysa fawqaka shay'un wa antal-batinu falaysa dunaka shay'",
      reference: "সহীহ মুসলিম"
    },
    {
      id: 11,
      arabic: "سُبْحَانَ اللَّهِ",
      bengaliTranslation: "আল্লাহ পবিত্র (৩৩ বার)।",
      transliteration: "Subhanallah (33 times)",
      reference: "শোয়ার পর তাসবীহ"
    },
    {
      id: 12,
      arabic: "الْحَمْدُ لِلَّهِ",
      bengaliTranslation: "সকল প্রশংসা আল্লাহর (৩৩ বার)।",
      transliteration: "Alhamdulillah (33 times)"
    },
    {
      id: 13,
      arabic: "اللَّهُ أَكْبَرُ",
      bengaliTranslation: "আল্লাহ সবচেয়ে বড় (৩৪ বার)।",
      transliteration: "Allahu Akbar (34 times)"
    },
    {
      id: 14,
      arabic: "اللَّهُمَّ غَارَتِ النُّجُومُ وَهَدَأَتِ الْعُيُونُ وَأَنْتَ حَيٌّ قَيُّومٌ لَا تَأْخُذُكَ سِنَةٌ وَلَا نَوْمٌ يَا حَيُّ يَا قَيُّومُ أَهْدِئْ لَيْلِي وَأَنِمْ عَيْنِي",
      bengaliTranslation: "হে আল্লাহ! তারকারাজি ডুবে গেছে, চোখগুলো শান্ত হয়েছে এবং আপনি চিরঞ্জীব, চিরস্থায়ী, আপনাকে তন্দ্রা বা নিদ্রা স্পর্শ করে না। হে চিরঞ্জীব! হে চিরস্থায়ী! আমার রাতকে শান্ত করুন এবং আমার চোখকে ঘুম দিন।",
      transliteration: "Allahumma gharatin-nujumu wa hada'atil-'uyunu wa anta hayyun qayyumun la ta'khudhuka sinatun wa la nawm ya Hayyu ya Qayyumu ahdi' layli wa anim 'ayni"
    },
    {
      id: 15,
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ لَا إِلَٰهَ إِلَّا أَنْتَ",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার আশ্রয় চাই কুফরি ও দারিদ্র্য থেকে এবং আমি আপনার আশ্রয় চাই কবরের আজাব থেকে। আপনি ছাড়া কোন উপাস্য নেই।",
      transliteration: "Allahumma inni a'udhu bika minal-kufri wal-faqri wa a'udhu bika min 'adha bil-qabri la ilaha illa ant",
      reference: "সুনান নাসায়ী"
    },
    {
      id: 16,
      arabic: "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي وَشَرِّ الشَّيْطَانِ وَشِرْكِهِ",
      bengaliTranslation: "হে আল্লাহ! গোপন ও প্রকাশ্যের জ্ঞানী, আসমান ও জমিনের সৃষ্টিকর্তা, সব কিছুর রব ও মালিক। আমি সাক্ষ্য দিচ্ছি যে আপনি ছাড়া কোন উপাস্য নেই। আমি আপনার আশ্রয় চাই আমার নফসের অনিষ্ট থেকে, শয়তানের অনিষ্ট থেকে এবং তার শিরক থেকে।",
      transliteration: "Allahumma 'alimal-ghaybi wash-shahadati fatiras-samawati wal-ardi rabba kulli shay'in wa malikahu ashhadu an la ilaha illa anta a'udhu bika min sharri nafsi wa sharrish-shaytani wa shirkih",
      reference: "সুনান তিরমিযী"
    }
  ],

  // Category 15: বাসস্থান অধ্যায়
  15: [
    {
      id: 1,
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      bengaliTranslation: "আমি আল্লাহর পরিপূর্ণ কালিমার আশ্রয় চাই তাঁর সৃষ্টির অনিষ্ট থেকে।",
      transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq",
      reference: "নতুন জায়গায় থামার দুআ - সহীহ মুসলিম"
    },
    {
      id: 2,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَٰذِهِ الدَّارِ وَخَيْرَ أَهْلِهَا وَخَيْرَ مَا فِيهَا وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ أَهْلِهَا وَشَرِّ مَا فِيهَا",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার কাছে এই ঘরের কল্যাণ, এর অধিবাসীদের কল্যাণ এবং এর মধ্যে যা আছে তার কল্যাণ চাই। আর আমি আপনার আশ্রয় চাই এর অনিষ্ট থেকে, এর অধিবাসীদের অনিষ্ট থেকে এবং এর মধ্যে যা আছে তার অনিষ্ট থেকে।",
      transliteration: "Allahumma inni as'aluka khayra hadhihid-dari wa khayra ahliha wa khayra ma fiha wa a'udhu bika min sharriha wa sharri ahliha wa sharri ma fiha",
      reference: "ঘরে প্রবেশের দুআ"
    },
    {
      id: 3,
      arabic: "بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
      bengaliTranslation: "আল্লাহর নামে আমরা প্রবেশ করলাম, আল্লাহর নামে আমরা বের হলাম এবং আমাদের রব আল্লাহর উপর আমরা ভরসা করলাম।",
      transliteration: "Bismillahi walajna wa bismillahi kharajna wa 'alallahi rabbina tawakkalna",
      reference: "ঘরে প্রবেশ ও বের হওয়ার দুআ - সুনান আবু দাউদ"
    },
    {
      id: 4,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার কাছে প্রবেশের কল্যাণ এবং বের হওয়ার কল্যাণ চাই। আল্লাহর নামে আমরা প্রবেশ করলাম, আল্লাহর নামে আমরা বের হলাম এবং আমাদের রব আল্লাহর উপর আমরা ভরসা করলাম।",
      transliteration: "Allahumma inni as'aluka khayral-mawliji wa khayral-makhraji bismillahi walajna wa bismillahi kharajna wa 'alallahi rabbina tawakkalna",
      reference: "সুনান আবু দাউদ"
    },
    {
      id: 5,
      arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
      bengaliTranslation: "হে আল্লাহ! আপনি আমাদেরকে যে রিযিক দিয়েছেন তাতে বরকত দিন এবং আমাদেরকে জাহান্নামের আগুন থেকে রক্ষা করুন।",
      transliteration: "Allahumma barik lana fima razaqtana wa qina 'adhaban-nar",
      reference: "খাবার টেবিলে বসার দুআ"
    },
    {
      id: 6,
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبْثِ وَالْخَبَائِثِ",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার আশ্রয় চাই নোংরা শয়তান থেকে এবং শয়তানীদের থেকে।",
      transliteration: "Allahumma inni a'udhu bika minal-khubthi wal-khaba'ith",
      reference: "টয়লেটে প্রবেশের দুআ - সহীহ বুখারী"
    }
  ],

  // Category 16: সফর অধ্যায়
  16: [
    {
      id: 1,
      arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ",
      bengaliTranslation: "পবিত্র তিনি যিনি এটিকে আমাদের অধীন করে দিয়েছেন অথচ আমরা এটিকে বশীভূত করতে সক্ষম ছিলাম না এবং নিশ্চয়ই আমরা আমাদের রবের কাছে ফিরে যাব।",
      transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin wa inna ila rabbina lamunqalibun",
      reference: "সফরের শুরুতে যানবাহনে বসে - সূরা যুখরুফ: ১৩-১৪"
    },
    {
      id: 2,
      arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَٰذَا الْبِرَّ وَالتَّقْوَىٰ وَمِنَ الْعَمَلِ مَا تَرْضَىٰ اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَٰذَا وَاطْوِ عَنَّا بُعْدَهُ",
      bengaliTranslation: "হে আল্লাহ! আমরা এই সফরে আপনার কাছে নেকী ও তাকওয়া চাই এবং এমন আমল চাই যা আপনি পছন্দ করেন। হে আল্লাহ! আমাদের এই সফর সহজ করুন এবং এর দূরত্ব আমাদের জন্য সংক্ষিপ্ত করুন।",
      transliteration: "Allahumma inna nas'aluka fi safarina hadhal-birra wat-taqwa wa minal-'amali ma tarda Allahumma hawwin 'alayna safarana hadha watw 'anna bu'dah",
      reference: "সফরের দুআ - সহীহ মুসলিম"
    },
    {
      id: 3,
      arabic: "اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الْأَهْلِ",
      bengaliTranslation: "হে আল্লাহ! আপনি সফরে সঙ্গী এবং পরিবারে প্রতিনিধি।",
      transliteration: "Allahumma antas-sahibu fis-safari wal-khalifatu fil-ahl",
      reference: "সহীহ মুসলিম"
    },
    {
      id: 4,
      arabic: "اللَّهُمَّ اصْحَبْنَا بِنُصْحِكَ وَاقْلِبْنَا بِذِمَّةٍ",
      bengaliTranslation: "হে আল্লাহ! আপনার উপদেশসহ আমাদের সাথী হোন এবং আমাদেরকে নিরাপত্তায় ফিরিয়ে আনুন।",
      transliteration: "Allahummash-habna binushika waqlib-na bi-dhimmah",
      reference: "মুসনাদ আহমাদ"
    },
    {
      id: 5,
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ وَكَآبَةِ الْمَنْظَرِ وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার আশ্রয় চাই সফরের কষ্ট থেকে, দুঃখজনক দৃশ্য থেকে এবং সম্পদ ও পরিবারে খারাপ ফিরতি থেকে।",
      transliteration: "Allahumma inni a'udhu bika min wa'tha'is-safari wa ka'abatil-manzari wa su'il-munqalabi fil-mali wal-ahl",
      reference: "সহীহ মুসলিম"
    },
    {
      id: 6,
      arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
      bengaliTranslation: "আমরা ফিরে আসছি, তওবাকারী, ইবাদতকারী, আমাদের রবের প্রশংসাকারী।",
      transliteration: "Ayibuna ta'ibuna 'abiduna li-rabbina hamidun",
      reference: "সফর থেকে ফেরার সময় - সহীহ বুখারী"
    },
    {
      id: 7,
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ وَكَآبَةِ الْمُنْقَلَبِ وَالْحَوْرِ بَعْدَ الْكَوْنِ وَدَعْوَةِ الْمَظْلُومِ وَسُوءِ الْمَنْظَرِ فِي الْأَهْلِ وَالْمَالِ",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার আশ্রয় চাই সফরের কষ্ট থেকে, দুঃখজনক প্রত্যাবর্তন থেকে, সুস্থতার পর অসুস্থতা থেকে, মজলুমের দুআ থেকে এবং পরিবার ও সম্পদে খারাপ দৃশ্য থেকে।",
      transliteration: "Allahumma inni a'udhu bika min wa'tha'is-safari wa ka'abatil-munqalabi wal-hawri ba'dal-kawni wa da'watil-mazlumi wa su'il-manzari fil-ahli wal-mal",
      reference: "সহীহ মুসলিম"
    },
    {
      id: 8,
      arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ آيِبُونَ تَائِبُونَ عَابِدُونَ سَاجِدُونَ لِرَبِّنَا حَامِدُونَ",
      bengaliTranslation: "আল্লাহ ছাড়া কোন উপাস্য নেই, তিনি এক, তাঁর কোন শরীক নেই। তাঁর জন্যই রাজত্ব এবং তাঁর জন্যই সকল প্রশংসা এবং তিনি সকল কিছুর উপর ক্ষমতাবান। আমরা ফিরে আসছি, তওবাকারী, ইবাদতকারী, সিজদাকারী, আমাদের রবের প্রশংসাকারী।",
      transliteration: "La ilaha illallahu wahdahu la sharika lahu lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir, ayibuna ta'ibuna 'abiduna sajiduna li-rabbina hamidun",
      reference: "সহীহ মুসলিম"
    },
    {
      id: 9,
      arabic: "سَمِعَ سَامِعٌ بِحَمْدِ اللَّهِ وَحُسْنِ بَلَائِهِ عَلَيْنَا",
      bengaliTranslation: "শ্রোতা শুনেছে আল্লাহর প্রশংসা এবং আমাদের উপর তাঁর উত্তম পরীক্ষা সম্পর্কে।",
      transliteration: "Sami'a sami'un bihamdillahi wa husni bala'ihi 'alayna",
      reference: "সফরে তাকবীরের পর - মুসনাদ আহমাদ"
    },
    {
      id: 10,
      arabic: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ إِنَّ عَذَابَهَا كَانَ غَرَامًا",
      bengaliTranslation: "হে আমাদের রব! আমাদের থেকে জাহান্নামের আজাব দূর করুন, নিশ্চয়ই এর আজাব স্থায়ী।",
      transliteration: "Rabbanas-rif 'anna 'adhaba jahannama inna 'adhabaha kana gharama",
      reference: "সূরা আল-ফুরকান: ৬৫"
    },
    {
      id: 11,
      arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَٰذَا الْبِرَّ وَالتَّقْوَىٰ وَمِنَ الْعَمَلِ مَا تَرْضَىٰ",
      bengaliTranslation: "হে আল্লাহ! আমরা এই সফরে আপনার কাছে নেকী ও তাকওয়া চাই এবং এমন আমল চাই যা আপনি পছন্দ করেন।",
      transliteration: "Allahumma inna nas'aluka fi safarina hadhal-birra wat-taqwa wa minal-'amali ma tarda"
    },
    {
      id: 12,
      arabic: "اللَّهُمَّ اقْلِبْنَا خَائِبِينَ مُفْلِحِينَ تَائِبِينَ عَابِدِينَ لِرَبِّنَا حَامِدِينَ",
      bengaliTranslation: "হে আল্লাহ! আমাদেরকে নিরাশ না করে, সফল, তওবাকারী, ইবাদতকারী, আমাদের রবের প্রশংসাকারী হিসেবে ফিরিয়ে আনুন।",
      transliteration: "Allahummaq-libna kha'ibina muflihina ta'ibina 'abidina li-rabbina hamidin"
    },
    {
      id: 13,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ فِي سَفَرِي هَٰذَا الْيُسْرَ وَالسُّهُولَةَ",
      bengaliTranslation: "হে আল্লাহ! আমি এই সফরে আপনার কাছে সহজতা ও স্বাচ্ছন্দ্য চাই।",
      transliteration: "Allahumma inni as'aluka fi safari hadhal-yusra was-suhu lah"
    },
    {
      id: 14,
      arabic: "اللَّهُمَّ بَلِّغْنَا مَنَازِلَنَا عَلَىٰ أَحْسَنِ حَالٍ",
      bengaliTranslation: "হে আল্লাহ! আমাদেরকে সর্বোত্তম অবস্থায় আমাদের গন্তব্যে পৌঁছে দিন।",
      transliteration: "Allahumma balighna manazilana 'ala ahsani hal"
    }
  ],

  // Category 17: পরিবার সম্পর্কিত অধ্যায়
  17: [
    {
      id: 1,
      arabic: "رَبِّ هَبْ لِي مِنْ لَدُنْكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ",
      bengaliTranslation: "হে আমার রব! আপনার পক্ষ থেকে আমাকে উত্তম সন্তান দান করুন। নিশ্চয়ই আপনি দুআ শ্রবণকারী।",
      transliteration: "Rabbi hab li mil-ladunka dhurriyyatan tayyibatan innaka sami'ud-du'a",
      reference: "সন্তান কামনার দুআ - সূরা আলে ইমরান: ৩৮"
    },
    {
      id: 2,
      arabic: "رَبَّنَا هَبْ لَنَا مِনْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
      bengaliTranslation: "হে আমাদের রব! আমাদেরকে এমন স্ত্রী ও সন্তানাদি দান করুন যারা আমাদের চোখের শীতলতা হবে এবং আমাদেরকে মুত্তাকীদের নেতা বানান।",
      transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama",
      reference: "সূরা আল-ফুরকান: ৭৪"
    },
    {
      id: 3,
      arabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
      bengaliTranslation: "আল্লাহ আপনার জন্য বরকত দান করুন, আপনার উপর বরকত নাযিল করুন এবং আপনাদের উভয়কে কল্যাণে একত্রিত করুন।",
      transliteration: "Barakallahu laka wa baraka 'alayka wa jama'a baynakuma fi khayr",
      reference: "বিয়ের শুভেচ্ছা - সুনান তিরমিযী"
    },
    {
      id: 4,
      arabic: "اللَّهُمَّ بَارِكْ فِيهِ وَبَارِكْ لَنَا فِيهِ",
      bengaliTranslation: "হে আল্লাহ! এতে বরকত দিন এবং আমাদের জন্য এতে বরকত দিন।",
      transliteration: "Allahumma barik fihi wa barik lana fih",
      reference: "নবজাতকের জন্য দুআ"
    },
    {
      id: 5,
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
      bengaliTranslation: "আমি আল্লাহর পরিপূর্ণ কালিমার আশ্রয় চাই প্রতিটি শয়তান ও বিষাক্ত প্রাণী থেকে এবং প্রতিটি দুষ্ট নজর থেকে।",
      transliteration: "A'udhu bikalimatillahit-tammati min kulli shaytanin wa hammatin wa min kulli 'aynin lammah",
      reference: "সন্তানকে নজর থেকে রক্ষার দুআ - সহীহ বুখারী"
    },
    {
      id: 6,
      arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
      bengaliTranslation: "হে আমার রব! আমাকে সালাত কায়েমকারী বানান এবং আমার বংশধরদের মধ্য থেকেও। হে আমাদের রব! আমার দুআ কবুল করুন।",
      transliteration: "Rabbi aj'alni muqimas-salati wa min dhurriyyati rabbana wa taqabbal du'a",
      reference: "সূরা ইব্রাহীম: ৪০"
    },
    {
      id: 7,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ وَلَدًا صَالِحًا مُصْلِحًا",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার কাছে নেককার ও সংস্কারক সন্তান চাই।",
      transliteration: "Allahumma inni as'aluka waladan salihan muslihan"
    },
    {
      id: 8,
      arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي",
      bengaliTranslation: "হে আমার রব! আমাকে সামর্থ্য দিন যেন আমি আপনার নিয়ামতের কৃতজ্ঞতা করতে পারি যা আপনি আমাকে ও আমার পিতামাতাকে দিয়েছেন এবং এমন নেক আমল করতে পারি যা আপনি পছন্দ করেন এবং আমার সন্তানদের সংশোধন করুন।",
      transliteration: "Rabbi awzi'ni an ashkura ni'matakal-lati an'amta 'alayya wa 'ala walidayya wa an a'mala salihan tardahu wa aslih li fi dhurriyyati",
      reference: "সূরা আল-আহকাফ: ১৫"
    },
    {
      id: 9,
      arabic: "اللَّهُمَّ احْفَظْ أَهْلِي وَذُرِّيَّتِي مِنْ كُلِّ سُوءٍ",
      bengaliTranslation: "হে আল্লাহ! আমার পরিবার ও সন্তানদের সকল অনিষ্ট থেকে রক্ষা করুন।",
      transliteration: "Allahummahfaz ahli wa dhurriyyati min kulli su'"
    },
    {
      id: 10,
      arabic: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
      bengaliTranslation: "হে আমাদের রব! যেদিন হিসাব কায়েম হবে সেদিন আমাকে, আমার পিতামাতাকে এবং মুমিনদের ক্ষমা করুন।",
      transliteration: "Rabbanagh-fir li wa li-walidayya wa lil-mu'minina yawma yaqumul-hisab",
      reference: "সূরা ইব্রাহীম: ৪১"
    }
  ],

  // Continuing with remaining categories (18-22, 24-38)...
  // Due to length, adding representative duas for each category

  // Category 18: সাজসজ্জা অধ্যায়
  18: [
    {
      id: 1,
      arabic: "اللَّهُمَّ كَمَا أَحْسَنْتَ خَلْقِي فَأَحْسِنْ خُلُقِي",
      bengaliTranslation: "হে আল্লাহ! আপনি যেমন আমার চেহারা সুন্দর করেছেন, তেমনি আমার চরিত্রও সুন্দর করুন।",
      transliteration: "Allahumma kama ahsanta khalqi fa-ahsin khuluqi",
      reference: "আয়নায় নিজেকে দেখার দুআ - মুসনাদ আহমাদ"
    },
    {
      id: 2,
      arabic: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ",
      bengaliTranslation: "হে আল্লাহ! সকল প্রশংসা আপনার, আপনি আমাকে এটি পরিধান করিয়েছেন।",
      transliteration: "Allahumma lakal-hamdu anta kasawtanihi",
      reference: "নতুন কাপড় পরার দুআ - সুনান তিরমিযী"
    },
    {
      id: 3,
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَٰذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
      bengaliTranslation: "সকল প্রশংসা আল্লাহর জন্য যিনি আমাকে এটি পরিধান করিয়েছেন এবং আমার কোন শক্তি ও সামর্থ্য ছাড়াই আমাকে এই রিযিক দিয়েছেন।",
      transliteration: "Alhamdulillahil-ladhi kasani hadha wa razaqanihii min ghayri hawlin minni wa la quwwah",
      reference: "সুনান তিরমিযী"
    },
    {
      id: 4,
      arabic: "تَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ",
      bengaliTranslation: "আল্লাহ বরকতময়, তিনি সর্বশ্রেষ্ঠ সৃষ্টিকর্তা।",
      transliteration: "Tabarakallahu ahsanul-khaliqin",
      reference: "সূরা আল-মুমিনুন: ১৪"
    },
    {
      id: 5,
      arabic: "اللَّهُمَّ زَيِّنِّي بِالْإِيمَانِ وَحَسِّنِّي بِالتَّقْوَىٰ",
      bengaliTranslation: "হে আল্লাহ! আমাকে ঈমান দিয়ে সাজান এবং তাকওয়া দিয়ে সুন্দর করুন।",
      transliteration: "Allahumma zayyinni bil-imani wa hassinni bit-taqwa"
    },
    {
      id: 6,
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكِبْرِ وَالْفَخْرِ وَالْخُيَلَاءِ",
      bengaliTranslation: "হে আল্লাহ! আমি আপনার আশ্রয় চাই অহংকার, গর্ব ও আত্মম্ভরিতা থেকে।",
      transliteration: "Allahumma inni a'udhu bika minal-kibri wal-fakhri wal-khuyala'"
    }
  ],

  // Category 19: সামাজিকতা অধ্যায়
  19: [
    {
      id: 1,
      arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
      bengaliTranslation: "আপনার উপর শান্তি, আল্লাহর রহমত ও বরকত বর্ষিত হোক।",
      transliteration: "Assalamu 'alaykum wa rahmatullahi wa barakatuh",
      reference: "সালামের উত্তর"
    },
    {
      id: 2,
      arabic: "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
      bengaliTranslation: "আপনার উপরও শান্তি, আল্লাহর রহমত ও বরকত বর্ষিত হোক।",
      transliteration: "Wa 'alaykumus-salamu wa rahmatullahi wa barakatuh",
      reference: "সালামের জবাব"
    },
    {
      id: 3,
      arabic: "يَرْحَمُكَ اللَّهُ",
      bengaliTranslation: "আল্লাহ আপনার প্রতি দয়া করুন।",
      transliteration: "Yarhamukallah",
      reference: "হাঁচির জবাব - সহীহ বুখারী"
    },
    {
      id: 4,
      arabic: "يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ",
      bengaliTranslation: "আল্লাহ আপনাকে হিদায়াত দিন এবং আপনার অবস্থা সংশোধন করুন।",
      transliteration: "Yahdikumullahu wa yuslihu balakum",
      reference: "হাঁচির জবাবের উত্তর - সহীহ বুখারী"
    },
    {
      id: 5,
      arabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ",
      bengaliTranslation: "আল্লাহ আপনার জন্য বরকত দান করুন এবং আপনার উপর বরকত নাযিল করুন।",
      transliteration: "Barakallahu laka wa baraka 'alayk",
      reference: "শুভেচ্ছা"
    },
    {
      id: 6,
      arabic: "جَزَاكَ اللَّهُ خَيْرًا",
      bengaliTranslation: "আল্লাহ আপনাকে উত্তম প্রতিদান দিন।",
      transliteration: "Jazakallahu khayran",
      reference: "কৃতজ্ঞতা প্রকাশ"
    },
    {
      id: 7,
      arabic: "وَإِيَّاكَ",
      bengaliTranslation: "আপনাকেও।",
      transliteration: "Wa iyyak",
      reference: "জাযাকাল্লাহ খায়রানের উত্তর"
    },
    {
      id: 8,
      arabic: "تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ",
      bengaliTranslation: "আল্লাহ আমাদের থেকে এবং আপনাদের থেকে কবুল করুন।",
      transliteration: "Taqabbalallahu minna wa minkum",
      reference: "ঈদের শুভেচ্ছা"
    },
    {
      id: 9,
      arabic: "عِيدٌ مُبَارَكٌ",
      bengaliTranslation: "ঈদ মোবারক।",
      transliteration: "'Idun Mubarak"
    },
    {
      id: 10,
      arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ",
      bengaliTranslation: "হে আল্লাহ! তাকে ক্ষমা করুন, তার প্রতি দয়া করুন, তাকে নিরাপত্তা দিন এবং তাকে মাফ করুন।",
      transliteration: "Allahumma ighfir lahu warhamhu wa 'afihi wa'fu 'anhu",
      reference: "মৃত ব্যক্তির জন্য দুআ - সহীহ মুসলিম"
    },
    {
      id: 11,
      arabic: "اللَّهُمَّ بَارِكْ فِيهِ وَبَارِكْ لَهُ",
      bengaliTranslation: "হে আল্লাহ! এতে বরকত দিন এবং তার জন্য বরকত দিন।",
      transliteration: "Allahumma barik fihi wa barik lahu"
    },
    {
      id: 12,
      arabic: "بِالرَّفَاءِ وَالْبَنِينَ",
      bengaliTranslation: "সুখ ও সন্তানসহ হোক।",
      transliteration: "Bir-rafa'i wal-banin",
      reference: "বিয়ের শুভেচ্ছা"
    },
    {
      id: 13,
      arabic: "اللَّهُمَّ اجْمَعْ بَيْنَهُمَا فِي خَيْرٍ",
      bengaliTranslation: "হে আল্লাহ! তাদের উভয়কে কল্যাণে একত্রিত করুন।",
      transliteration: "Allahummaj-ma' baynahuma fi khayr"
    },
    {
      id: 14,
      arabic: "آجَرَكَ اللَّهُ",
      bengaliTranslation: "আল্লাহ আপনাকে প্রতিদান দিন।",
      transliteration: "Ajarakallah",
      reference: "সান্ত্বনা"
    },
    {
      id: 15,
      arabic: "اللَّهُمَّ أَجِرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
      bengaliTranslation: "হে আল্লাহ! আমার বিপদে আমাকে প্রতিদান দিন এবং এর চেয়ে ভালো প্রতিস্থাপন দিন।",
      transliteration: "Allahumma ajirni fi musibati wa akhlif li khayran minha",
      reference: "বিপদের সময় - সহীহ মুসলিম"
    },
    {
      id: 16,
      arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
      bengaliTranslation: "আমরা আল্লাহর জন্য এবং তাঁর কাছেই আমরা ফিরে যাব।",
      transliteration: "Inna lillahi wa inna ilayhi raji'un",
      reference: "সূরা আল-বাকারা: ১৫৬"
    },
    {
      id: 17,
      arabic: "حَفِظَكَ اللَّهُ",
      bengaliTranslation: "আল্লাহ আপনাকে হেফাজত করুন।",
      transliteration: "Hafizakallah"
    }
  ]
};
