import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Moon,
  Sun,
  Globe,
  Volume2,
  Download,
  Info,
  Share2,
  Bell,
  Settings as SettingsIcon,
  RotateCcw,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  loadPrayerCalculationSettings,
  savePrayerCalculationSettings,
  resetToDefaultSettings,
  CALCULATION_METHODS,
  type PrayerCalculationSettings,
} from "@/utils/prayerSettings";
import { PrayerTimeComparison } from "@/components/prayer/PrayerTimeComparison";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [autoPlay, setAutoPlay] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [prayerSettings, setPrayerSettings] = useState<PrayerCalculationSettings>(loadPrayerCalculationSettings());
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const savedAutoPlay = localStorage.getItem('autoPlay') === 'true';
    const savedOffline = localStorage.getItem('offlineMode') === 'true';
    setAutoPlay(savedAutoPlay);
    setOfflineMode(savedOffline);
    
    // Check notification permission
    if ('Notification' in window) {
      setNotificationEnabled(Notification.permission === 'granted');
    }

    // Load prayer settings
    setPrayerSettings(loadPrayerCalculationSettings());
  }, []);

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
    toast.success(checked ? 'ডার্ক মোড চালু' : 'লাইট মোড চালু');
  };

  const handleAutoPlayToggle = (checked: boolean) => {
    setAutoPlay(checked);
    localStorage.setItem('autoPlay', String(checked));
    toast.success(checked ? 'অটো-প্লে চালু' : 'অটো-প্লে বন্ধ');
  };

  const handleOfflineToggle = (checked: boolean) => {
    setOfflineMode(checked);
    localStorage.setItem('offlineMode', String(checked));
    toast.success(checked ? 'অফলাইন মোড চালু' : 'অফলাইন মোড বন্ধ');
  };

  const handleNotificationToggle = async (checked: boolean) => {
    if (!('Notification' in window)) {
      toast.error('আপনার ব্রাউজার নোটিফিকেশন সাপোর্ট করে না');
      return;
    }

    if (checked) {
      try {
        // Request permission - this will show browser's native popup
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          setNotificationEnabled(true);
          toast.success('নোটিফিকেশন চালু হয়েছে ✓');
          
          // Show a test notification
          new Notification('নোটিফিকেশন চালু হয়েছে', {
            body: 'আপনি এখন নামাজের সময় জানান পাবেন',
            icon: '/icon-192.png',
            badge: '/icon-192.png',
          });
          
        } else if (permission === 'denied') {
          toast.error('নোটিফিকেশন অনুমতি প্রত্যাখ্যান করা হয়েছে। ব্রাউজার সেটিংস থেকে চালু করুন।');
          setNotificationEnabled(false);
        } else {
          toast.error('নোটিফিকেশন অনুমতি দেওয়া হয়নি');
          setNotificationEnabled(false);
        }
      } catch (error) {
        console.error('Notification permission error:', error);
        toast.error('নোটিফিকেশন চালু করতে সমস্যা হয়েছে');
        setNotificationEnabled(false);
      }
    } else {
      toast.info('নোটিফিকেশন বন্ধ করতে ব্রাউজার সেটিংস ব্যবহার করুন');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'আল-কুরআন অ্যাপ',
          text: 'বাংলা কুরআন, তাফসীর, অডিও এবং আরও অনেক কিছু',
          url: window.location.href,
        });
        toast.success('শেয়ার সফল হয়েছে');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error('শেয়ার ব্যর্থ হয়েছে');
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('লিংক কপি হয়েছে');
    }
  };

  const handleAbout = () => {
    toast.info('আল-কুরআন অ্যাপ v1.0.0 - বাংলা কুরআন পাঠের জন্য সম্পূর্ণ সমাধান');
  };

  const handleMethodChange = (value: string) => {
    const methodId = parseInt(value);
    const newSettings = { ...prayerSettings, method: methodId };
    setPrayerSettings(newSettings);
    savePrayerCalculationSettings(newSettings);
    toast.success('নামাজের হিসাব পদ্ধতি পরিবর্তিত হয়েছে');
  };

  const handleTuneChange = (prayer: keyof PrayerCalculationSettings['tuneOffsets'], value: number) => {
    const newSettings = {
      ...prayerSettings,
      tuneOffsets: {
        ...prayerSettings.tuneOffsets,
        [prayer]: value,
      },
    };
    setPrayerSettings(newSettings);
    savePrayerCalculationSettings(newSettings);
  };

  const handleResetSettings = () => {
    resetToDefaultSettings();
    setPrayerSettings(loadPrayerCalculationSettings());
    toast.success('ডিফল্ট সেটিংস পুনরুদ্ধার করা হয়েছে');
  };

  const getMethodName = (methodId: number) => {
    const method = Object.values(CALCULATION_METHODS).find(m => m.id === methodId);
    return method?.nameBn || 'অজানা';
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="সেটিংস" />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
              <div>
                <Label htmlFor="dark-mode" className="font-medium cursor-pointer">
                  ডার্ক মোড
                </Label>
                <p className="text-xs text-muted-foreground">
                  {theme === 'dark' ? 'চালু আছে' : 'বন্ধ আছে'}
                </p>
              </div>
            </div>
            <Switch 
              id="dark-mode" 
              checked={theme === 'dark'}
              onCheckedChange={handleThemeToggle}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary" />
              <div>
                <Label className="font-medium">ভাষা</Label>
                <p className="text-xs text-muted-foreground">বাংলা</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <Label htmlFor="notification-mode" className="font-medium cursor-pointer">
                  নোটিফিকেশন
                </Label>
                <p className="text-xs text-muted-foreground">
                  {notificationEnabled ? 'চালু আছে' : 'বন্ধ আছে'}
                </p>
              </div>
            </div>
            <Switch 
              id="notification-mode" 
              checked={notificationEnabled}
              onCheckedChange={handleNotificationToggle}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-primary" />
              <div>
                <Label htmlFor="audio-mode" className="font-medium cursor-pointer">
                  অটো-প্লে অডিও
                </Label>
                <p className="text-xs text-muted-foreground">
                  {autoPlay ? 'চালু আছে' : 'বন্ধ আছে'}
                </p>
              </div>
            </div>
            <Switch 
              id="audio-mode" 
              checked={autoPlay}
              onCheckedChange={handleAutoPlayToggle}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-primary" />
              <div>
                <Label htmlFor="offline-mode" className="font-medium cursor-pointer">
                  অফলাইন মোড
                </Label>
                <p className="text-xs text-muted-foreground">
                  {offlineMode ? 'চালু আছে' : 'বন্ধ আছে'}
                </p>
              </div>
            </div>
            <Switch 
              id="offline-mode" 
              checked={offlineMode}
              onCheckedChange={handleOfflineToggle}
            />
          </div>
        </Card>

        {/* Prayer Calculation Settings */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <SettingsIcon className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">নামাজের সময় গণনা</h3>
                <p className="text-xs text-muted-foreground">বাংলাদেশের জন্য কাস্টমাইজ করুন</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetSettings}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              রিসেট
            </Button>
          </div>

          {/* Calculation Method */}
          <div className="space-y-2">
            <Label className="font-medium">গণনা পদ্ধতি</Label>
            <Select value={prayerSettings.method.toString()} onValueChange={handleMethodChange}>
              <SelectTrigger>
                <SelectValue placeholder="পদ্ধতি নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CALCULATION_METHODS).map((method) => (
                  <SelectItem key={method.id} value={method.id.toString()}>
                    {method.nameBn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              বর্তমান: {getMethodName(prayerSettings.method)}
            </p>
          </div>

          {/* Time Adjustments */}
          <div className="space-y-3 pt-2">
            <Label className="font-medium">সময় সমন্বয় (মিনিট)</Label>
            <p className="text-xs text-muted-foreground mb-3">
              প্রতিটি নামাজের সময় ম্যানুয়ালি সমন্বয় করুন
            </p>
            
            {Object.entries(prayerSettings.tuneOffsets).map(([prayer, offset]) => {
              const prayerNamesBn: { [key: string]: string } = {
                Fajr: "ফজর",
                Sunrise: "সূর্যোদয়",
                Dhuhr: "যুহর",
                Asr: "আসর",
                Maghrib: "মাগরিব",
                Isha: "এশা",
                Imsak: "ইমসাক",
              };
              
              return (
                <div key={prayer} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">{prayerNamesBn[prayer]}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTuneChange(prayer as keyof PrayerCalculationSettings['tuneOffsets'], Math.max(-5, offset - 1))}
                      disabled={offset <= -5}
                      className="h-7 w-7 p-0"
                    >
                      -
                    </Button>
                    <span className="text-sm font-bold min-w-[40px] text-center">
                      {offset > 0 ? '+' : ''}{offset}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTuneChange(prayer as keyof PrayerCalculationSettings['tuneOffsets'], Math.min(5, offset + 1))}
                      disabled={offset >= 5}
                      className="h-7 w-7 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3">
            <Dialog open={showComparison} onOpenChange={setShowComparison}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full gap-2">
                  <Info className="h-4 w-4" />
                  WeMuslim এর সাথে তুলনা করুন
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>নামাজের সময় যাচাই</DialogTitle>
                  <DialogDescription>
                    বর্তমান সেটিংস দিয়ে নামাজের সময় দেখুন এবং WeMuslim এর সাথে মিলিয়ে দেখুন
                  </DialogDescription>
                </DialogHeader>
                <PrayerTimeComparison />
              </DialogContent>
            </Dialog>
          </div>

          <div className="pt-3 border-t">
            <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
              <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">বিশেষ দ্রষ্টব্য:</p>
                <p>এই সেটিংস বাংলাদেশের অফিসিয়াল নামাজের সময়সূচীর সাথে মিলিয়ে সেট করা হয়েছে। পরিবর্তন করলে WeMuslim বা Islamic Foundation এর সাথে সময় নাও মিলতে পারে।</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 space-y-3">
          <button 
            onClick={handleShare}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
          >
            <Share2 className="h-5 w-5 text-primary" />
            <span className="font-medium">অ্যাপ শেয়ার করুন</span>
          </button>

          <button 
            onClick={handleAbout}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
          >
            <Info className="h-5 w-5 text-primary" />
            <span className="font-medium">অ্যাপ সম্পর্কে</span>
          </button>
        </Card>

        <div className="text-center space-y-1 pt-4">
          <div className="text-xs text-muted-foreground">
            আল-কুরআন অ্যাপ v2.0
          </div>
          <div className="text-xs text-muted-foreground">
            Developed by Monirul Hasan Talha
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;
