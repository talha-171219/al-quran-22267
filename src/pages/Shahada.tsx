import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2, CheckCircle2, BookOpen } from "lucide-react";
import { kalemaData } from "@/data/kalema";
import { cn } from "@/lib/utils";

const Shahada = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="কালেমা - ঈমানের ঘোষণা" showBack backPath="/explore" />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-8 px-4">
        <div className="max-w-lg mx-auto text-center space-y-3">
          <h1 className="text-3xl font-bold text-foreground">{kalemaData.title}</h1>
          <p className="text-muted-foreground">{kalemaData.subtitle}</p>
          <div className="inline-block bg-primary/10 px-4 py-2 rounded-full">
            <p className="text-sm font-medium text-primary">ইসলামের প্রথম স্তম্ভ</p>
          </div>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Overview Card */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              কালেমা কী?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              কালেমা হলো ইসলামী বিশ্বাসের মৌলিক ঘোষণা। এটি আল্লাহর একত্ববাদ ও মুহাম্মদ (সা.)-এর রিসালাতের সাক্ষ্য। 
              ইসলামে ছয়টি কালেমা রয়েছে যা প্রতিটি মুসলমানের জানা ও মুখস্থ করা উচিত।
            </p>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">৬টি কালেমা</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">আরবি, বাংলা ও উচ্চারণসহ</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">অর্থ ও ফজিলত</span>
            </div>
          </CardContent>
        </Card>

        {/* Kalema Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="h-1 w-8 bg-primary rounded-full" />
            ছয় কালেমা
          </h2>

          {kalemaData.kalemas.map((kalema, index) => (
            <Card 
              key={kalema.id} 
              className={cn(
                "border-l-4 hover:shadow-lg transition-all duration-300",
                index === 0 && "border-l-emerald-500",
                index === 1 && "border-l-blue-500",
                index === 2 && "border-l-purple-500",
                index === 3 && "border-l-orange-500",
                index === 4 && "border-l-rose-500",
                index === 5 && "border-l-amber-500"
              )}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {kalema.id}
                      </Badge>
                      <h3 className="font-bold text-lg text-foreground">
                        {kalema.name_bn}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground font-arabic">
                      {kalema.name_ar}
                    </p>
                  </div>
                  <Volume2 className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Arabic Text */}
                <div className="bg-gradient-to-br from-primary/5 to-transparent p-4 rounded-lg border border-border/50">
                  <p className="text-xl sm:text-2xl text-center font-arabic leading-loose text-foreground">
                    {kalema.arabic}
                  </p>
                </div>

                {/* Transliteration */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">উচ্চারণ:</p>
                  <p className="text-sm italic text-foreground/90 leading-relaxed">
                    {kalema.transliteration}
                  </p>
                </div>

                {/* Translation */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">অর্থ:</p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {kalema.translation_bn}
                  </p>
                </div>

                {/* Meaning/Importance */}
                <div className="bg-muted/30 p-3 rounded-lg space-y-2">
                  <p className="text-xs font-semibold text-primary uppercase">ব্যাখ্যা:</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {kalema.meaning_bn}
                  </p>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">গুরুত্ব:</p>
                    <p className="text-xs text-muted-foreground">{kalema.importance}</p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-primary uppercase">ফজিলত:</p>
                  <div className="grid gap-2">
                    {kalema.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
          <CardHeader>
            <CardTitle className="text-lg">💡 পরামর্শ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• প্রতিদিন সকালে ও সন্ধ্যায় কালেমাগুলো পড়ুন</p>
            <p>• ছোট বাচ্চাদের প্রথমে কালেমা তাইয়্যিবা শেখান</p>
            <p>• অর্থ বুঝে পড়ার চেষ্টা করুন</p>
            <p>• কালেমা আসতাগফার নিয়মিত পড়ুন গুনাহ মাফের জন্য</p>
            <p>• কালেমা তাওহীদ দৈনিক ১০০ বার পড়লে বিশেষ সওয়াব</p>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Shahada;
