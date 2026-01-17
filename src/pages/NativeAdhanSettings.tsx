/**
 * ============================================================================
 * NATIVE ADHAN & ALARM SETTINGS PAGE
 * ============================================================================
 *
 * This page provides UI for managing native Capacitor-based prayer alarms.
 * 
 * IMPORTANT:
 * - Native alarms ONLY work on Android/iOS builds
 * - On web, shows a message directing users to install the native app
 *
 * ============================================================================
 */

import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  BellOff,
  Volume2,
  Smartphone,
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  Trash2,
  RefreshCw,
  Play,
  Timer,
  Bug,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { toast } from "sonner";
import { useNativeNotifications } from "@/hooks/useNativeNotifications";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Prayer names for display
const PRAYERS = [
  { key: 'fajr', name: 'ফজর', english: 'Fajr' },
  { key: 'dhuhr', name: 'যোহর', english: 'Dhuhr' },
  { key: 'asr', name: 'আসর', english: 'Asr' },
  { key: 'maghrib', name: 'মাগরিব', english: 'Maghrib' },
  { key: 'isha', name: 'ইশা', english: 'Isha' },
];

const NativeAdhanSettings = () => {
  const {
    hasPermission,
    isNative,
    isAndroid,
    isIOS,
    isWeb,
    pendingAlarms,
    loading,
    logs,
    initialized,
    requestPermission,
    schedulePrayerTimesFromStrings,
    cancelAllAlarms,
    sendTestNotification,
    sendImmediateNotification,
    refreshPendingAlarms,
    clearLogs
  } = useNativeNotifications();

  const [showDebug, setShowDebug] = useState(false);
  const [prayerTimings, setPrayerTimings] = useState<any>(null);
  const [alarmsEnabled, setAlarmsEnabled] = useState<{ [key: string]: boolean }>({
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
  });

  // Load cached prayer times
  useEffect(() => {
    const cached = localStorage.getItem('prayerTimes');
    if (cached) {
      try {
        const data = JSON.parse(cached);
        setPrayerTimings(data.timings);
      } catch (e) {
        console.error('Error loading cached prayer times:', e);
      }
    }

    // Load alarm preferences
    const savedPrefs = localStorage.getItem('nativeAlarmPrefs');
    if (savedPrefs) {
      try {
        setAlarmsEnabled(JSON.parse(savedPrefs));
      } catch (e) {}
    }
  }, []);

  // Save alarm preferences
  const saveAlarmPrefs = (prefs: { [key: string]: boolean }) => {
    localStorage.setItem('nativeAlarmPrefs', JSON.stringify(prefs));
    setAlarmsEnabled(prefs);
  };

  const handleEnablePermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      toast.success('✅ নোটিফিকেশন অনুমতি দেওয়া হয়েছে!');
    } else {
      toast.error('❌ নোটিফিকেশন অনুমতি প্রত্যাখ্যান করা হয়েছে');
    }
  };

  const handleScheduleAllAlarms = async () => {
    if (!prayerTimings) {
      toast.error('প্রথমে নামাজের সময় লোড করুন');
      return;
    }

    try {
      await schedulePrayerTimesFromStrings({
        Fajr: prayerTimings.Fajr,
        Dhuhr: prayerTimings.Dhuhr,
        Asr: prayerTimings.Asr,
        Maghrib: prayerTimings.Maghrib,
        Isha: prayerTimings.Isha,
      });
      toast.success('✅ সকল নামাজের এলার্ম সেট করা হয়েছে!');
    } catch (error) {
      toast.error('এলার্ম সেট করতে সমস্যা হয়েছে');
    }
  };

  const handleCancelAllAlarms = async () => {
    await cancelAllAlarms();
    toast.success('সকল এলার্ম বাতিল করা হয়েছে');
  };

  const handleTestIn1Minute = async () => {
    const triggerTime = await sendTestNotification(60);
    if (triggerTime) {
      toast.success(`🔔 টেস্ট আযান ১ মিনিট পরে বাজবে! (${triggerTime.toLocaleTimeString()})`);
    }
  };

  const handleImmediateTest = async () => {
    await sendImmediateNotification();
    toast.success('🎵 আযান সাউন্ড টেস্ট পাঠানো হয়েছে!');
  };

  // ============================================================================
  // WEB PLATFORM WARNING
  // ============================================================================
  if (isWeb && initialized) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopBar title="🕌 আযান ও এলার্ম" showBack />
        
        <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
          <Card className="p-6 text-center space-y-4 border-amber-500/50 bg-amber-500/5">
            <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
              <Globe className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">ওয়েব ভার্সন</h3>
              <p className="text-sm text-muted-foreground">
                ব্যাকগ্রাউন্ড আযান এলার্ম শুধুমাত্র <strong>Android/iOS</strong> অ্যাপে কাজ করে।
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-left">
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                ওয়েব লিমিটেশন:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• ব্রাউজার বন্ধ থাকলে নোটিফিকেশন আসবে না</li>
                <li>• ব্যাকগ্রাউন্ডে আযান বাজবে না</li>
                <li>• Battery optimization এলার্ম বন্ধ করে দিতে পারে</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium">নেটিভ অ্যাপ ইনস্টল করুন:</p>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full" onClick={() => window.open('/install', '_self')}>
                  <Smartphone className="mr-2 h-4 w-4" />
                  অ্যাপ ইনস্টল করুন
                </Button>
              </div>
            </div>
          </Card>

          {/* Info about current notification system */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Bell className="h-4 w-4" />
              বর্তমান নোটিফিকেশন সিস্টেম
            </h4>
            <p className="text-sm text-muted-foreground">
              ওয়েব ভার্সনে পুশ নোটিফিকেশন ব্যবহার করা হয়। সম্পূর্ণ আযান এলার্মের জন্য{' '}
              <a href="/notifications" className="text-primary underline">
                নোটিফিকেশন সেটিংস
              </a>{' '}
              দেখুন।
            </p>
          </Card>
        </main>

        <BottomNav />
      </div>
    );
  }

  // ============================================================================
  // NATIVE PLATFORM UI
  // ============================================================================
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="🕌 আযান ও এলার্ম" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Platform Badge */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="gap-1">
            <Smartphone className="h-3 w-3" />
            {isAndroid ? 'Android' : isIOS ? 'iOS' : 'Native'}
          </Badge>
          {loading && (
            <Badge variant="secondary" className="gap-1">
              <RefreshCw className="h-3 w-3 animate-spin" />
              লোড হচ্ছে...
            </Badge>
          )}
        </div>

        {/* Permission Status Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {hasPermission ? (
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <BellOff className="h-6 w-6 text-red-500" />
                </div>
              )}
              <div>
                <h3 className="font-semibold">
                  {hasPermission ? 'নোটিফিকেশন সক্ষম' : 'অনুমতি প্রয়োজন'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {hasPermission 
                    ? 'ব্যাকগ্রাউন্ড আযান কাজ করবে' 
                    : 'আযান এলার্মের জন্য অনুমতি দিন'}
                </p>
              </div>
            </div>
          </div>

          {!hasPermission && (
            <Button className="w-full mt-4" onClick={handleEnablePermission}>
              <Bell className="mr-2 h-4 w-4" />
              অনুমতি দিন
            </Button>
          )}
        </Card>

        {/* Schedule Alarms Card */}
        {hasPermission && (
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-1">প্রতিদিনের আযান এলার্ম</h3>
              <p className="text-sm text-muted-foreground">
                {prayerTimings 
                  ? 'নামাজের সময় অনুযায়ী এলার্ম সেট করুন'
                  : 'প্রথমে নামাজের সময় পেজ থেকে টাইম লোড করুন'}
              </p>
            </div>

            {prayerTimings && (
              <div className="space-y-2">
                {PRAYERS.map((prayer) => (
                  <div key={prayer.key} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{prayer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {prayerTimings[prayer.english] || '--:--'}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={alarmsEnabled[prayer.key]}
                      onCheckedChange={(checked) => {
                        const newPrefs = { ...alarmsEnabled, [prayer.key]: checked };
                        saveAlarmPrefs(newPrefs);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleScheduleAllAlarms} disabled={!prayerTimings}>
                <Volume2 className="mr-2 h-4 w-4" />
                সকল এলার্ম সেট করুন
              </Button>
              <Button variant="outline" onClick={handleCancelAllAlarms}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Test Buttons Card */}
        {hasPermission && (
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-1">🔔 টেস্ট আযান</h3>
              <p className="text-sm text-muted-foreground">
                এলার্ম সঠিকভাবে কাজ করছে কিনা পরীক্ষা করুন
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={handleTestIn1Minute}>
                <Timer className="mr-2 h-4 w-4" />
                ১ মিনিট পরে
              </Button>
              <Button variant="outline" onClick={handleImmediateTest}>
                <Play className="mr-2 h-4 w-4" />
                এখনই বাজান
              </Button>
            </div>
          </Card>
        )}

        {/* Pending Alarms Card */}
        {hasPermission && pendingAlarms.length > 0 && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">পেন্ডিং এলার্ম ({pendingAlarms.length})</h3>
              <Button variant="ghost" size="sm" onClick={refreshPendingAlarms}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="max-h-40">
              <div className="space-y-2">
                {pendingAlarms.map((alarm, index) => (
                  <div key={index} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                    <span>{alarm.title || `Alarm #${alarm.id}`}</span>
                    <Badge variant="secondary">ID: {alarm.id}</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        )}

        {/* Debug Panel (Development) */}
        <Collapsible open={showDebug} onOpenChange={setShowDebug}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <Bug className="h-4 w-4" />
                ডিবাগ প্যানেল
              </span>
              {showDebug ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="p-4 mt-2 space-y-4 border-dashed">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">লগ ({logs.length})</h4>
                <Button variant="ghost" size="sm" onClick={clearLogs}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="max-h-60">
                <div className="space-y-1 font-mono text-xs">
                  {logs.slice().reverse().map((log, index) => (
                    <div key={index} className={`p-1 rounded ${log.success ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                      <span className="text-muted-foreground">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                      {' '}
                      <span className={log.success ? 'text-green-600' : 'text-red-600'}>
                        [{log.action}]
                      </span>
                      {' '}
                      {log.details}
                    </div>
                  ))}
                  {logs.length === 0 && (
                    <div className="text-muted-foreground text-center py-4">
                      কোনো লগ নেই
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="text-xs text-muted-foreground space-y-1">
                <div>Platform: {isAndroid ? 'Android' : isIOS ? 'iOS' : 'Web'}</div>
                <div>Permission: {hasPermission ? '✅ Granted' : '❌ Denied'}</div>
                <div>Pending Alarms: {pendingAlarms.length}</div>
                <div>Initialized: {initialized ? '✅' : '❌'}</div>
              </div>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Info Card */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            গুরুত্বপূর্ণ তথ্য
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• অ্যাপ সম্পূর্ণ বন্ধ থাকলেও এলার্ম বাজবে</li>
            <li>• Battery optimization বন্ধ রাখুন (Settings → Apps)</li>
            <li>• Xiaomi/Huawei/Samsung এ Auto-start চালু করুন</li>
            <li>• Do Not Disturb মোড এলার্ম বন্ধ করে দিতে পারে</li>
          </ul>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default NativeAdhanSettings;
