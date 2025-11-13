import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { CircularIconCard } from "@/components/features/CircularIconCard";
import exploreBanner from "@/assets/explore-banner-premium.jpg";
import hajjIcon from "@/assets/icons/hajj-3d.png";
import ramadanIcon from "@/assets/icons/ramadan-3d.png";
import namesIcon from "@/assets/icons/99-names-3d.png";
import mosqueFinderIcon from "@/assets/icons/mosque-finder-3d.png";
import shahadaIcon from "@/assets/icons/shahada-3d.png";
import galleryIcon from "@/assets/icons/gallery-3d.png";
import storeIcon from "@/assets/icons/store-3d.png";

const exploreFeatures = [
  {
    icon: hajjIcon,
    title: "Hajj • হজ্জ",
    path: "/hajj",
  },
  {
    icon: ramadanIcon,
    title: "Ramadan • রমজান",
    path: "/fasting",
  },
  {
    icon: namesIcon,
    title: "99 Names • ৯৯ নাম",
    path: "/99-names",
  },
  {
    icon: mosqueFinderIcon,
    title: "Mosque Finder • মসজিদ",
    path: "/mosque-finder",
  },
  {
    icon: shahadaIcon,
    title: "Shahada • শাহাদা",
    path: "/shahada",
  },
  {
    icon: galleryIcon,
    title: "Gallery • গ্যালারি",
    path: "/gallery",
  },
  {
    icon: storeIcon,
    title: "Store • স্টোর",
    path: "/store",
  },
];

const Explore = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Explore" showBack />

      {/* Banner with Fade Effect */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={exploreBanner} 
          alt="Islamic Explore Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute bottom-6 left-4 right-4">
          <h1 className="text-2xl font-bold mb-1 text-white dark:text-white drop-shadow-lg">Explore Islamic Features</h1>
          <p className="text-sm text-white/95 dark:text-white/90 drop-shadow-md">ইসলামিক বৈশিষ্ট্য অন্বেষণ করুন</p>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-6">
          {exploreFeatures.map((feature, index) => (
            <div
              key={feature.path}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CircularIconCard
                icon={feature.icon}
                title={feature.title}
                path={feature.path}
                size="small"
              />
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Explore;
