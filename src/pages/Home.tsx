import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { CircularIconCard } from "@/components/features/CircularIconCard";
import { PrayerHeader } from "@/components/prayer/PrayerHeader";

// Import 3D icon images
import alQuranIcon from "@/assets/icons/al-quran-3d.png";
import audioRecitationIcon from "@/assets/icons/audio-recitation-3d.png";
import duasIcon from "@/assets/icons/duas-3d.png";
import azkarIcon from "@/assets/icons/azkar-3d.png";
import hadithIcon from "@/assets/icons/hadith-3d.png";
import tafsirIcon from "@/assets/icons/tafsir-3d.png";
import islamicBooksIcon from "@/assets/icons/islamic-books-3d.png";
import prayerTimesIcon from "@/assets/icons/prayer-times-3d.png";
import prayerTrackerIcon from "@/assets/icons/prayer-tracker-3d.png";
import zakatCalculatorIcon from "@/assets/icons/zakat-calculator-3d.png";
import islamicAiIcon from "@/assets/icons/islamic-ai-3d.png";
import digitalTasbihIcon from "@/assets/icons/digital-tasbih-3d.png";
import qiblaFinderIcon from "@/assets/icons/qibla-finder-3d.png";

const features = [
  {
    icon: alQuranIcon,
    title: "Al-Quran",
    path: "/surahs",
  },
  {
    icon: audioRecitationIcon,
    title: "Audio Recitation",
    path: "/audio",
  },
  {
    icon: duasIcon,
    title: "Duas",
    path: "/dua",
  },
  {
    icon: azkarIcon,
    title: "Azkar",
    path: "/azkar",
  },
  {
    icon: hadithIcon,
    title: "Hadith",
    path: "/hadith",
  },
  {
    icon: tafsirIcon,
    title: "Tafsir",
    path: "/tafsir",
  },
  {
    icon: islamicBooksIcon,
    title: "Islamic Books",
    path: "/books",
  },
  {
    icon: prayerTimesIcon,
    title: "Prayer Times",
    path: "/calendar",
  },
  {
    icon: prayerTrackerIcon,
    title: "Prayer Tracker",
    path: "/prayer-tracker",
  },
  {
    icon: zakatCalculatorIcon,
    title: "Zakat Calculator",
    path: "/zakat",
  },
  {
    icon: islamicAiIcon,
    title: "Islamic AI",
    path: "/ai",
  },
  {
    icon: digitalTasbihIcon,
    title: "Digital Tasbih",
    path: "/tasbih",
  },
  {
    icon: qiblaFinderIcon,
    title: "Qibla Finder",
    path: "/qibla",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a2818] via-[#0f1f16] to-[#0a1510] pb-20">
      <TopBar title="আল কুরআন" />

      <main className="max-w-lg mx-auto px-6 py-6 space-y-6">
        <PrayerHeader />
        
        {/* 3D Circular Icon Grid */}
        <div className="grid grid-cols-3 gap-6 pt-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="animate-fade-in opacity-0"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
              <CircularIconCard {...feature} />
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
