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
import fastingTrackerIcon from "@/assets/icons/fasting-tracker-3d.png";
import { NasheedSection } from "@/components/gojol/NasheedSection"; // Import the new component
import FeatureCards from "@/components/home/FeatureCards";

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
    icon: fastingTrackerIcon,
    title: "Fasting Tracker",
    path: "/fasting/tracker",
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
    <div className="min-h-screen bg-background dark:bg-gradient-to-b dark:from-[#0a2818] dark:via-[#0f1f16] dark:to-[#0a1510] pb-20">
      <TopBar title="DeenSphereX" />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <PrayerHeader className="mx-0.5" />
        
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

        {/* Feature cards (big left + two stacked right) */}
        <FeatureCards />

        {/* Arabic Nasheed Section */}
        {/* Islamic Lectures Section */}
        <NasheedSection
          title="Islamic Lectures"
          subtitle="Short lectures and talks — click to explore speakers"
          imageSrc={[
            'https://i.postimg.cc/Y2ghd5qq/hq720-(1).jpg',
            'https://i.postimg.cc/Qx8hcwFQ/hq720-(2)-(1).jpg',
          ]}
          imageAlt="Islamic Lectures"
          linkPath="/lectures"
          linkLabel="Explore Lectures"
        />

        {/* Arabic Nasheed removed from here — will show a Shorts-style card at the bottom of the page */}
          {/* Premium Nasheed Section removed — using redesigned Arabic Nasheed page instead */}

        {/* Short-style Arabic Nasheed (Portrait) — placed at the bottom of the page */}
        <div className="pt-6" />
        <NasheedSection
          title="Arabic Nasheed"
          subtitle="আরবীতে গজল তালিকা এবং টেক্সট"
          imageSrc={[
            '/icons/nasheed/nasheed-1.png',
            '/icons/nasheed/nasheed-2.png',
            '/icons/nasheed/nasheed-3.png',
          ]}
          imageAlt="Arabic Nasheed"
          linkPath="/gojol/arabic"
          linkLabel="Explore Nasheeds"
        />
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
