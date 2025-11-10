import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Plus, BarChart3, Award, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TasbihStats } from "@/components/tasbih/TasbihStats";
import { TasbihMilestones } from "@/components/tasbih/TasbihMilestones";
import {
  saveSession,
  calculateTasbihStats,
  getMonthlyTasbihStats,
  loadMilestones,
  getNewlyAchievedMilestones,
  getTodayTasbihRecord,
} from "@/utils/tasbihTracker";
import { useToast } from "@/hooks/use-toast";

const dhikrTypes = [
  { value: "subhanallah", arabic: "سُبْحَانَ اللهِ", bangla: "সুবহানাল্লাহ", meaning: "আল্লাহ পবিত্র" },
  { value: "alhamdulillah", arabic: "الْحَمْدُ لِلَّهِ", bangla: "আলহামদুলিল্লাহ", meaning: "সকল প্রশংসা আল্লাহর" },
  { value: "allahuakbar", arabic: "اللهُ أَكْبَرُ", bangla: "আল্লাহু আকবার", meaning: "আল্লাহ সবচেয়ে মহান" },
  { value: "lailahaillallah", arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", bangla: "লা ইলাহা ইল্লাল্লাহ", meaning: "আল্লাহ ছাড়া কোন উপাস্য নেই" },
  { value: "astaghfirullah", arabic: "أَسْتَغْفِرُ ٱللَّٰهَ", bangla: "আস্তাগফিরুল্লাহ", meaning: "আমি আল্লাহর কাছে ক্ষমা চাই" },
];

const Tasbih = () => {
  const { toast } = useToast();
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [dhikrType, setDhikrType] = useState("subhanallah");
  const [stats, setStats] = useState(calculateTasbihStats());
  const [monthlyStats, setMonthlyStats] = useState(getMonthlyTasbihStats());
  const [milestones, setMilestones] = useState(loadMilestones());
  const [todayTotal, setTodayTotal] = useState(0);
  
  const currentDhikr = dhikrTypes.find(d => d.value === dhikrType) || dhikrTypes[0];

  useEffect(() => {
    // Load today's total
    const todayRecord = getTodayTasbihRecord();
    setTodayTotal(todayRecord.totalCount);
  }, []);

  const refreshStats = () => {
    setStats(calculateTasbihStats());
    setMonthlyStats(getMonthlyTasbihStats());
    setMilestones(loadMilestones());
    const todayRecord = getTodayTasbihRecord();
    setTodayTotal(todayRecord.totalCount);
  };

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    setTodayTotal(prev => prev + 1);
    
    if (newCount >= target) {
      // Completed target - save session and celebrate!
      saveSession(dhikrType, newCount, target, true);
      
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
      }
      
      // Check for new milestones
      const newMilestones = getNewlyAchievedMilestones();
      if (newMilestones.length > 0) {
        toast({
          title: "🏆 নতুন অর্জন!",
          description: newMilestones[0].titleBn + " - " + newMilestones[0].descriptionBn,
          duration: 5000,
        });
      } else {
        toast({
          title: "✓ লক্ষ্য সম্পন্ন!",
          description: `${target} ${currentDhikr.bangla} সম্পন্ন হয়েছে`,
          duration: 3000,
        });
      }
      
      refreshStats();
      setCount(0);
      return;
    }
    
    // Haptic feedback on mobile
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const reset = () => {
    if (count > 0) {
      // Save incomplete session
      saveSession(dhikrType, count, target, false);
      refreshStats();
    }
    setCount(0);
  };

  const completeSession = () => {
    if (count > 0) {
      saveSession(dhikrType, count, target, count >= target);
      toast({
        title: "সেশন সংরক্ষিত",
        description: `${count} ${currentDhikr.bangla} সংরক্ষণ করা হয়েছে`,
      });
      refreshStats();
      setCount(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 pb-20">
      <TopBar title="ডিজিটাল তাসবীহ" showBack />

      <main className="max-w-lg mx-auto px-4 py-3">
        <Tabs defaultValue="counter" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-11 bg-card/50 backdrop-blur-sm border border-border/50">
            <TabsTrigger value="counter" className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm">
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">গণনা</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm">
              <BarChart3 className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">পরিসংখ্যান</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm">
              <Award className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">অর্জন</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="counter" className="mt-3 space-y-3">
            {/* Compact Settings & Stats Row */}
            <div className="grid grid-cols-2 gap-2">
              <Select value={dhikrType} onValueChange={setDhikrType}>
                <SelectTrigger className="h-9 bg-card/50 backdrop-blur-sm border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dhikrTypes.map(d => (
                    <SelectItem key={d.value} value={d.value}>
                      <span className="font-arabic text-sm">{d.arabic}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={target.toString()} onValueChange={(v) => setTarget(parseInt(v))}>
                <SelectTrigger className="h-9 bg-card/50 backdrop-blur-sm border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="33">লক্ষ্য: ৩৩</SelectItem>
                  <SelectItem value="99">লক্ষ্য: ৯৯</SelectItem>
                  <SelectItem value="100">লক্ষ্য: ১০০</SelectItem>
                  <SelectItem value="500">লক্ষ্য: ৫০০</SelectItem>
                  <SelectItem value="1000">লক্ষ্য: ১০০০</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-card/60 backdrop-blur-md rounded-lg text-center border border-border/30 shadow-sm">
                <p className="text-[10px] text-muted-foreground mb-0.5">আজকের</p>
                <p className="text-lg font-bold text-primary">{todayTotal}</p>
              </div>
              <div className="p-2 bg-gradient-to-br from-primary/15 to-primary/5 backdrop-blur-md rounded-lg text-center border border-primary/30 shadow-md">
                <p className="text-[10px] text-muted-foreground mb-0.5">সর্বমোট</p>
                <p className="text-lg font-bold text-primary">{stats.totalCount}</p>
              </div>
              <div className="p-2 bg-gradient-to-br from-orange-500/15 to-orange-500/5 backdrop-blur-md rounded-lg text-center border border-orange-500/30 shadow-md">
                <p className="text-[10px] text-muted-foreground mb-0.5">ধারা</p>
                <p className="text-lg font-bold text-orange-500">{stats.currentStreak}</p>
              </div>
            </div>

            {/* Main Counter Card with Glassmorphism */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl border-border/50 shadow-2xl">
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative text-center p-4 space-y-3">
                {/* Dhikr Display */}
                <div className="space-y-1 pb-2">
                  <p className="font-arabic text-3xl text-primary leading-relaxed drop-shadow-2xl filter brightness-110">
                    {currentDhikr.arabic}
                  </p>
                  <p className="text-sm font-medium text-foreground/90">{currentDhikr.bangla}</p>
                  <p className="text-[10px] text-muted-foreground">{currentDhikr.meaning}</p>
                </div>

                {/* Counter Display */}
                <div className="relative">
                  <div className="text-5xl font-bold text-primary drop-shadow-lg animate-scale-in">
                    {count}
                  </div>
                  {count === target && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl animate-bounce">
                      ✓
                    </div>
                  )}
                </div>

                {/* Progress Info */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span className="text-muted-foreground">লক্ষ্য: {target}</span>
                    {count === target ? (
                      <span className="text-green-500 font-semibold animate-pulse">সম্পন্ন! 🎉</span>
                    ) : (
                      <span className="text-muted-foreground">• বাকি: {target - count}</span>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative h-1.5 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70 rounded-full transition-all duration-500 shadow-lg shadow-primary/50"
                      style={{ width: `${(count / target) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Counter Button with Advanced Styling */}
                <div className="relative w-48 h-48 mx-auto my-3">
                  {/* Outer Glow Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-xl animate-pulse pointer-events-none" />
                  
                  {/* Progress Ring */}
                  <svg className="absolute inset-0 -rotate-90 w-full h-full pointer-events-none drop-shadow-2xl">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="90"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-muted/20"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="90"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${(count / target) * 565} 565`}
                      className="transition-all duration-500 drop-shadow-2xl"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" className="text-primary" stopColor="currentColor" />
                        <stop offset="100%" className="text-primary/60" stopColor="currentColor" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Main Button */}
                  <button
                    onClick={increment}
                    className="absolute inset-4 rounded-full bg-gradient-to-br from-primary via-primary/95 to-primary/85 text-primary-foreground shadow-2xl active:scale-95 transition-all duration-200 flex flex-col items-center justify-center touch-manipulation group hover:shadow-primary/50 hover:from-primary/95 hover:to-primary/75 z-10 border-2 border-primary/20"
                  >
                    <Plus className="h-16 w-16 group-active:scale-90 transition-transform drop-shadow-lg" strokeWidth={2.5} />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    onClick={reset}
                    className="flex-1 h-9 text-xs gap-1.5 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 bg-card/50 backdrop-blur-sm transition-all"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    রিসেট
                  </Button>
                  {count > 0 && count < target && (
                    <Button
                      variant="default"
                      onClick={completeSession}
                      className="flex-1 h-9 text-xs gap-1.5 bg-primary/90 hover:bg-primary shadow-md transition-all"
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      সংরক্ষণ
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-3 mt-3">
            <TasbihStats stats={stats} monthlyStats={monthlyStats} />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-3 mt-3">
            <TasbihMilestones milestones={milestones} />
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default Tasbih;
