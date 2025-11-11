import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { HajjIcon } from "@/components/icons/HajjIcon";
import { FastingIcon } from "@/components/icons/FastingIcon";
import { NamesIcon } from "@/components/icons/NamesIcon";
import { ShahadaIcon } from "@/components/icons/ShahadaIcon";
import { GalleryIcon } from "@/components/icons/GalleryIcon";
import { StoreIcon } from "@/components/icons/StoreIcon";

const exploreFeatures = [
  {
    icon: HajjIcon,
    title: "Hajj",
    titleBengali: "হজ্জ",
    path: "/hajj",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: FastingIcon,
    title: "Fasting",
    titleBengali: "রোজা",
    path: "/fasting",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    icon: NamesIcon,
    title: "99 Names",
    titleBengali: "আল্লাহর ৯৯ নাম",
    path: "/99-names",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: ShahadaIcon,
    title: "Shahada",
    titleBengali: "শাহাদা",
    path: "/shahada",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: GalleryIcon,
    title: "Gallery",
    titleBengali: "গ্যালারি",
    path: "/gallery",
    gradient: "from-rose-500 to-red-600",
  },
  {
    icon: StoreIcon,
    title: "Store",
    titleBengali: "স্টোর",
    path: "/store",
    gradient: "from-green-500 to-emerald-600",
  },
];

const Explore = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Explore" showBack />

      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-3">
          {exploreFeatures.map((feature) => (
            <Link key={feature.path} to={feature.path}>
              <Card
                className={cn(
                  "p-4 hover:shadow-xl transition-all duration-300 cursor-pointer",
                  "border border-primary/10 backdrop-blur-md bg-gradient-to-br from-card/80 to-card/40",
                  "hover:scale-105 hover:border-primary/30",
                  "hover:shadow-primary/20 group"
                )}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div
                    className={cn(
                      "p-3 rounded-xl bg-gradient-to-br shadow-lg",
                      "group-hover:shadow-xl group-hover:scale-110 transition-all duration-300",
                      feature.gradient
                    )}
                  >
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-semibold text-xs text-foreground leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      {feature.titleBengali}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Explore;
