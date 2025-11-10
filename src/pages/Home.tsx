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
    description: "সম্পূর্ণ কুরআন অনুবাদসহ পড়ুন",
    path: "/surahs",
    gradient: true,
  },
  {
    icon: Mic,
    title: "Audio Recitation",
    description: "সুন্দর তিলাওয়াত শুনুন",
    path: "/audio",
  },
  {
    icon: Heart,
    title: "Duas",
    description: "দৈনন্দিন দুআ ও আমল",
    path: "/dua",
  },
  {
    icon: BookText,
    title: "Hadith",
    description: "সহীহ হাদিস সংকলন",
    path: "/hadith",
  },
  {
    icon: BookText,
    title: "Tafsir",
    description: "কুরআনের ব্যাখ্যা",
    path: "/tafsir",
  },
  {
    icon: Calculator,
    title: "Zakat Calculator",
    description: "যাকাত হিসাব করুন",
    path: "/zakat",
  },
  {
    icon: MessageCircle,
    title: "Islamic AI",
    description: "ইসলামিক প্রশ্ন জিজ্ঞাসা করুন",
    path: "/ai",
  },
  {
    icon: Calendar,
    title: "Islamic Calendar",
    description: "হিজরী তারিখ ও গুরুত্বপূর্ণ দিবস",
    path: "/calendar",
  },
  {
    icon: Sparkles,
    title: "Digital Tasbih",
    description: "যিকির গণনা করুন",
    path: "/tasbih",
  },
  {
    icon: Compass,
    title: "Qibla Finder",
    description: "কিবলার দিক খুঁজুন",
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
