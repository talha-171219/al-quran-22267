import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  HandMetal,
  MoveDown,
  MoveUp,
  CheckCircle2,
  BookOpen,
  Volume2,
  Info,
  Clock
} from "lucide-react";
import { salahData } from "@/data/salah";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const stepIcons = {
  1: HandMetal,
  2: BookOpen,
  3: BookOpen,
  4: BookOpen,
  5: MoveDown,
  6: MoveDown,
  7: BookOpen,
  8: HandMetal
};

const Namaz = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="নামাজের নিয়ম" showBack backPath="/salah" />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-8 px-4">
        <div className="max-w-lg mx-auto text-center space-y-3">
          <HandMetal className="h-16 w-16 mx-auto text-primary" />
          <h1 className="text-3xl font-bold text-foreground">নামাজের বিস্তারিত নিয়ম</h1>
          <p className="text-muted-foreground">ধাপে ধাপে নামাজ আদায়ের পদ্ধতি</p>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Introduction */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  নামাজ হল ইসলামের দ্বিতীয় স্তম্ভ এবং আল্লাহর সাথে বান্দার সরাসরি যোগাযোগের মাধ্যম। 
                  নিচে নামাজ আদায়ের সঠিক পদ্ধতি ধাপে ধাপে বর্ণনা করা হলো।
                </p>
                <p className="text-xs text-primary font-semibold">
                  ✨ প্রতিটি ধাপ মনোযোগ দিয়ে পড়ুন এবং অনুসরণ করুন
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prayer Times Button */}
        <Button 
          onClick={() => navigate('/prayer-times')} 
          className="w-full"
          size="lg"
        >
          <Clock className="h-5 w-5 mr-2" />
          আজকের নামাজের সময়সূচি দেখুন
        </Button>

        {/* Steps */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            নামাজের ধাপসমূহ
          </h2>

          {salahData.steps.map((step) => {
            const Icon = stepIcons[step.step as keyof typeof stepIcons];
            return (
              <Card 
                key={step.step} 
                className="border-primary/20 hover:shadow-lg transition-all"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                      <span className="text-primary font-bold">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-foreground flex items-center gap-2">
                        {Icon && <Icon className="h-5 w-5 text-primary" />}
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {step.details && (
                    <div className="space-y-2 pl-4 border-l-2 border-primary/20">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground">{detail}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.arabic && (
                    <div className="bg-gradient-to-br from-amber-500/10 to-transparent p-4 rounded-lg border border-amber-500/20 space-y-2">
                      <p className="text-xl font-arabic text-center text-foreground">
                        {step.arabic}
                      </p>
                      {step.transliteration && (
                        <p className="text-sm italic text-center text-muted-foreground">
                          {step.transliteration}
                        </p>
                      )}
                      {step.translation && (
                        <p className="text-sm text-center text-foreground">
                          {step.translation}
                        </p>
                      )}
                      {step.count && (
                        <Badge variant="secondary" className="w-full justify-center">
                          {step.count}
                        </Badge>
                      )}
                    </div>
                  )}

                  {step.note && (
                    <div className="flex items-start gap-2 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                      <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{step.note}</p>
                    </div>
                  )}

                  {step.text && (
                    <div className="bg-primary/5 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-primary text-center">
                        "{step.text}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Important Duas Section */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-primary" />
              গুরুত্বপূর্ণ দোয়া ও তাসবীহ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Sana */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary">
                {salahData.duas.opening.name}
              </p>
              <div className="bg-gradient-to-br from-amber-500/10 to-transparent p-4 rounded-lg border border-amber-500/20 space-y-2">
                <p className="text-lg font-arabic text-center text-foreground">
                  {salahData.duas.opening.arabic}
                </p>
                <p className="text-sm italic text-center text-muted-foreground">
                  {salahData.duas.opening.transliteration}
                </p>
              </div>
            </div>

            {/* Ruku */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary">
                {salahData.duas.ruku.name}
              </p>
              <div className="bg-gradient-to-br from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/20 space-y-2">
                <p className="text-lg font-arabic text-center text-foreground">
                  {salahData.duas.ruku.arabic}
                </p>
                <p className="text-sm italic text-center text-muted-foreground">
                  {salahData.duas.ruku.transliteration}
                </p>
              </div>
            </div>

            {/* Sujood */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary">
                {salahData.duas.sujood.name}
              </p>
              <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-4 rounded-lg border border-blue-500/20 space-y-2">
                <p className="text-lg font-arabic text-center text-foreground">
                  {salahData.duas.sujood.arabic}
                </p>
                <p className="text-sm italic text-center text-muted-foreground">
                  {salahData.duas.sujood.transliteration}
                </p>
              </div>
            </div>

            {/* Tashahhud */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary">
                {salahData.duas.tashahhud.name}
              </p>
              <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-4 rounded-lg border border-purple-500/20 space-y-2">
                <p className="text-lg font-arabic text-center text-foreground leading-relaxed">
                  {salahData.duas.tashahhud.arabic}
                </p>
                <p className="text-sm italic text-center text-muted-foreground">
                  {salahData.duas.tashahhud.transliteration}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              নামাজের জন্য গুরুত্বপূর্ণ টিপস
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {salahData.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 shrink-0 mt-0.5">
                  <span className="text-xs text-primary font-bold">{idx + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Namaz;
