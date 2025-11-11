import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { hajjData } from "@/data/hajj";
import { HajjStepCard } from "@/components/hajj/HajjStepCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCompletedStepsCount } from "@/utils/hajjStorage";
import { CheckCircle2 } from "lucide-react";

const HajjSteps = () => {
  const completedSteps = getCompletedStepsCount();
  const totalSteps = hajjData.steps.length;
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="ধাপে ধাপে হজ গাইড" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Progress Card */}
        <Card className="p-4 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="font-semibold">অগ্রগতি</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {completedSteps} / {totalSteps} সম্পন্ন
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </Card>

        {/* Steps List */}
        <div className="space-y-3">
          {hajjData.steps.map((step, index) => (
            <HajjStepCard key={step.slug} step={step} index={index} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default HajjSteps;
