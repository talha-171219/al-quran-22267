import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Moon, Sparkles, BookOpen } from "lucide-react";
import { laylatulQadrInfo } from "@/data/fasting";
import laylatulQadrImage from "@/assets/laylatul-qadr.jpg";

const LaylatulQadr = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="লাইলাতুল কদর" showBack />

      {/* Banner */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={laylatulQadrImage} 
          alt="Laylatul Qadr" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
          <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
            <Star className="h-6 w-6" />
            {laylatulQadrInfo.title_bn}
          </h1>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Description */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="pt-6">
            <p className="text-center leading-relaxed">
              {laylatulQadrInfo.description_bn}
            </p>
          </CardContent>
        </Card>

        {/* When to find it */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-primary" />
              কখন খুঁজবেন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="text-sm">
              {laylatulQadrInfo.nights_bn}
            </Badge>
          </CardContent>
        </Card>

        {/* Signs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              লাইলাতুল কদরের নিদর্শন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {laylatulQadrInfo.signs_bn.map((sign, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{sign}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Deeds */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              এই রাতে করণীয় আমল
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {laylatulQadrInfo.deeds_bn.map((deed, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold">{index + 1}.</span>
                  <span className="text-sm text-muted-foreground">{deed}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Special Dua */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>বিশেষ দোয়া</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-background rounded-lg p-4">
              <p className="text-2xl font-arabic text-right leading-loose">
                {laylatulQadrInfo.specialDua.arabic}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">উচ্চারণ:</p>
              <p className="text-sm italic">
                {laylatulQadrInfo.specialDua.transliteration}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">অর্থ:</p>
              <p className="text-sm leading-relaxed">
                {laylatulQadrInfo.specialDua.translation_bn}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Importance */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-center text-muted-foreground leading-relaxed">
              লাইলাতুল কদর হাজার মাসের চেয়ে উত্তম। এই রাতে আল্লাহর কাছে বেশি বেশি দোয়া করুন, ক্ষমা চান এবং কুরআন তিলাওয়াত করুন।
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default LaylatulQadr;
