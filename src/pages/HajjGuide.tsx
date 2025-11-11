import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  CheckSquare,
  Map,
  MessageCircle,
  BookMarked,
  FileText,
  Calendar,
  ChevronRight,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import kaabaBanner from "@/assets/kaaba-banner.jpg";
import { hajjData } from "@/data/hajj";
import { getCompletedStepsCount } from "@/utils/hajjStorage";
import { HajjStepCard } from "@/components/hajj/HajjStepCard";

const features = [
  {
    icon: BookOpen,
    title: "ধাপে ধাপে গাইড",
    titleBn: "মানাসিক",
    path: "/hajj/steps",
    description: "সম্পূর্ণ হজের বিস্তারিত বর্ণনা",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: MessageCircle,
    title: "দোয়া ও তালবিয়াহ",
    titleBn: "দোয়া",
    path: "/hajj/duas",
    description: "অডিও সহ সকল দোয়া",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: CheckSquare,
    title: "চেকলিস্ট",
    titleBn: "প্রস্তুতি",
    path: "/hajj/checklist",
    description: "প্রয়োজনীয় জিনিসপত্রের তালিকা",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Map,
    title: "মানচিত্র",
    titleBn: "লোকেশন",
    path: "/hajj/maps",
    description: "মক্কা ও হজের স্থানসমূহ",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    icon: MessageCircle,
    title: "প্রশ্ন ও উত্তর",
    titleBn: "FAQ",
    path: "/hajj/faq",
    description: "সাধারণ প্রশ্নের উত্তর",
    gradient: "from-rose-500 to-red-600",
  },
  {
    icon: Calendar,
    title: "হজ ক্যালেন্ডার",
    titleBn: "সময়সূচী",
    path: "/hajj/calendar",
    description: "হজের তারিখ ও কাউন্টডাউন",
    gradient: "from-green-500 to-emerald-600",
  }
];

const HajjGuide = () => {
  const completedSteps = getCompletedStepsCount();
  const totalSteps = hajjData.steps.length;
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="হজ গাইড" showBack />

      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
        <img
          src={kaabaBanner}
          alt="Kaaba"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">
            হজ গাইড
          </h1>
          <p className="text-lg text-white/90 drop-shadow-md">
            শতভাগ বাংলায় — ধাপে ধাপে
          </p>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Overview Card */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">হজ পরিচিতি</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {hajjData.overview}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary" className="gap-1">
                  📍 {hajjData.locations}
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  📅 জিলহজ ৮-১৩
                </Badge>
              </div>

              {completedSteps > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">আপনার অগ্রগতি</span>
                    <span className="font-medium">{completedSteps}/{totalSteps} ধাপ</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              <Link to="/hajj/steps">
                <Button className="w-full mt-2" size="lg">
                  ধাপে ধাপে শুরু করুন
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Feature Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4">হজ সংক্রান্ত</h2>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature) => (
              <Link key={feature.path} to={feature.path}>
                <Card
                  className={cn(
                    "h-full hover:shadow-xl transition-all duration-300 cursor-pointer",
                    "border border-primary/10 backdrop-blur-md bg-gradient-to-br from-card/80 to-card/40",
                    "hover:scale-105 hover:border-primary/30 group"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div
                        className={cn(
                          "p-3 rounded-xl bg-gradient-to-br shadow-lg",
                          "group-hover:shadow-xl group-hover:scale-110 transition-all duration-300",
                          feature.gradient
                        )}
                      >
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-sm text-foreground leading-tight">
                          {feature.titleBn}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-tight">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Access to Steps */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">প্রধান ধাপসমূহ</h2>
            <Link to="/hajj/steps">
              <Button variant="ghost" size="sm">
                সব দেখুন
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {hajjData.steps.slice(0, 3).map((step, index) => (
              <HajjStepCard key={step.slug} step={step} index={index} />
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default HajjGuide;
