import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, CheckSquare, MapPin, HelpCircle, Calendar, Heart, Moon, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { fastingOverview } from "@/data/fasting";
import fastingBanner from "@/assets/fasting-banner.jpg";

const FastingGuide = () => {
  const features = [
    {
      icon: Clock,
      title: "সাহরী ও ইফতারের সময়",
      description: "আজকের সাহরী ও ইফতারের সঠিক সময়",
      path: "/fasting/timing",
      gradient: true
    },
    {
      icon: BookOpen,
      title: "নিয়ত ও দোয়া",
      description: "রোযার নিয়ত, ইফতার ও অন্যান্য দোয়া",
      path: "/fasting/duas"
    },
    {
      icon: CheckSquare,
      title: "ধাপে ধাপে গাইড",
      description: "সাহরী থেকে ইফতার পর্যন্ত",
      path: "/fasting/steps"
    },
    {
      icon: Heart,
      title: "স্বাস্থ্য ও টিপস",
      description: "রোযায় সুস্থ থাকার উপায়",
      path: "/fasting/tips"
    },
    {
      icon: Calendar,
      title: "রোযা ট্র্যাকার",
      description: "৩০ দিনের অগ্রগতি দেখুন",
      path: "/fasting/tracker"
    },
    {
      icon: HelpCircle,
      title: "প্রশ্নোত্তর",
      description: "সাধারণ প্রশ্নের উত্তর",
      path: "/fasting/faq"
    },
    {
      icon: Star,
      title: "লাইলাতুল কদর",
      description: "কদর রাতের আমল ও দোয়া",
      path: "/fasting/laylatul-qadr"
    },
    {
      icon: Moon,
      title: "ইতিকাফ",
      description: "ইতিকাফের নিয়ম ও ফজিলত",
      path: "/fasting/itikaf"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="রোযা গাইড" showBack backPath="/explore" />

      {/* Banner */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={fastingBanner} 
          alt="Ramadan Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
          <h1 className="text-2xl font-bold mb-1">{fastingOverview.title_bn}</h1>
          <p className="text-sm opacity-90">{fastingOverview.subtitle_bn}</p>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Overview Card */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>রোযার গুরুত্ব</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-relaxed opacity-90">
              {fastingOverview.description_bn}
            </p>
            <div className="bg-white/10 rounded-lg p-3 space-y-2">
              <p className="text-sm font-semibold">হাদীস:</p>
              <p className="text-lg font-arabic text-center">{fastingOverview.hadith.arabic}</p>
              <p className="text-xs italic text-center opacity-80">
                {fastingOverview.hadith.transliteration}
              </p>
              <p className="text-sm text-center">{fastingOverview.hadith.translation_bn}</p>
              <p className="text-xs text-center opacity-70">— {fastingOverview.hadith.reference}</p>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              {fastingOverview.importance_bn}
            </p>
          </CardContent>
        </Card>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-4">
          {features.map((feature) => (
            <Link key={feature.path} to={feature.path}>
              <Card className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                feature.gradient ? 'bg-gradient-primary text-primary-foreground' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      feature.gradient ? 'bg-white/10' : 'bg-gradient-primary text-primary-foreground'
                    }`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className={`text-sm ${
                        feature.gradient ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Access */}
        <Card>
          <CardHeader>
            <CardTitle>দ্রুত এক্সেস</CardTitle>
            <CardDescription>প্রয়োজনীয় তথ্য দ্রুত দেখুন</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/fasting/timing">
              <Button className="w-full justify-start" variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                আজকের সাহরী ও ইফতারের সময়
              </Button>
            </Link>
            <Link to="/fasting/duas">
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                নিয়ত ও দোয়া
              </Button>
            </Link>
            <Link to="/fasting/tracker">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                রোযা ট্র্যাকার
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default FastingGuide;
