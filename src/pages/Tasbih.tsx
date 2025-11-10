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
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="ডিজিটাল তাসবীহ" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <Tabs defaultValue="counter" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="counter">
              <Plus className="h-4 w-4 mr-1" />
              গণনা
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart3 className="h-4 w-4 mr-1" />
              পরিসংখ্যান
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Award className="h-4 w-4 mr-1" />
              অর্জন
            </TabsTrigger>
          </TabsList>

          <TabsContent value="counter" className="space-y-6 mt-6">
        {/* Settings Card */}
        <Card className="p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">জিকির নির্বাচন করুন</label>
              <Select value={dhikrType} onValueChange={setDhikrType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dhikrTypes.map(d => (
                    <SelectItem key={d.value} value={d.value}>
                      <div className="flex items-center gap-2">
                        <span className="font-arabic text-lg">{d.arabic}</span>
                        <span className="text-sm">({d.bangla})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">লক্ষ্য সংখ্যা</label>
              <Select value={target.toString()} onValueChange={(v) => setTarget(parseInt(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="33">33</SelectItem>
                  <SelectItem value="99">99</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">আজকের মোট</p>
                <p className="text-2xl font-bold text-primary">{todayTotal}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg text-center border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">সর্বমোট</p>
                <p className="text-2xl font-bold text-primary">{stats.totalCount}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Counter Card */}
        <Card className="p-8 bg-gradient-to-br from-background to-muted/20">
          <div className="text-center space-y-6">
            <div className="space-y-3 pb-4 border-b border-border">
              <p className="font-arabic text-5xl text-primary leading-relaxed drop-shadow-lg">
                {currentDhikr.arabic}
              </p>
              <p className="text-xl font-semibold">{currentDhikr.bangla}</p>
              <p className="text-sm text-muted-foreground italic">{currentDhikr.meaning}</p>
            </div>

            <div className="space-y-3">
              <div className="relative inline-block">
                <div className="text-7xl font-bold text-primary animate-scale-in">
                  {count}
                </div>
                {count === target && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl animate-bounce">
                    ✓
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-muted-foreground">লক্ষ্য:</span>
                <span className="font-bold text-lg text-primary">{target}</span>
                {count === target && (
                  <span className="text-green-500 font-semibold ml-2">সম্পন্ন! 🎉</span>
                )}
              </div>
              {count < target && (
                <div className="flex items-center justify-center gap-1">
                  <div className="h-2 bg-muted rounded-full w-48 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300"
                      style={{ width: `${(count / target) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    {target - count} বাকি
                  </span>
                </div>
              )}
            </div>

            <div className="relative w-60 h-60 mx-auto my-6">
              {/* Progress Ring - Background */}
              <svg className="absolute inset-0 -rotate-90 w-full h-full pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r="115"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-muted/30"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="115"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${(count / target) * 722} 722`}
                  className="text-primary transition-all duration-500 drop-shadow-lg"
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-pulse pointer-events-none" />
              <div className="absolute inset-2 rounded-full border-2 border-primary/20 pointer-events-none" />
              
              <button
                onClick={increment}
                className="relative w-full h-full rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-2xl active:scale-95 transition-all duration-200 flex items-center justify-center touch-manipulation group hover:shadow-primary/50 z-10"
              >
                <Plus className="h-24 w-24 group-active:scale-90 transition-transform" />
              </button>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={reset}
                className="flex-1 gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
                size="lg"
              >
                <RotateCcw className="h-4 w-4" />
                রিসেট
              </Button>
              {count > 0 && count < target && (
                <Button
                  variant="default"
                  onClick={completeSession}
                  className="flex-1 gap-2"
                  size="lg"
                >
                  <CheckCircle className="h-4 w-4" />
                  সংরক্ষণ করুন
                </Button>
              )}
            </div>
          </div>
        </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4 mt-6">
            <TasbihStats stats={stats} monthlyStats={monthlyStats} />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4 mt-6">
            <TasbihMilestones milestones={milestones} />
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default Tasbih;
