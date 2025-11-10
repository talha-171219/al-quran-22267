import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sunrise, Sunset, Sparkles } from "lucide-react";
import { azkarCategories } from "@/data/azkar";
import { toBengaliNumerals } from "@/utils/bengaliUtils";

const Azkar = () => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const handleCount = (categoryId: string, dhikrIndex: number, maxCount: number) => {
    const key = `${categoryId}-${dhikrIndex}`;
    const currentCount = counts[key] || 0;
    
    if (currentCount < maxCount) {
      setCounts({
        ...counts,
        [key]: currentCount + 1
      });
    }
  };

  const resetCount = (categoryId: string, dhikrIndex: number) => {
    const key = `${categoryId}-${dhikrIndex}`;
    setCounts({
      ...counts,
      [key]: 0
    });
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
                        <Badge 
                          variant={isComplete ? "default" : "secondary"}
                          className={isComplete ? "bg-green-600" : ""}
                        >
                          {toBengaliNumerals(currentCount)}/{toBengaliNumerals(dhikr.count)}
                        </Badge>
                      </div>
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
                            ↺
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
