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
  TrendingUp,
  Package,
  RefreshCw,
  CheckCircle2,
  Database,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { AzkarStatsCard } from "@/components/azkar/AzkarStats";
import { calculateAzkarStats } from "@/utils/azkarTracker";
import { useNavigate } from "react-router-dom";
import { versionManager } from "@/utils/versionManager";
import { CacheManagement } from "@/components/settings/CacheManagement";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [autoPlay, setAutoPlay] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [azkarStats, setAzkarStats] = useState(calculateAzkarStats());
  const [currentVersion, setCurrentVersion] = useState('');
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);

  useEffect(() => {
    const savedAutoPlay = localStorage.getItem('autoPlay') === 'true';
    const savedOffline = localStorage.getItem('offlineMode') === 'true';
    setAutoPlay(savedAutoPlay);
    setOfflineMode(savedOffline);
    
    // Check notification permission
    if ('Notification' in window) {
      setNotificationEnabled(Notification.permission === 'granted');
    }

    // Refresh azkar stats
    setAzkarStats(calculateAzkarStats());
    
    // Load current version
    const loadVersion = async () => {
      const version = versionManager.getCurrentVersion();
      setCurrentVersion(version);
    };
    loadVersion();
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
    toast.info(`আল-কুরআন অ্যাপ v${currentVersion} - বাংলা কুরআন পাঠের জন্য সম্পূর্ণ সমাধান`);
  };

  const handleCheckForUpdates = async () => {
    setIsCheckingUpdate(true);
    toast.info('আপডেট চেক করা হচ্ছে...');
    
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        
        if (registration) {
          // Force update check
          await registration.update();
          
          // Wait a bit for the update to be processed
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Check if update is available
          const updateAvailable = await versionManager.isUpdateAvailable();
          
          if (updateAvailable) {
            if (registration.waiting) {
              toast.success('নতুন আপডেট পাওয়া গেছে! 🎉', {
                description: 'আপডেট বাটনে ক্লিক করুন',
                duration: 5000,
              });
            } else {
              toast.info('আপডেট ডাউনলোড হচ্ছে...', {
                description: 'কিছুক্ষণ পর আবার চেক করুন',
                duration: 3000,
              });
            }
          } else {
            toast.success('আপনি সর্বশেষ সংস্করণ ব্যবহার করছেন ✓', {
              description: `v${currentVersion}`,
              duration: 3000,
            });
          }
        } else {
          toast.error('Service Worker খুঁজে পাওয়া যায়নি');
        }
      } else {
        toast.error('আপনার ব্রাউজার আপডেট চেক সাপোর্ট করে না');
      }
    } catch (error) {
      console.error('Update check error:', error);
      toast.error('আপডেট চেক করতে সমস্যা হয়েছে');
    } finally {
      setIsCheckingUpdate(false);
    }
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

        {/* Cache Management Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">ক্যাশ ম্যানেজমেন্ট</h3>
          </div>
          <CacheManagement />
        </div>

        {/* Azkar Progress Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              আযকার অগ্রগতি
            </h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/azkar')}
            >
              আযকার পড়ুন
            </Button>
          </div>
          <AzkarStatsCard stats={azkarStats} />
        </div>

        <Card className="p-4 space-y-3">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Package className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <div className="font-medium">বর্তমান সংস্করণ</div>
                <div className="text-sm text-muted-foreground">v{currentVersion}</div>
              </div>
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            
            <Button 
              onClick={handleCheckForUpdates}
              disabled={isCheckingUpdate}
              className="w-full"
              variant="outline"
            >
              {isCheckingUpdate ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  চেক করা হচ্ছে...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  আপডেট চেক করুন
                </>
              )}
            </Button>
          </div>

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
            আল-কুরআন অ্যাপ v{currentVersion}
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
