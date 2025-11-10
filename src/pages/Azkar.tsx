import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sunrise, Sunset, Sparkles, RotateCcw, CheckCircle2 } from "lucide-react";
import { azkarCategories } from "@/data/azkar";
import { toBengaliNumerals } from "@/utils/bengaliUtils";
import { toast } from "sonner";

const STORAGE_KEY = 'azkar_counts';
const DATE_KEY = 'azkar_date';

const Azkar = () => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Check if it's a new day
    const today = new Date().toISOString().split('T')[0];
    const savedDate = localStorage.getItem(DATE_KEY);
    
    if (savedDate !== today) {
      // Reset counts for new day
      localStorage.setItem(DATE_KEY, today);
      localStorage.removeItem(STORAGE_KEY);
      setCounts({});
      toast.info("নতুন দিনের জন্য আযকার রিসেট হয়েছে");
    } else {
      // Load saved counts
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCounts(JSON.parse(saved));
      }
    }
  }, []);

  const handleCount = (categoryId: string, dhikrIndex: number, maxCount: number) => {
    const key = `${categoryId}-${dhikrIndex}`;
    const currentCount = counts[key] || 0;
    
    if (currentCount < maxCount) {
      const newCount = currentCount + 1;
      const newCounts = {
        ...counts,
        [key]: newCount
      };
      setCounts(newCounts);
      
      // Auto-save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCounts));
      
      // Vibration feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      
      // Show completion toast
      if (newCount === maxCount) {
        toast.success("মুবারকবাদ! আপনি এই আযকার সম্পন্ন করেছেন", {
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        });
      }
    }
  };

  const resetCount = (categoryId: string, dhikrIndex: number) => {
    const key = `${categoryId}-${dhikrIndex}`;
    const newCounts = {
      ...counts,
      [key]: 0
    };
    setCounts(newCounts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCounts));
    toast.info("রিসেট করা হয়েছে");
  };

  const resetAll = () => {
    setCounts({});
    localStorage.removeItem(STORAGE_KEY);
    toast.info("সকল আযকার রিসেট করা হয়েছে");
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
        <div className="flex justify-end mb-4">
          <Button onClick={resetAll} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            সকল রিসেট করুন
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

              {category.dhikrs.map((dhikr, index) => {
                const key = `${category.id}-${index}`;
                const currentCount = counts[key] || 0;
                const isComplete = currentCount >= dhikr.count;
                const progress = (currentCount / dhikr.count) * 100;

                return (
                  <Card 
                    key={index}
                    className={isComplete ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <Badge variant="outline" className="text-xs">
                          {dhikr.reference}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={isComplete ? "default" : "secondary"}
                            className={isComplete ? "bg-green-600" : ""}
                          >
                            {toBengaliNumerals(currentCount)}/{toBengaliNumerals(dhikr.count)}
                          </Badge>
                          {isComplete && (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      </div>
                      {/* Progress Bar */}
                      <Progress value={progress} className="h-2 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-right">
                        <p className="text-2xl leading-loose font-arabic">
                          {dhikr.arabic}
                        </p>
                      </div>

                      {dhikr.transliteration && (
                        <div className="text-sm text-muted-foreground italic">
                          {dhikr.transliteration}
                        </div>
                      )}

                      <div className="text-sm leading-relaxed">
                        {dhikr.translation}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant={isComplete ? "outline" : "default"}
                          className="flex-1"
                          onClick={() => handleCount(category.id, index, dhikr.count)}
                          disabled={isComplete}
                        >
                          {isComplete ? "সম্পন্ন ✓" : "গণনা করুন"}
                        </Button>
                        {currentCount > 0 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => resetCount(category.id, index)}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        )}
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
