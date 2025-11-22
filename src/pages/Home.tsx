import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { CircularIconCard } from "@/components/features/CircularIconCard";
import { PrayerHeader } from "@/components/prayer/PrayerHeader";
import { useNavigate } from "react-router-dom";
import muslimCornerThumbnail from "@/assets/mini-apps/muslim-corner.png";

// Import 3D icon images
import alQuranIcon from "@/assets/icons/al-quran-3d.png";
import audioRecitationIcon from "@/assets/icons/audio-recitation-3d.png";
import hadithIcon from "@/assets/icons/hadith-3d.png";
import tafsirIcon from "@/assets/icons/tafsir-3d.png";
import islamicBooksIcon from "@/assets/icons/islamic-books-3d.png";
import prayerTimesIcon from "@/assets/icons/prayer-times-3d.png";
import islamicAiIcon from "@/assets/icons/islamic-ai-3d.png";

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
    title: "Muslim Corner",
    path: "/explore",
  },
  {
    icon: prayerTimesIcon,
    title: "Prayer Times",
    path: "/calendar",
  },
  {
    icon: islamicAiIcon,
    title: "Islamic AI",
    path: "/ai",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleMuslimCornerClick = () => {
    const muslimCornerApp = {
      id: "muslim-corner",
      thumbnail: muslimCornerThumbnail,
      url: "https://muslim-corner-by-talha.vercel.app/",
      title: "Muslim Corner",
    };
    navigate("/explore/mini-app/muslim-corner", { state: { app: muslimCornerApp } });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gradient-to-b dark:from-[#0a2818] dark:via-[#0f1f16] dark:to-[#0a1510] pb-20">
      <TopBar title="DeenSphereX" />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <PrayerHeader className="mx-0.5" />
        
        {/* 3D Circular Icon Grid - Main Features Only */}
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
              {feature.title === "Muslim Corner" ? (
                <div onClick={handleMuslimCornerClick} className="cursor-pointer">
                  <div className="flex flex-col items-center gap-3 group">
                    <div className="relative rounded-full overflow-hidden w-28 h-28 border-2 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15),inset_0_0_10px_rgba(16,185,129,0.05)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25),inset_0_0_15px_rgba(16,185,129,0.08)] group-hover:border-emerald-400/30 backdrop-blur-sm">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/80 via-emerald-900/60 to-emerald-950/90" />
                      <div className="absolute inset-0 bg-gradient-radial from-emerald-500/8 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center p-2">
                        <img
                          src={feature.icon}
                          alt={feature.title}
                          className="w-full h-full object-cover rounded-full drop-shadow-[0_0_8px_rgba(16,185,129,0.2)] mix-blend-lighten"
                        />
                      </div>
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500/12 via-emerald-400/15 to-emerald-500/12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
                    </div>
                    <h3 className="text-foreground font-semibold text-center leading-tight drop-shadow-lg text-sm">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              ) : (
                <CircularIconCard {...feature} />
              )}
            </div>
          ))}
        </div>

        {/* Mosque Finder Card */}
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-emerald-700 to-emerald-600 p-6 shadow-xl">
            <h3 className="text-white text-xl font-semibold">Mosque Finder</h3>
            <p className="text-emerald-100/90 mt-1 text-sm">Locate nearby mosques</p>
            <button
              onClick={() => window.location.href = '/mosque-finder'}
              className="mt-3 inline-flex items-center px-4 py-2 rounded-full bg-emerald-800/20 border border-emerald-700 text-emerald-100/90 text-sm"
            >
              Go <span className="ml-2 text-emerald-200">›</span>
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
