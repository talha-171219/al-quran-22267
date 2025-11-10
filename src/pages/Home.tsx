import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { FeatureCard } from "@/components/features/FeatureCard";
import { PrayerHeader } from "@/components/prayer/PrayerHeader";
import {
  BookOpen,
  Mic,
  Heart,
  Calculator,
  Calendar,
  Sparkles,
  BookText,
  Compass,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Al-Quran",
    path: "/surahs",
    gradient: true,
  },
  {
    icon: Mic,
    title: "Audio Recitation",
    path: "/audio",
  },
  {
    icon: Heart,
    title: "Duas",
    path: "/dua",
  },
  {
    icon: BookText,
    title: "Hadith",
    path: "/hadith",
  },
  {
    icon: BookText,
    title: "Tafsir",
    path: "/tafsir",
  },
  {
    icon: Calculator,
    title: "Zakat Calculator",
    path: "/zakat",
  },
  {
    icon: MessageCircle,
    title: "Islamic AI",
    path: "/ai",
  },
  {
    icon: Calendar,
    title: "Islamic Calendar",
    path: "/calendar",
  },
  {
    icon: Sparkles,
    title: "Digital Tasbih",
    path: "/tasbih",
  },
  {
    icon: Compass,
    title: "Qibla Finder",
    path: "/qibla",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="আল কুরআন" />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <PrayerHeader />
        
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
