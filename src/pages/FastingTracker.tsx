import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Calendar, Trophy, RefreshCw } from "lucide-react";
import { 
  toggleFastingDay, 
  isFastingCompleted, 
  getRamadanProgress,
  resetFastingProgress 
} from "@/utils/fastingStorage";
import { toast } from "sonner";

const FastingTracker = () => {
  const [progress, setProgress] = useState({ completed: 0, total: 30, percentage: 0 });
  const [days, setDays] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    const ramadanProgress = getRamadanProgress();
    setProgress(ramadanProgress);

    // Load individual days
    const daysData: { [key: number]: boolean } = {};
    for (let i = 1; i <= 30; i++) {
      const date = `ramadan-${i}`;
      daysData[i] = isFastingCompleted(date);
    }
    setDays(daysData);
  };

  const handleToggleDay = (day: number, checked: boolean) => {
    const date = `ramadan-${day}`;
    toggleFastingDay(date, checked);
    setDays(prev => ({ ...prev, [day]: checked }));
    
    // Update progress
    const ramadanProgress = getRamadanProgress();
    setProgress(ramadanProgress);

    toast.success(checked ? `${day} তম রোযা সম্পন্ন হয়েছে ✅` : `${day} তম রোযা আনচেক করা হয়েছে`);
  };

  const handleReset = () => {
    if (confirm("আপনি কি নিশ্চিত যে সব ডেটা রিসেট করতে চান?")) {
      resetFastingProgress();
      loadProgress();
      toast.success("রোযা ট্র্যাকার রিসেট হয়েছে");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="রোযা ট্র্যাকার" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Progress Card */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>আপনার অগ্রগতি</span>
              <Trophy className="h-6 w-6" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-5xl font-bold">{progress.completed}/30</p>
              <p className="text-sm opacity-80 mt-1">রোযা সম্পন্ন হয়েছে</p>
            </div>
            <Progress value={progress.percentage} className="h-3 bg-white/20" />
            <p className="text-center text-sm opacity-90">
              {progress.percentage}% সম্পন্ন
            </p>
          </CardContent>
        </Card>

        {/* Calendar Grid */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                রমজানের ৩০ দিন
              </CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                রিসেট
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <div
                  key={day}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                    days[day]
                      ? 'bg-primary/10 border-primary'
                      : 'bg-muted/30 border-border'
                  }`}
                >
                  <span className="text-sm font-semibold">{day}</span>
                  <Checkbox
                    checked={days[day] || false}
                    onCheckedChange={(checked) => 
                      handleToggleDay(day, checked as boolean)
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Motivation Card */}
        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-2xl">🌙</p>
              <p className="text-sm font-semibold">
                {progress.completed < 10 && "চমৎকার শুরু! এগিয়ে যান।"}
                {progress.completed >= 10 && progress.completed < 20 && "অসাধারণ! আপনি ভালো করছেন।"}
                {progress.completed >= 20 && progress.completed < 30 && "প্রায় শেষ! চালিয়ে যান।"}
                {progress.completed === 30 && "মাশাআল্লাহ! ৩০টি রোযা সম্পন্ন হয়েছে!"}
              </p>
              <p className="text-xs text-muted-foreground">
                "যে ব্যক্তি ঈমান ও সওয়াবের আশায় রমজানের রোযা রাখবে, তার পূর্বের সব গুনাহ মাফ করে দেওয়া হবে।" — বুখারী
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default FastingTracker;
