import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2 } from "lucide-react";
import { fastingSteps } from "@/data/fasting";

const FastingSteps = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="ধাপে ধাপে রোযা গাইড" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Intro Card */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="pt-6">
            <p className="text-center">
              সাহরী থেকে ইফতার পর্যন্ত প্রতিটি ধাপ অনুসরণ করুন
            </p>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-4">
          {fastingSteps.map((step, index) => (
            <Card key={step.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      <CardTitle className="text-xl">{step.title_bn}</CardTitle>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />
                      {step.time}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description_bn}
                </p>

                {/* Tips */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold">গুরুত্বপূর্ণ টিপস:</p>
                  <ul className="space-y-2">
                    {step.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Note */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-center text-muted-foreground">
              প্রতিটি ধাপ মনোযোগ সহকারে অনুসরণ করুন এবং আল্লাহর সন্তুষ্টি অর্জন করুন।
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default FastingSteps;
