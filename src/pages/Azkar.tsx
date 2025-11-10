import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { azkarCategories } from "@/data/azkar";
import { Sunrise, Sunset, Sparkles, RotateCcw } from "lucide-react";
import { toBengaliNumerals } from "@/utils/bengaliUtils";
import { toast } from "sonner";

const STORAGE_KEY = "azkar_counts";
const DATE_KEY = "azkar_date";

const Azkar = () => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  // Load saved counts on mount
  useEffect(() => {
    const savedDate = localStorage.getItem(DATE_KEY);
    const today = new Date().toDateString();
    
    if (savedDate === today) {
      // Load saved counts for today
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCounts(JSON.parse(saved));
      }
    } else {
      // Reset counts for new day
      localStorage.setItem(DATE_KEY, today);
      localStorage.removeItem(STORAGE_KEY);
      setCounts({});
    }
  }, []);

  // Save counts whenever they change
  useEffect(() => {
    if (Object.keys(counts).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
    }
  }, [counts]);

  const handleCount = (categoryId: string, dhikrIndex: number, maxCount: number) => {
    const key = `${categoryId}-${dhikrIndex}`;
    const currentCount = counts[key] || 0;
    
    if (currentCount < maxCount) {
      const newCount = currentCount + 1;
      setCounts({ ...counts, [key]: newCount });
      
      // Haptic feedback (vibration)
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      
      // Show completion message
      if (newCount === maxCount) {
        toast.success("সম্পন্ন হয়েছে! ✨", {
          description: "আলহামদুলিল্লাহ",
        });
      }
    }
  };

  const resetCount = (categoryId: string, dhikrIndex: number) => {
    const key = `${categoryId}-${dhikrIndex}`;
    const newCounts = { ...counts };
    delete newCounts[key];
    setCounts(newCounts);
    toast.info("রিসেট করা হয়েছে");
  };

  const resetAllCounts = () => {
    setCounts({});
    localStorage.removeItem(STORAGE_KEY);
    toast.success("সব কাউন্টার রিসেট করা হয়েছে");
  };

  const getIcon = (categoryId: string) => {
    switch (categoryId) {
      case "morning":
        return <Sunrise className="h-5 w-5" />;
      case "evening":
        return <Sunset className="h-5 w-5" />;
      case "after-prayer":
        return <Sparkles className="h-5 w-5" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="আযকার" showBack />

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Reset All Button */}
        <div className="mb-4 flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={resetAllCounts}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            সব রিসেট করুন
          </Button>
        </div>

        <Tabs defaultValue="morning" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="morning">সকাল</TabsTrigger>
            <TabsTrigger value="evening">সন্ধ্যা</TabsTrigger>
            <TabsTrigger value="after-prayer">নামাজের পর</TabsTrigger>
          </TabsList>

          {azkarCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {getIcon(category.id)}
                    <CardTitle>{category.titleBn}</CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>

              {category.dhikrs.map((dhikr, dhikrIndex) => {
                const key = `${category.id}-${dhikrIndex}`;
                const currentCount = counts[key] || 0;
                const isComplete = currentCount >= dhikr.count;
                const progress = (currentCount / dhikr.count) * 100;

                return (
                  <Card key={dhikrIndex} className={isComplete ? "border-primary bg-primary/5" : ""}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">অগ্রগতি</span>
                            <span className="text-muted-foreground">
                              {toBengaliNumerals(currentCount.toString())} / {toBengaliNumerals(dhikr.count.toString())}
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        <div className="text-right">
                          <p className="text-2xl leading-loose font-arabic">{dhikr.arabic}</p>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          <p className="italic">{dhikr.transliteration}</p>
                        </div>
                        
                        <div className="text-sm">
                          <p>{dhikr.translation}</p>
                        </div>
                        
                        <div className="text-xs text-muted-foreground border-t pt-2">
                          <p>{dhikr.reference}</p>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => handleCount(category.id, dhikrIndex, dhikr.count)}
                            disabled={isComplete}
                            className="flex-1"
                            variant={isComplete ? "outline" : "default"}
                            size="lg"
                          >
                            {isComplete ? (
                              <span className="flex items-center gap-2">
                                সম্পন্ন ✓
                              </span>
                            ) : (
                              "গণনা করুন"
                            )}
                          </Button>
                          
                          {currentCount > 0 && (
                            <Button
                              onClick={() => resetCount(category.id, dhikrIndex)}
                              variant="ghost"
                              size="icon"
                              className="shrink-0"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default Azkar;
