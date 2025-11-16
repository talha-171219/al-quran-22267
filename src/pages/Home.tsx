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

        {/* Arabic Nasheed Section */}
        <NasheedSection
          title="Arabic Nasheed"
          subtitle="Heart-touching Islamic Nasheeds to listen anytime."
          imageSrc="https://i.postimg.cc/VNtR2FR0/Copilot-20251116-165530.png" // Placeholder image
          imageAlt="Arabic Nasheed"
          linkPath="/gojol/arabic" // Link to the Nasheed page
        />
          {/* Store Section (styled like Nasheed) - placeholder image, links to Store page */}
          <NasheedSection
            title="Store"
            subtitle="Islamic card images available in the store."
            imageSrc="https://i.postimg.cc/cJKnz4dB/Copilot-20251116-172838.png" // Placeholder - you can replace with your image
            imageAlt="Store"
            linkPath="/store" // Link to the Store page
            linkLabel="See Images"
          />
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
