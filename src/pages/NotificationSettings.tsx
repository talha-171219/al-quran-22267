import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Volume2, VolumeX, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import {
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
  isSubscribedToPushNotifications,
  updateSubscriptionSettings,
  isPushNotificationSupported
} from "@/utils/pushNotifications";
import { saveAlarmSettings, loadAlarmSettings, saveAdhanSettings, loadAdhanSettings } from '@/utils/prayerNotifications';
import { triggerTestPrayerNow } from '@/services/prayerNotifications';
import { startBackgroundTimer } from '@/utils/backgroundPrayerTimer';

const NotificationSettings = () => {
  const [isSupported, setIsSupported] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [prayerNotifications, setPrayerNotifications] = useState(true);
  const [adhanSound, setAdhanSound] = useState(true);
  const [perPrayerAlarms, setPerPrayerAlarms] = useState<{ [key: string]: boolean }>({});
  const [perPrayerAdhan, setPerPrayerAdhan] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = async () => {
    setIsLoading(true);
    try {
      // Check if push notifications are supported
      const supported = isPushNotificationSupported();
      setIsSupported(supported);

      if (!supported) {
        setIsLoading(false);
        return;
      }

      // Check if already subscribed
      const subscribed = await isSubscribedToPushNotifications();
      setIsSubscribed(subscribed);

      // Load settings from localStorage
      const prayerEnabled = localStorage.getItem('prayerNotificationsEnabled') !== 'false';
      const adhanEnabled = localStorage.getItem('adhanSoundEnabled') !== 'false';
      setPrayerNotifications(prayerEnabled);
      setAdhanSound(adhanEnabled);

      // per-prayer settings
      const savedAlarms = loadAlarmSettings();
      const savedAdhans = loadAdhanSettings();
      setPerPrayerAlarms(savedAlarms);
      setPerPrayerAdhan(savedAdhans);
    } catch (error) {
      console.error('Error checking notification status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnableNotifications = async () => {
    setIsLoading(true);
    try {
      const subscription = await subscribeToPushNotifications(
        undefined,
        prayerNotifications,
        adhanSound
      );

      if (subscription) {
        setIsSubscribed(true);
        toast.success('✅ নোটিফিকেশন সক্ষম করা হয়েছে!');
        // Auto-start scheduler if prayer times cached
        try {
          const cached = localStorage.getItem('prayerTimes');
          if (cached) {
            const data = JSON.parse(cached);
            const savedAlarms = loadAlarmSettings();
            const savedAdhans = loadAdhanSettings();
            startBackgroundTimer(data.timings, savedAlarms, savedAdhans);
          }
        } catch (e) {
          console.error('Error auto-starting background timer after subscribe:', e);
        }
      } else {
        toast.error('❌ নোটিফিকেশন অনুমতি প্রত্যাখ্যান করা হয়েছে');
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
      toast.error('নোটিফিকেশন সক্ষম করতে সমস্যা হয়েছে');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableNotifications = async () => {
    setIsLoading(true);
    try {
      await unsubscribeFromPushNotifications();
      setIsSubscribed(false);
      toast.success('নোটিফিকেশন বন্ধ করা হয়েছে');
    } catch (error) {
      console.error('Error disabling notifications:', error);
      toast.error('নোটিফিকেশন বন্ধ করতে সমস্যা হয়েছে');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrayerNotificationsToggle = async (enabled: boolean) => {
    setPrayerNotifications(enabled);
    if (isSubscribed) {
      try {
        await updateSubscriptionSettings(enabled, adhanSound);
        toast.success(enabled ? 'নামাজের নোটিফিকেশন চালু করা হয়েছে' : 'নামাজের নোটিফিকেশন বন্ধ করা হয়েছে');
      } catch (error) {
        toast.error('সেটিংস আপডেট করতে সমস্যা হয়েছে');
      }
    }
  };

  const handleAdhanSoundToggle = async (enabled: boolean) => {
    setAdhanSound(enabled);
    if (isSubscribed) {
      try {
        await updateSubscriptionSettings(prayerNotifications, enabled);
        toast.success(enabled ? 'আযান সাউন্ড চালু করা হয়েছে' : 'আযান সাউন্ড বন্ধ করা হয়েছে');
      } catch (error) {
        toast.error('সেটিংস আপডেট করতে সমস্যা হয়েছে');
      }
    }
  };

  const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  const handleTogglePrayerFor = (prayer: string, enabled?: boolean) => {
    const current = !!perPrayerAlarms[prayer];
    const newVal = typeof enabled === 'boolean' ? enabled : !current;
    const newSettings = { ...perPrayerAlarms, [prayer]: newVal };
    setPerPrayerAlarms(newSettings);
    saveAlarmSettings(newSettings);
    toast.success(`${prayer} alarm ${newSettings[prayer] ? 'enabled' : 'disabled'}`);
  };

  const handleToggleAdhanFor = (prayer: string, enabled?: boolean) => {
    const current = !!perPrayerAdhan[prayer];
    const newVal = typeof enabled === 'boolean' ? enabled : !current;
    const newSettings = { ...perPrayerAdhan, [prayer]: newVal };
    setPerPrayerAdhan(newSettings);
    saveAdhanSettings(newSettings);
    toast.success(`${prayer} adhan ${newSettings[prayer] ? 'enabled' : 'disabled'}`);
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopBar title="নোটিফিকেশন সেটিংস" showBack />
        <main className="max-w-lg mx-auto px-4 py-6">
          <Card className="p-6 text-center space-y-4">
            <BellOff className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-semibold mb-2">নোটিফিকেশন সাপোর্ট নেই</h3>
              <p className="text-sm text-muted-foreground">
                আপনার ব্রাউজার পুশ নোটিফিকেশন সাপোর্ট করে না।
              </p>
            </div>
          </Card>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="নোটিফিকেশন সেটিংস" showBack />

      <main className="w-full max-w-full sm:max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Status Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isSubscribed ? (
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <BellOff className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div>
                <h3 className="font-semibold">
                  {isSubscribed ? 'নোটিফিকেশন সক্ষম' : 'নোটিফিকেশন বন্ধ'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isSubscribed 
                    ? 'নামাজের সময় নোটিফিকেশন পাবেন' 
                    : 'নোটিফিকেশন পেতে সক্ষম করুন'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            {isSubscribed ? (
              <>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleDisableNotifications}
                disabled={isLoading}
              >
                <BellOff className="mr-2 h-4 w-4" />
                নোটিফিকেশন বন্ধ করুন
              </Button>

              {/* Test Adhan button for quick verification */}
              <div className="mt-3">
                <Button
                  variant="ghost"
                  className="w-full text-sm"
                  onClick={() => triggerTestPrayerNow('Dhuhr')}
                >
                  টেস্ট আযান চালান
                </Button>
              </div>

          {/* Per-prayer toggles */}
          <Card className="p-6 space-y-4 max-h-[60vh] overflow-auto">
            <div>
              <h3 className="font-semibold mb-1">প্রতিটি নামাজের জন্য সেটিংস</h3>
              <p className="text-sm text-muted-foreground">কোন কোন নামাজের জন্য নোটিফিকেশন বা আযান পেতে চান তা বেছে নিন</p>
            </div>

            <div className="space-y-3">
              {prayers.map((prayer) => (
                <div key={prayer} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">{prayer}</div>
                      <div className="text-sm text-muted-foreground">নোটিফিকেশন ও আযান কাস্টমাইজ করুন</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={!!perPrayerAdhan[prayer]}
                      onCheckedChange={(checked) => handleToggleAdhanFor(prayer, !!checked)}
                      disabled={!isSubscribed || isLoading}
                    />
                    <Switch
                      checked={!!perPrayerAlarms[prayer]}
                      onCheckedChange={(checked) => handleTogglePrayerFor(prayer, !!checked)}
                      disabled={!isSubscribed || isLoading}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
              </>
            ) : (
              <Button
                className="w-full"
                onClick={handleEnableNotifications}
                disabled={isLoading}
              >
                <Bell className="mr-2 h-4 w-4" />
                নোটিফিকেশন সক্ষম করুন
              </Button>
            )}
          </div>
        </Card>

        {/* Prayer Notifications Settings */}
        <Card className="p-6 space-y-4 max-h-[50vh] overflow-auto">
          <div>
            <h3 className="font-semibold mb-1">নোটিফিকেশন সেটিংস</h3>
            <p className="text-sm text-muted-foreground">
              আপনার পছন্দ অনুযায়ী নোটিফিকেশন কাস্টমাইজ করুন
            </p>
          </div>

            <div className="space-y-4">
            {/* Prayer Time Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">নামাজের সময় নোটিফিকেশন</div>
                  <div className="text-sm text-muted-foreground">
                    নামাজের সময় হলে নোটিফিকেশন পান
                  </div>
                </div>
              </div>
              <Switch
                checked={prayerNotifications}
                onCheckedChange={(checked) => handlePrayerNotificationsToggle(!!checked)}
                disabled={!isSubscribed || isLoading}
              />
            </div>

            {/* Adhan Sound */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {adhanSound ? (
                  <Volume2 className="h-5 w-5 text-primary" />
                ) : (
                  <VolumeX className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <div className="font-medium">আযান সাউন্ড</div>
                  <div className="text-sm text-muted-foreground">
                    নোটিফিকেশনে আযান বাটন দেখান
                  </div>
                </div>
              </div>
              <Switch
                checked={adhanSound}
                onCheckedChange={(checked) => handleAdhanSoundToggle(!!checked)}
                disabled={!isSubscribed || isLoading}
              />
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            নোটিফিকেশন সম্পর্কে
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• অ্যাপ বন্ধ থাকলেও নোটিফিকেশন পাবেন</li>
            <li>• প্রতিটি নামাজের সময় স্বয়ংক্রিয় নোটিফিকেশন</li>
            <li>• নোটিফিকেশন থেকে সরাসরি আযান শুনতে পারবেন</li>
            <li>• যেকোনো সময় বন্ধ করতে পারবেন</li>
          </ul>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default NotificationSettings;
