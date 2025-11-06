import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { FeatureCard } from "@/components/features/FeatureCard";
import {
  BookOpen,
  Mic,
  Heart,
  Calculator,
  Calendar,
  Sparkles,
  BookText,
  Compass,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Al-Quran",
    description: "Read complete Quran with translation",
    path: "/quran",
    gradient: true,
  },
  {
    icon: Mic,
    title: "Audio Recitation",
    description: "Listen to beautiful Quran recitations",
    path: "/audio",
  },
  {
    icon: Heart,
    title: "Duas",
    description: "Daily supplications and prayers",
    path: "/dua",
  },
  {
    icon: BookText,
    title: "Hadith",
    description: "Authentic hadith collections",
    path: "/hadith",
  },
  {
    icon: Calculator,
    title: "Zakat Calculator",
    description: "Calculate your Zakat obligations",
    path: "/zakat",
  },
  {
    icon: Calendar,
    title: "Islamic Calendar",
    description: "Hijri dates and important events",
    path: "/calendar",
  },
  {
    icon: Sparkles,
    title: "Digital Tasbih",
    description: "Count your dhikr and remembrance",
    path: "/tasbih",
  },
  {
    icon: BookText,
    title: "Tafsir",
    description: "Quran commentary and explanations",
    path: "/tafsir",
  },
  {
    icon: Compass,
    title: "Qibla Finder",
    description: "Find Qibla direction anywhere",
    path: "/qibla",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Al-Quran" showSearch />
      
      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
