import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Moon,
  Sun,
  Globe,
  Volume2,
  Download,
  Info,
  Share2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [autoPlay, setAutoPlay] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  useEffect(() => {
    const savedAutoPlay = localStorage.getItem('autoPlay') === 'true';
    const savedOffline = localStorage.getItem('offlineMode') === 'true';
    setAutoPlay(savedAutoPlay);
    setOfflineMode(savedOffline);
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
