import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Sunrise, Sunset, Sparkles, Search, Volume2, CheckCircle, Settings, Vibrate } from "lucide-react";
import { azkarCategories } from "@/data/azkar";
import { toBengaliNumerals } from "@/utils/bengaliUtils";
import { 
  getTodayDhikrCount, 
  updateDhikrCount, 
  resetDhikrCount,
  isCategoryCompleted,
  markCategoryCompleted
} from "@/utils/azkarTracker";
import { 
  loadAzkarSettings, 
  saveAzkarSettings, 
  playAzkarSound, 
  playCompletionSound,
  getVibrationPattern 
} from "@/utils/azkarSettings";
import { toast } from "sonner";

const Azkar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("morning");
  const [refreshKey, setRefreshKey] = useState(0); // Force re-render
  const [settings, setSettings] = useState(loadAzkarSettings());

  const handleCount = (categoryId: string, dhikrIndex: number, maxCount: number) => {
    const currentCount = getTodayDhikrCount(categoryId, dhikrIndex);
    
    if (currentCount < maxCount) {
      updateDhikrCount(categoryId, dhikrIndex, currentCount + 1, maxCount);
      
      // Play sound and vibrate
      playAzkarSound(settings);
      if (settings.vibrationEnabled && 'vibrate' in navigator) {
        navigator.vibrate(getVibrationPattern(settings));
      }
      
      setRefreshKey(prev => prev + 1); // Trigger re-render
      
      // Check if this dhikr is now complete
      if (currentCount + 1 >= maxCount) {
        playCompletionSound(settings);
      }
      
      // Check if all dhikrs in category are completed
      const category = azkarCategories.find(c => c.id === categoryId);
      if (category && isCategoryCompleted(categoryId, category.dhikrs.length)) {
        markCategoryCompleted(categoryId);
        toast.success(`${category.titleBn} সম্পূর্ণ হয়েছে! 🎉`);
      }
    }
  };

  const handleReset = (categoryId: string, dhikrIndex: number) => {
    resetDhikrCount(categoryId, dhikrIndex);
    setRefreshKey(prev => prev + 1); // Trigger re-render
  };

  const playAudio = (text: string) => {
    // Simple text-to-speech for Arabic text
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    } else {
      toast.error("অডিও বাজানো সমর্থিত নয়");
    }
  };

  // Filter azkar based on search
  const filteredCategories = azkarCategories.map(category => ({
    ...category,
    dhikrs: category.dhikrs.filter(dhikr => 
      searchQuery === "" ||
      dhikr.arabic.includes(searchQuery) ||
      dhikr.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dhikr.transliteration?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.dhikrs.length > 0);

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

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="আযকার খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="morning" className="relative">
              সকাল
              {isCategoryCompleted("morning", azkarCategories.find(c => c.id === "morning")?.dhikrs.length || 0) && (
                <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-green-600" />
              )}
            </TabsTrigger>
            <TabsTrigger value="evening" className="relative">
              সন্ধ্যা
              {isCategoryCompleted("evening", azkarCategories.find(c => c.id === "evening")?.dhikrs.length || 0) && (
                <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-green-600" />
              )}
            </TabsTrigger>
            <TabsTrigger value="after-prayer" className="relative">
              নামাজের পর
              {isCategoryCompleted("after-prayer", azkarCategories.find(c => c.id === "after-prayer")?.dhikrs.length || 0) && (
                <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-green-600" />
              )}
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  সেটিংস
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sound Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">সাউন্ড ইফেক্ট</Label>
                      <p className="text-sm text-muted-foreground">প্রতিটি গণনায় টোন বাজান</p>
                    </div>
                    <Switch
                      checked={settings.soundEnabled}
                      onCheckedChange={(checked) => {
                        const newSettings = { ...settings, soundEnabled: checked };
                        setSettings(newSettings);
                        saveAzkarSettings(newSettings);
                      }}
                    />
                  </div>
                  
                  {settings.soundEnabled && (
                    <div className="space-y-2">
                      <Label>ভলিউম</Label>
                      <Slider
                        value={[settings.soundVolume * 100]}
                        onValueChange={([value]) => {
                          const newSettings = { ...settings, soundVolume: value / 100 };
                          setSettings(newSettings);
                          saveAzkarSettings(newSettings);
                        }}
                        max={100}
                        step={1}
                      />
                    </div>
                  )}
                </div>

                {/* Vibration Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <Vibrate className="h-4 w-4" />
                        ভাইব্রেশন
                      </Label>
                      <p className="text-sm text-muted-foreground">প্রতিটি গণনায় ভাইব্রেট করুন</p>
                    </div>
                    <Switch
                      checked={settings.vibrationEnabled}
                      onCheckedChange={(checked) => {
                        const newSettings = { ...settings, vibrationEnabled: checked };
                        setSettings(newSettings);
                        saveAzkarSettings(newSettings);
                      }}
                    />
                  </div>

                  {settings.vibrationEnabled && (
                    <div className="space-y-2">
                      <Label>ভাইব্রেশন প্যাটার্ন</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['short', 'medium', 'long'] as const).map((pattern) => (
                          <Button
                            key={pattern}
                            variant={settings.vibrationPattern === pattern ? "default" : "outline"}
                            onClick={() => {
                              const newSettings = { ...settings, vibrationPattern: pattern };
                              setSettings(newSettings);
                              saveAzkarSettings(newSettings);
                              if ('vibrate' in navigator) {
                                navigator.vibrate(getVibrationPattern(newSettings));
                              }
                            }}
                          >
                            {pattern === 'short' ? 'ছোট' : pattern === 'medium' ? 'মাঝারি' : 'দীর্ঘ'}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {filteredCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getIcon(category.id)}
                      <CardTitle>{category.titleBn}</CardTitle>
                    </div>
                    {isCategoryCompleted(category.id, category.dhikrs.length) && (
                      <Badge className="bg-green-600">
                        সম্পূর্ণ ✓
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-xs">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>

              {category.dhikrs.map((dhikr, index) => {
                const currentCount = getTodayDhikrCount(category.id, index);
                const isComplete = currentCount >= dhikr.count;

                return (
                  <Card 
                    key={index}
                    className={`transition-all ${isComplete ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""}`}
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
                      <div className="text-right flex items-start justify-between gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => playAudio(dhikr.arabic)}
                          className="flex-shrink-0"
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <p className="text-2xl leading-loose font-arabic flex-1">
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleReset(category.id, index)}
                          disabled={currentCount === 0}
                        >
                          ↺
                        </Button>
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
