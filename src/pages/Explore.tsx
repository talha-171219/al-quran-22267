import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { SquareIconCard } from "@/components/features/SquareIconCard";
import { MiniAppsGrid } from "@/components/explore/MiniAppsGrid";
import { SEOHelmet } from "@/components/SEOHelmet";
import wordByWordThumbnail from "@/assets/mini-apps/wordbyword-quran-new.png";
import muslimCornerThumbnail from "@/assets/mini-apps/muslim-corner.png";
import placeholderApp1 from "@/assets/mini-apps/placeholder-app-1.png";
import placeholderApp2 from "@/assets/mini-apps/placeholder-app-2.png";
import shahadaIcon from "@/assets/icons/shahada-3d.png";
import prayerIcon from "@/assets/icons/prayer-times-3d.png";
import zakatIcon from "@/assets/icons/zakat-calculator-3d.png";
import ramadanIcon from "@/assets/icons/ramadan-3d.png";
import hajjIcon from "@/assets/icons/hajj-3d.png";
import namesIcon from "@/assets/icons/99-names-3d.png";
import mosqueFinderIcon from "@/assets/icons/mosque-finder-3d.png";
import galleryIcon from "@/assets/icons/gallery-3d.png";
import storeIcon from "@/assets/icons/store-3d.png";
import islamicNamesIcon from "@/assets/icons/islamic-names-3d.png";
import islamiclecturesIcon from "@/assets/icons/islamic-lecture.png";
import moreDuasIcon from "@/assets/icons/more-duas-3d.png";
import gojolIcon from "@/assets/icons/gojol-3d.png";
import audioRecitationIcon from "@/assets/icons/audio-recitation-3d.png";

// 5 Pillars of Islam (ইসলামের ৫টি স্তম্ভ) in order
const fivePillars = [
  {
    icon: shahadaIcon,
    title: "Kalema • কালেমা",
    path: "/shahada",
  },
  {
    icon: prayerIcon,
    title: "Salah • সালাহ",
    path: "/salah",
  },
  {
    icon: zakatIcon,
    title: "Zakat • যাকাত",
    path: "/zakat",
  },
  {
    icon: ramadanIcon,
    title: "Sawm • সাওম",
    path: "/fasting",
  },
  {
    icon: hajjIcon,
    title: "Hajj • হজ্জ",
    path: "/hajj",
  },
];

// Other Islamic Features
const otherFeatures = [
  {
    icon: namesIcon,
    title: "99 Names • ৯৯ নাম",
    path: "/99-names",
  },
  {
    icon: moreDuasIcon,
    title: "More Duas • আরও দোয়া",
    path: "/more-duas",
  },
  {
    icon:   islamiclecturesIcon,
    title: "Islamic Lectures • লেকচার",
    path: "/lectures",
  },
  {
    icon: islamicNamesIcon,
    title: "Islamic Names • নাম",
    path: "/islamic-names",
  },
  {
    icon: mosqueFinderIcon,
    title: "Mosque Finder • মসজিদ",
    path: "/mosque-finder",
  },
  {
    icon: gojolIcon,
    title: "Islamic Gojol • গজল",
    path: "/gojol",
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

// Mini-apps configuration
const miniApps = [
  {
    id: "wordbyword-quran",
    thumbnail: wordByWordThumbnail,
    url: "https://wordbyword-quran.vercel.app/",
    title: "Word by Word Quran",
  },
  {
    id: "muslim-corner",
    thumbnail: muslimCornerThumbnail,
    url: "https://muslim-corner-by-talha.vercel.app/",
    title: "Muslim Corner",
  },
  {
    id: "placeholder-1",
    thumbnail: placeholderApp1,
    url: "/explore",
    title: "Coming Soon",
  },
  {
    id: "placeholder-2",
    thumbnail: placeholderApp2,
    url: "/explore",
    title: "Coming Soon",
  },
];

const Explore = () => {
  return (
    <>
      <SEOHelmet 
        title="Explore Islamic Features"
        description="Discover comprehensive Islamic features including Hajj guide, Ramadan fasting tracker, Allah's 99 names, Shahada, Islamic gallery, store, mini-apps and more."
        keywords="Islamic Features, Hajj, Ramadan, Fasting, 99 Names of Allah, Shahada, Islamic Gallery, Islamic Store"
        canonicalUrl="/explore"
      />
      <div className="min-h-screen bg-background pb-20">
        <TopBar title="Explore" showBack />

      <main className="max-w-lg mx-auto px-2 py-8">
        {/* Mini-Apps Section */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-center text-foreground mb-6">
            Mini Apps • মিনি অ্যাপস
          </h2>
          <MiniAppsGrid apps={miniApps} />
        </div>
        {/* Five Pillars of Islam Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center text-foreground">
            ইসলামের ৫টি স্তম্ভ • Five Pillars of Islam
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {fivePillars.map((feature, index) => (
              <div
                key={feature.path}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <SquareIconCard
                  icon={feature.icon}
                  title={feature.title}
                  path={feature.path}
                  size="large"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Other Features Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-center text-foreground">
            আরও বৈশিষ্ট্য • More Features
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {otherFeatures.map((feature, index) => (
              <div
                key={feature.path}
                className="animate-fade-in"
                style={{ animationDelay: `${(index + 5) * 0.1}s` }}
              >
                <SquareIconCard
                  icon={feature.icon}
                  title={feature.title}
                  path={feature.path}
                  size="large"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
    </>
  );
};

export default Explore;
