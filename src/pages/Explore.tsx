import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Plane, Wheat, Star, Volume2, Image, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const exploreFeatures = [
  {
    icon: Plane,
    title: "Hajj",
    titleBengali: "হজ্জ",
    path: "/hajj",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Wheat,
    title: "Fasting",
    titleBengali: "রোজা",
    path: "/fasting",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    icon: Star,
    title: "99 Names",
    titleBengali: "আল্লাহর ৯৯ নাম",
    path: "/99-names",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Volume2,
    title: "Shahada",
    titleBengali: "শাহাদা",
    path: "/shahada",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: Image,
    title: "Gallery",
    titleBengali: "গ্যালারি",
    path: "/gallery",
    gradient: "from-rose-500 to-red-600",
  },
  {
    icon: Store,
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {exploreFeatures.map((feature) => (
            <Link key={feature.path} to={feature.path}>
              <Card
                className={cn(
                  "p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer",
                  "border-2 border-transparent hover:border-primary/20",
                  "backdrop-blur-sm bg-card/50"
                )}
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <div
                    className={cn(
                      "p-4 rounded-2xl bg-gradient-to-br shadow-md",
                      feature.gradient
                    )}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
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
