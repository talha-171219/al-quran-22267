import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";
import { toast } from "sonner";
import { getTodayRecord, togglePrayer, getPrayerStats } from "@/utils/prayerTracker";
import { toBengaliNumerals } from "@/utils/bengaliUtils";

const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const prayerNamesBn: { [key: string]: string } = {
  Fajr: "ফজর",
  Dhuhr: "যুহর",
  Asr: "আসর",
  Maghrib: "মাগরিব",
  Isha: "এশা",
};

const PrayerTracker = () => {
  const [todayRecord, setTodayRecord] = useState(getTodayRecord());
  const [stats, setStats] = useState(getPrayerStats(7));

  useEffect(() => {
    // Refresh on mount
    setTodayRecord(getTodayRecord());
    setStats(getPrayerStats(7));
  }, []);

  const handleTogglePrayer = (prayer: string) => {
    const updated = togglePrayer(prayer);
    setTodayRecord(updated);
    setStats(getPrayerStats(7));
    
    const isCompleted = updated.prayers[prayer as keyof typeof updated.prayers];
    toast.success(
      isCompleted 
        ? `${prayerNamesBn[prayer]} নামাজ সম্পন্ন করা হয়েছে ✓`
        : `${prayerNamesBn[prayer]} নামাজ চিহ্নিত করা হয়নি`
    );
  };

  const completedToday = Object.values(todayRecord.prayers).filter(Boolean).length;
  const todayPercentage = Math.round((completedToday / 5) * 100);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="নামাজ ট্র্যাকার" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Today's Progress */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-center text-xl">আজকের অগ্রগতি</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                {toBengaliNumerals(completedToday)}/৫
              </div>
              <p className="text-sm opacity-90">নামাজ সম্পন্ন হয়েছে</p>
            </div>
            <Progress value={todayPercentage} className="h-3 bg-white/20" />
            <p className="text-center text-sm opacity-90">
              {toBengaliNumerals(todayPercentage)}% সম্পন্ন
            </p>
          </CardContent>
        </Card>

        {/* Prayer Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>আজকের নামাজ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {prayerNames.map((prayer) => {
              const isCompleted = todayRecord.prayers[prayer as keyof typeof todayRecord.prayers];
              return (
                <Button
                  key={prayer}
                  variant="outline"
                  className={`w-full justify-start h-auto py-4 ${
                    isCompleted 
                      ? "border-green-500 bg-green-50 dark:bg-green-950/20" 
                      : "border-border"
                  }`}
                  onClick={() => handleTogglePrayer(prayer)}
                >
                  <div className="flex items-center gap-3 w-full">
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                    )}
                    <div className="flex-1 text-left">
                      <p className={`font-medium ${isCompleted ? "text-green-700 dark:text-green-400" : ""}`}>
                        {prayerNamesBn[prayer]}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isCompleted ? "সম্পন্ন হয়েছে" : "এখনো সম্পন্ন হয়নি"}
                      </p>
                    </div>
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Weekly Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>সাপ্তাহিক পরিসংখ্যান</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {toBengaliNumerals(stats.completedPrayers)}
                </p>
                <p className="text-xs text-muted-foreground">সম্পন্ন</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-muted-foreground">
                  {toBengaliNumerals(stats.totalPrayers)}
                </p>
                <p className="text-xs text-muted-foreground">মোট</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {toBengaliNumerals(stats.percentage)}%
                </p>
                <p className="text-xs text-muted-foreground">হার</p>
              </div>
            </div>
            <Progress value={stats.percentage} className="h-2" />
            <p className="text-xs text-center text-muted-foreground">
              গত ৭ দিনের পরিসংখ্যান
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default PrayerTracker;
