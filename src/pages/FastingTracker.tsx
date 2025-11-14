import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Trophy, RefreshCw, Moon, Sun, Star } from "lucide-react";
import { 
  toggleFastingDay, 
  isFastingCompleted, 
  getRamadanProgress,
  resetFastingProgress,
  getFastingProgress,
  type FastingType
} from "@/utils/fastingStorage";
import { toast } from "sonner";

const naflFasts = [
  { id: 'ayame-beez', name: 'আইয়ামে বীজ (১৩, ১৪, ১৫)', days: ['ayame-13', 'ayame-14', 'ayame-15'] },
  { id: 'monday-thursday', name: 'সোমবার ও বৃহস্পতিবার' },
  { id: 'shawwal', name: 'শাওয়ালের ৬ রোজা', days: Array.from({length: 6}, (_, i) => `shawwal-${i + 1}`) },
];

const sunnahFasts = [
  { id: 'ashura', name: 'আশুরা (১০ মুহররম)' },
  { id: 'arafah', name: 'আরাফার দিন (৯ যিলহজ্জ)' },
  { id: 'dhul-hijjah', name: 'যিলহজ্জের প্রথম ৯ দিন', days: Array.from({length: 9}, (_, i) => `dhulhijjah-${i + 1}`) },
  { id: 'shaban', name: 'শাবান মাসের রোজা' },
];

const FastingTracker = () => {
  const [progress, setProgress] = useState({ completed: 0, total: 30, percentage: 0 });
  const [days, setDays] = useState<{ [key: number]: boolean }>({});
  const [naflProgress, setNaflProgress] = useState<{ [key: string]: boolean }>({});
  const [sunnahProgress, setSunnahProgress] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    const ramadanProgress = getRamadanProgress();
    setProgress(ramadanProgress);

    // Load Ramadan days
    const daysData: { [key: number]: boolean } = {};
    for (let i = 1; i <= 30; i++) {
      const date = `ramadan-${i}`;
      daysData[i] = isFastingCompleted(date);
    }
    setDays(daysData);

    // Load Nafl fasts
    const naflData: { [key: string]: boolean } = {};
    const allProgress = getFastingProgress();
    Object.keys(allProgress).forEach(key => {
      if (allProgress[key].type === 'nafl') {
        naflData[key] = allProgress[key].completed;
      }
    });
    setNaflProgress(naflData);

    // Load Sunnah fasts
    const sunnahData: { [key: string]: boolean } = {};
    Object.keys(allProgress).forEach(key => {
      if (allProgress[key].type === 'sunnah') {
        sunnahData[key] = allProgress[key].completed;
      }
    });
    setSunnahProgress(sunnahData);
  };

  const handleToggleDay = (day: number, checked: boolean) => {
    const date = `ramadan-${day}`;
    toggleFastingDay(date, checked, undefined, 'ramadan');
    setDays(prev => ({ ...prev, [day]: checked }));
    
    const ramadanProgress = getRamadanProgress();
    setProgress(ramadanProgress);

    toast.success(checked ? `${day} তম রোযা সম্পন্ন হয়েছে ✅` : `${day} তম রোযা আনচেক করা হয়েছে`);
  };

  const handleToggleNafl = (id: string, checked: boolean) => {
    toggleFastingDay(id, checked, undefined, 'nafl');
    setNaflProgress(prev => ({ ...prev, [id]: checked }));
    toast.success(checked ? 'নফল রোযা সম্পন্ন হয়েছে ✅' : 'নফল রোযা আনচেক করা হয়েছে');
  };

  const handleToggleSunnah = (id: string, checked: boolean) => {
    toggleFastingDay(id, checked, undefined, 'sunnah');
    setSunnahProgress(prev => ({ ...prev, [id]: checked }));
    toast.success(checked ? 'সুন্নত রোযা সম্পন্ন হয়েছে ✅' : 'সুন্নত রোযা আনচেক করা হয়েছে');
  };

  const handleReset = () => {
    if (confirm("আপনি কি নিশ্চিত যে সব ডেটা রিসেট করতে চান?")) {
      resetFastingProgress();
      loadProgress();
      toast.success("রোযা ট্র্যাকার রিসেট হয়েছে");
    }
  };

  const getTotalNafl = () => Object.values(naflProgress).filter(Boolean).length;
  const getTotalSunnah = () => Object.values(sunnahProgress).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="রোযা ট্র্যাকার" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Overall Stats Card */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>সর্বমোট অগ্রগতি</span>
              <Trophy className="h-6 w-6" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold">{progress.completed}</p>
                <p className="text-xs opacity-80 mt-1">রমজান</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{getTotalNafl()}</p>
                <p className="text-xs opacity-80 mt-1">নফল</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{getTotalSunnah()}</p>
                <p className="text-xs opacity-80 mt-1">সুন্নত</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="ramadan" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ramadan">
              <Moon className="h-4 w-4 mr-1" />
              রমজান
            </TabsTrigger>
            <TabsTrigger value="nafl">
              <Star className="h-4 w-4 mr-1" />
              নফল
            </TabsTrigger>
            <TabsTrigger value="sunnah">
              <Sun className="h-4 w-4 mr-1" />
              সুন্নত
            </TabsTrigger>
          </TabsList>

          {/* Ramadan Tab */}
          <TabsContent value="ramadan" className="space-y-6">
            <Card className="bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>রমজানের অগ্রগতি</CardTitle>
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
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                        days[day] 
                          ? 'bg-primary/10 border-primary' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="text-sm font-medium">{day}</span>
                      <Checkbox
                        checked={days[day] || false}
                        onCheckedChange={(checked) => handleToggleDay(day, checked as boolean)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Nafl Tab */}
          <TabsContent value="nafl" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  নফল রোজা ({getTotalNafl()} সম্পন্ন)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {naflFasts.map((fast) => (
                  <div key={fast.id} className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                      <div>
                        <h4 className="font-medium">{fast.name}</h4>
                        {fast.days && (
                          <p className="text-sm text-muted-foreground">
                            {fast.days.length} দিন
                          </p>
                        )}
                      </div>
                      <Checkbox
                        checked={naflProgress[fast.id] || false}
                        onCheckedChange={(checked) => handleToggleNafl(fast.id, checked as boolean)}
                      />
                    </div>
                    
                    {fast.days && (
                      <div className="grid grid-cols-6 gap-2 ml-4">
                        {fast.days.map((dayId) => (
                          <div
                            key={dayId}
                            className={`flex flex-col items-center gap-1 p-2 rounded border ${
                              naflProgress[dayId] 
                                ? 'bg-primary/10 border-primary' 
                                : 'border-border'
                            }`}
                          >
                            <span className="text-xs">{dayId.split('-').pop()}</span>
                            <Checkbox
                              checked={naflProgress[dayId] || false}
                              onCheckedChange={(checked) => handleToggleNafl(dayId, checked as boolean)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sunnah Tab */}
          <TabsContent value="sunnah" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5" />
                  সুন্নত রোজা ({getTotalSunnah()} সম্পন্ন)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sunnahFasts.map((fast) => (
                  <div key={fast.id} className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                      <div>
                        <h4 className="font-medium">{fast.name}</h4>
                        {fast.days && (
                          <p className="text-sm text-muted-foreground">
                            {fast.days.length} দিন
                          </p>
                        )}
                      </div>
                      <Checkbox
                        checked={sunnahProgress[fast.id] || false}
                        onCheckedChange={(checked) => handleToggleSunnah(fast.id, checked as boolean)}
                      />
                    </div>
                    
                    {fast.days && (
                      <div className="grid grid-cols-6 gap-2 ml-4">
                        {fast.days.map((dayId) => (
                          <div
                            key={dayId}
                            className={`flex flex-col items-center gap-1 p-2 rounded border ${
                              sunnahProgress[dayId] 
                                ? 'bg-primary/10 border-primary' 
                                : 'border-border'
                            }`}
                          >
                            <span className="text-xs">{dayId.split('-').pop()}</span>
                            <Checkbox
                              checked={sunnahProgress[dayId] || false}
                              onCheckedChange={(checked) => handleToggleSunnah(dayId, checked as boolean)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Motivational Card */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="pt-6">
            <blockquote className="text-center space-y-2">
              <p className="text-sm italic">
                "যে ব্যক্তি ঈমানের সাথে এবং সওয়াবের আশায় রমজানে রোজা রাখে, তার পূর্বের সমস্ত গুনাহ ক্ষমা করে দেওয়া হয়।"
              </p>
              <footer className="text-xs text-muted-foreground">
                — সহীহ বুখারী ও মুসলিম
              </footer>
            </blockquote>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default FastingTracker;
