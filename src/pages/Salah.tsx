import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Sun,
  CloudSun,
  Sunset,
  Moon,
  ChevronRight
} from "lucide-react";
import { salahData } from "@/data/salah";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const prayerIcons = {
  fajr: Sun,
  dhuhr: CloudSun,
  asr: CloudSun,
  maghrib: Sunset,
  isha: Moon
};

const prayerGradients = {
  fajr: "from-blue-500 to-cyan-600",
  dhuhr: "from-orange-500 to-amber-600",
  asr: "from-amber-500 to-orange-600",
  maghrib: "from-rose-500 to-pink-600",
  isha: "from-indigo-500 to-purple-600"
};

const Salah = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="নামাজ - صَلَاة" showBack backPath="/explore" />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-8 px-4">
        <div className="max-w-lg mx-auto text-center space-y-3">
          <BookOpen className="h-16 w-16 mx-auto text-primary" />
          <h1 className="text-3xl font-bold text-foreground">{salahData.title}</h1>
          <p className="text-muted-foreground">{salahData.subtitle}</p>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Overview Card */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              নামাজের গুরুত্ব
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {salahData.overview.description}
            </p>
            
            {/* Hadith */}
            <div className="bg-gradient-to-br from-amber-500/10 to-transparent p-4 rounded-lg border border-amber-500/20 space-y-2">
              <p className="text-xl font-arabic text-center text-foreground">
                {salahData.overview.hadith.arabic}
              </p>
              <p className="text-sm italic text-center text-muted-foreground">
                {salahData.overview.hadith.transliteration}
              </p>
              <p className="text-sm text-center text-foreground">
                {salahData.overview.hadith.translation}
              </p>
              <p className="text-xs text-center text-muted-foreground">
                — {salahData.overview.hadith.reference}
              </p>
            </div>

            {/* Importance Points */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary">কেন নামাজ পড়বেন:</p>
              {salahData.overview.importance.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prayer Method Link */}
        <Link to="/namaz">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">নামাজের বিস্তারিত নিয়ম</p>
                  <p className="text-sm text-muted-foreground">ধাপে ধাপে নামাজ আদায়ের পদ্ধতি শিখুন</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>

        {/* Prayer Times Link */}
        <Link to="/">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">আজকের নামাজের সময়</p>
                  <p className="text-sm text-muted-foreground">সঠিক ওয়াক্ত দেখুন</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>

        {/* Five Daily Prayers */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="h-1 w-8 bg-primary rounded-full" />
            পাঁচ ওয়াক্ত নামাজ
          </h2>

          {salahData.prayers.map((prayer) => {
            const Icon = prayerIcons[prayer.id as keyof typeof prayerIcons];
            const gradient = prayerGradients[prayer.id as keyof typeof prayerGradients];
            
            return (
              <Card 
                key={prayer.id}
                className="hover:shadow-lg transition-all overflow-hidden"
              >
                <div className={cn("h-2 bg-gradient-to-r", gradient)} />
                
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-lg bg-gradient-to-br shrink-0",
                      gradient
                    )}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-lg text-foreground">
                          {prayer.name_bn}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {prayer.rakats.total} রাকাত
                        </Badge>
                      </div>
                      <p className="text-sm font-arabic text-muted-foreground">
                        {prayer.name_ar}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Time */}
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{prayer.time_bn}</span>
                  </div>

                  {/* Rakats Breakdown */}
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">রাকাত বিভাগ:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {prayer.rakats.sunnah_before && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">সুন্নাত (আগে):</span>
                          <span className="font-medium text-foreground">{prayer.rakats.sunnah_before}</span>
                        </div>
                      )}
                      {prayer.rakats.fard && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ফরজ:</span>
                          <span className="font-medium text-foreground">{prayer.rakats.fard}</span>
                        </div>
                      )}
                      {prayer.rakats.sunnah && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">সুন্নাত:</span>
                          <span className="font-medium text-foreground">{prayer.rakats.sunnah}</span>
                        </div>
                      )}
                      {prayer.rakats.sunnah_after && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">সুন্নাত (পরে):</span>
                          <span className="font-medium text-foreground">{prayer.rakats.sunnah_after}</span>
                        </div>
                      )}
                      {prayer.rakats.witr && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">বিতর:</span>
                          <span className="font-medium text-foreground">{prayer.rakats.witr}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {prayer.description}
                  </p>

                  {/* Virtues */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-primary uppercase">ফজিলত:</p>
                    <div className="space-y-1.5">
                      {prayer.virtues.map((virtue, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-muted-foreground">{virtue}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hadith */}
                  {prayer.hadith && (
                    <div className="bg-gradient-to-br from-primary/5 to-transparent p-3 rounded-lg border border-border/50">
                      <p className="text-xs text-muted-foreground mb-1">📖 হাদীস:</p>
                      <p className="text-sm text-foreground italic leading-relaxed">
                        "{prayer.hadith.text}"
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        — {prayer.hadith.reference}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Prayer Steps */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              নামাজের ধাপসমূহ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {salahData.steps.map((step, idx) => (
              <div 
                key={step.step}
                className={cn(
                  "p-4 rounded-lg border border-border/50",
                  idx % 2 === 0 ? "bg-muted/20" : "bg-transparent"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    
                    {step.arabic && (
                      <div className="bg-gradient-to-br from-primary/5 to-transparent p-3 rounded-lg space-y-1">
                        <p className="text-lg font-arabic text-center text-foreground">
                          {step.arabic}
                        </p>
                        <p className="text-xs italic text-center text-muted-foreground">
                          {step.transliteration}
                        </p>
                        {step.translation && (
                          <p className="text-sm text-center text-foreground">
                            {step.translation}
                          </p>
                        )}
                        {step.count && (
                          <p className="text-xs text-center text-muted-foreground">
                            ({step.count})
                          </p>
                        )}
                      </div>
                    )}
                    
                    {step.details && (
                      <ul className="space-y-1 mt-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {step.note && (
                      <p className="text-xs text-primary italic mt-2">
                        নোট: {step.note}
                      </p>
                    )}
                    
                    {step.text && (
                      <p className="text-sm text-foreground italic">
                        "{step.text}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
          <CardHeader>
            <CardTitle className="text-lg">💡 পরামর্শ ও টিপস</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {salahData.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/prayer-tracker">
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
              <CheckCircle2 className="h-6 w-6" />
              <span className="text-xs">নামাজ ট্র্যাকার</span>
            </Button>
          </Link>
          <Link to="/qibla">
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-xs">কিবলা দিক</span>
            </Button>
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Salah;
