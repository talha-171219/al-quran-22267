import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Circle, Calendar, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { getTodayRecord, togglePrayer, getPrayerStats, loadPrayerRecords } from "@/utils/prayerTracker";
import { toBengaliNumerals } from "@/utils/bengaliUtils";
import { PrayerStreakCard } from "@/components/prayer/PrayerStreakCard";
import { MonthlyCalendar } from "@/components/prayer/MonthlyCalendar";

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
  const [monthlyStats, setMonthlyStats] = useState(getPrayerStats(30));
  const [allRecords, setAllRecords] = useState(loadPrayerRecords());

  useEffect(() => {
    // Refresh on mount and calculate streaks
    setTodayRecord(getTodayRecord());
    setStats(getPrayerStats(7));
    setMonthlyStats(getPrayerStats(30));
    setAllRecords(loadPrayerRecords());
  }, []);

  // Calculate streaks
  const calculateStreaks = () => {
    const records = loadPrayerRecords();
    const sortedRecords = records.sort((a, b) => b.date.localeCompare(a.date));
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    // Calculate current streak from today backwards
    const today = new Date().toISOString().split('T')[0];
    let checkDate = new Date(today);
    
    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const record = sortedRecords.find(r => r.date === dateStr);
      
      if (record) {
        const completed = Object.values(record.prayers).filter(Boolean).length;
        if (completed === 5) {
          if (i === 0 || currentStreak > 0) {
            currentStreak++;
          }
        } else if (i > 0) {
          break;
        }
      } else if (i > 0) {
        break;
      }
      
      checkDate.setDate(checkDate.getDate() - 1);
    }
    
    // Calculate longest streak
    sortedRecords.forEach(record => {
      const completed = Object.values(record.prayers).filter(Boolean).length;
      if (completed === 5) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    });
    
    return { currentStreak, longestStreak };
  };

  const { currentStreak, longestStreak } = calculateStreaks();

  const handleTogglePrayer = (prayer: string) => {
    const updated = togglePrayer(prayer);
    setTodayRecord(updated);
    setStats(getPrayerStats(7));
    setMonthlyStats(getPrayerStats(30));
    setAllRecords(loadPrayerRecords());
    
    const isCompleted = updated.prayers[prayer as keyof typeof updated.prayers];
    
    // Check if all prayers completed
    const allCompleted = Object.values(updated.prayers).every(Boolean);
    
    if (allCompleted && isCompleted) {
      toast.success("🎉 আজকের সব নামাজ সম্পন্ন হয়েছে!");
    } else {
      toast.success(
        isCompleted 
          ? `${prayerNamesBn[prayer]} নামাজ সম্পন্ন করা হয়েছে ✓`
          : `${prayerNamesBn[prayer]} নামাজ চিহ্নিত করা হয়নি`
      );
    }
  };

  const completedToday = Object.values(todayRecord.prayers).filter(Boolean).length;
  const todayPercentage = Math.round((completedToday / 5) * 100);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="নামাজ ট্র্যাকার" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="today">আজ</TabsTrigger>
            <TabsTrigger value="calendar">
              <Calendar className="h-4 w-4 mr-1" />
              ক্যালেন্ডার
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart3 className="h-4 w-4 mr-1" />
              পরিসংখ্যান
            </TabsTrigger>
          </TabsList>

          {/* Today Tab */}
          <TabsContent value="today" className="space-y-4">
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

            {/* Streak Card */}
            <PrayerStreakCard
              currentStreak={currentStreak}
              longestStreak={longestStreak}
              monthlyCompletion={monthlyStats.percentage}
            />

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
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-4">
            <MonthlyCalendar records={allRecords} />
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>মাসিক পরিসংখ্যান</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-3xl font-bold text-primary">
                      {toBengaliNumerals(monthlyStats.completedPrayers)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">সম্পন্ন নামাজ</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-3xl font-bold text-primary">
                      {toBengaliNumerals(monthlyStats.percentage)}%
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">সম্পূর্ণতার হার</p>
                  </div>
                </div>
                <Progress value={monthlyStats.percentage} className="h-3" />
                <p className="text-xs text-center text-muted-foreground">
                  গত ৩০ দিনের পরিসংখ্যান
                </p>
              </CardContent>
            </Card>

            <PrayerStreakCard
              currentStreak={currentStreak}
              longestStreak={longestStreak}
              monthlyCompletion={monthlyStats.percentage}
            />

            <Card>
              <CardHeader>
                <CardTitle>সর্বমোট পরিসংখ্যান</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">মোট রেকর্ড</span>
                    <span className="text-lg font-bold">{toBengaliNumerals(allRecords.length)} দিন</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">বর্তমান ধারা</span>
                    <span className="text-lg font-bold text-orange-600">{toBengaliNumerals(currentStreak)} দিন</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">সর্বোচ্চ ধারা</span>
                    <span className="text-lg font-bold text-amber-600">{toBengaliNumerals(longestStreak)} দিন</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default PrayerTracker;
