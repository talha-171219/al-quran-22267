import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sunrise, Sunset, Sun, Moon, MapPin, Bell, Volume2, X, Settings } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState("");
  const [location, setLocation] = useState<string>("");
  const [currentTime, setCurrentTime] = useState("");
  const [countdown, setCountdown] = useState("");
  const [nextPrayer, setNextPrayer] = useState("");
  const [currentPrayer, setCurrentPrayer] = useState("");
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [showAthanDialog, setShowAthanDialog] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(false);
  const [backgroundEnabled, setBackgroundEnabled] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    Fajr: true,
    Dhuhr: true,
    Asr: true,
    Maghrib: true,
    Isha: true,
  });

  const prayerIcons = {
    Fajr: Sunrise,
    Sunrise: Sun,
    Dhuhr: Sun,
    Asr: Sun,
    Maghrib: Sunset,
    Isha: Moon,
  };

  const prayerNamesBn: { [key: string]: string } = {
    Fajr: "ফজর",
    Sunrise: "সূর্যোদয়",
    Dhuhr: "যুহর",
    Asr: "আসর",
    Maghrib: "মাগরিব",
    Isha: "এশা",
  };

  useEffect(() => {
    // Check permissions on load
    const checkPermissions = async () => {
      if ('permissions' in navigator) {
        try {
          const locPerm = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
          setLocationPermission(locPerm.state === 'granted');
          
          if ('Notification' in window) {
            setNotificationPermission(Notification.permission === 'granted');
          }
        } catch (error) {
          console.error('Permission check error:', error);
        }
      }
    };

    checkPermissions();

    const cached = localStorage.getItem("prayerTimes");
    if (cached) {
      const data = JSON.parse(cached);
      setPrayerTimes(data.timings);
      setHijriDate(data.hijriDate);
      setLocation(data.location);
    } else {
      setShowPermissionDialog(true);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!prayerTimes) return;

    const updatePrayerStatus = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const prayers = [
        { name: "Fajr", time: prayerTimes.Fajr },
        { name: "Dhuhr", time: prayerTimes.Dhuhr },
        { name: "Asr", time: prayerTimes.Asr },
        { name: "Maghrib", time: prayerTimes.Maghrib },
        { name: "Isha", time: prayerTimes.Isha },
      ];

      const prayerMinutes = prayers.map((p) => {
        const [hours, mins] = p.time.split(":").map(Number);
        return { ...p, minutes: hours * 60 + mins };
      });

      let current = prayerMinutes[prayerMinutes.length - 1].name;
      let next = prayerMinutes[0];

      for (let i = 0; i < prayerMinutes.length; i++) {
        if (currentMinutes >= prayerMinutes[i].minutes) {
          current = prayerMinutes[i].name;
          next = prayerMinutes[(i + 1) % prayerMinutes.length];
        } else {
          break;
        }
      }

      setCurrentPrayer(current);
      setNextPrayer(next.name);

      // Calculate countdown
      let nextMinutes = next.minutes;
      if (nextMinutes <= currentMinutes) {
        nextMinutes += 24 * 60;
      }
      const diff = nextMinutes - currentMinutes;
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;
      const seconds = 60 - now.getSeconds();
      setCountdown(`${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    };

    updatePrayerStatus();
    const interval = setInterval(updatePrayerStatus, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  const requestPermissions = async () => {
    setShowPermissionDialog(false);
    
    // Request location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermission(true);
          getPrayerTimes(position.coords.latitude, position.coords.longitude);
          toast.success("লোকেশন অনুমতি প্রদান করা হয়েছে");
        },
        () => {
          toast.error("লোকেশন অনুমতি প্রয়োজন");
          // Fallback to Bogra
          getPrayerTimesByCity("Bogra", "Bangladesh");
        }
      );
    }

    // Request notifications
    if ('Notification' in window && Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission === 'granted');
      if (permission === 'granted') {
        toast.success("নোটিফিকেশন অনুমতি প্রদান করা হয়েছে");
        setShowAthanDialog(true);
      }
    } else if (Notification.permission === 'granted') {
      setNotificationPermission(true);
      setShowAthanDialog(true);
    }
  };

  const getPrayerTimes = async (lat: number, lon: number) => {
    try {
      const date = new Date();
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${Math.floor(date.getTime() / 1000)}?latitude=${lat}&longitude=${lon}&method=2`
      );
      const data = await response.json();

      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
        const hijri = `${data.data.date.hijri.month.en} ${data.data.date.hijri.day}, ${data.data.date.hijri.year} AH`;
        setHijriDate(hijri);
        setLocation(data.data.meta.timezone.split("/")[1] || "Unknown");

        localStorage.setItem(
          "prayerTimes",
          JSON.stringify({
            timings: data.data.timings,
            hijriDate: hijri,
            location: data.data.meta.timezone.split("/")[1],
          })
        );

        toast.success("নামাজের সময় লোড হয়েছে");
      }
    } catch (error) {
      toast.error("নামাজের সময় লোড করতে ব্যর্থ");
    }
  };

  const getPrayerTimesByCity = async (city: string, country: string) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`
      );
      const data = await response.json();

      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
        const hijri = `${data.data.date.hijri.month.en} ${data.data.date.hijri.day}, ${data.data.date.hijri.year} AH`;
        setHijriDate(hijri);
        setLocation(city);

        localStorage.setItem(
          "prayerTimes",
          JSON.stringify({
            timings: data.data.timings,
            hijriDate: hijri,
            location: city,
          })
        );

        toast.success("নামাজের সময় লোড হয়েছে");
      }
    } catch (error) {
      toast.error("নামাজের সময় লোড করতে ব্যর্থ");
    }
  };

  const enableBackground = () => {
    setBackgroundEnabled(true);
    setShowAthanDialog(false);
    toast.success("অ্যাপ ব্যাকগ্রাউন্ড সক্রিয় করা হয়েছে");
  };

  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="নামাজের সময়" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Header Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
          <div className="absolute top-0 right-0 opacity-20">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <path
                d="M100,20 L110,40 L110,100 L90,100 L90,40 Z M100,20 L100,10 L105,10 L105,18 L95,18 L95,10 L100,10 Z"
                fill="currentColor"
              />
              <circle cx="100" cy="12" r="4" fill="currentColor" />
            </svg>
          </div>

          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <h3 className="font-semibold">{location || "Bogra"}</h3>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span>{currentTime}</span>
                <span>🔋 63%</span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl opacity-90">{currentPrayer ? prayerNamesBn[currentPrayer] : ""}</h2>
              <p className="text-6xl font-bold">
                {currentPrayer && prayerTimes ? prayerTimes[currentPrayer as keyof PrayerTimes]?.replace(/:\d{2}$/, "") : ""}
                <span className="text-2xl ml-2">PM</span>
              </p>
              <p className="text-lg opacity-90">পরবর্তী নামাজ {countdown} এ</p>
            </div>
          </CardContent>
        </Card>

        {/* Islamic Date Card */}
        <Card className="bg-card/50 backdrop-blur border-2 border-primary/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{today}</p>
                <p className="text-lg font-semibold font-arabic">{hijriDate}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prayer Times List */}
        {prayerTimes && (
          <div className="space-y-2">
            {Object.entries(prayerTimes).map(([name, time]) => {
              const Icon = prayerIcons[name as keyof typeof prayerIcons];
              if (!Icon) return null;

              const isActive = name === currentPrayer;

              return (
                <Card
                  key={name}
                  className={`transition-all ${
                    isActive
                      ? "bg-primary/10 border-2 border-primary"
                      : "bg-card hover:bg-muted/50"
                  }`}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-full ${
                            isActive ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-lg">
                          {prayerNamesBn[name]}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-mono font-bold">{time}</span>
                        {name !== "Sunrise" && (
                          <div className="flex items-center gap-2">
                            <Volume2 className={`h-4 w-4 ${notificationSettings[name as keyof typeof notificationSettings] ? 'text-primary' : 'text-muted-foreground'}`} />
                            <div className={`w-6 h-6 rounded border-2 ${isActive ? 'border-primary bg-primary' : 'border-muted'} flex items-center justify-center`}>
                              {isActive && <div className="w-3 h-3 bg-primary-foreground rounded-sm" />}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!prayerTimes && (
          <Card className="p-8 text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">নামাজের সময় লোড করুন</h3>
            <p className="text-sm text-muted-foreground mb-4">
              আপনার এলাকার নামাজের সময় দেখতে অনুমতি প্রদান করুন
            </p>
            <Button onClick={() => setShowPermissionDialog(true)} className="gap-2">
              <Bell className="h-4 w-4" />
              অনুমতি প্রদান করুন
            </Button>
          </Card>
        )}
      </main>

      {/* Permission Dialog */}
      <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur">
          <DialogHeader>
            <div className="mx-auto mb-4 relative">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 text-3xl">🔐</div>
              <div className="absolute -bottom-2 -left-2 text-3xl">✨</div>
              <div className="absolute top-8 -right-4 text-2xl">📱</div>
            </div>
            <DialogTitle className="text-center text-xl">
              সঠিক পথে থাকতে, অনুমতি প্রদান করুন
            </DialogTitle>
            <DialogDescription className="text-center">
              নামাজের সময় লোড হচ্ছে...
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">লোকেশন অনুমতি</h4>
                <p className="text-sm text-muted-foreground">
                  আরও নির্ভুল নামাজের সময় পেতে
                </p>
              </div>
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <Bell className="h-6 w-6 text-primary mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">নোটিফিকেশন অনুমতি</h4>
                <p className="text-sm text-muted-foreground">
                  নামাজের নোটিফিকেশন পেতে
                </p>
              </div>
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <Button onClick={requestPermissions} size="lg" className="w-full">
            চালিয়ে যান
          </Button>
        </DialogContent>
      </Dialog>

      {/* Athan Preview Dialog */}
      <Dialog open={showAthanDialog} onOpenChange={setShowAthanDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between mb-2">
              <DialogTitle>আযান প্রিভিউ</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAthanDialog(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="relative h-64 rounded-lg overflow-hidden mb-4">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/5 backdrop-blur-sm" />
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
              <path
                d="M200,50 L230,90 L230,180 L170,180 L170,90 Z M200,50 L200,30 L210,30 L210,45 L190,45 L190,30 L200,30 Z"
                fill="currentColor"
                className="text-primary"
              />
            </svg>
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
              <img
                src="https://raw.githubusercontent.com/prayer-times-web/assets/main/praying-man.png"
                alt="Praying"
                className="h-32 w-32 object-contain mb-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <p className="text-sm text-muted-foreground">
                অনুমতি সক্রিয় করলে নামাজের রিমাইন্ডার আরও কার্যকর হবে। আল্লাহ আপনাকে বরকত দিন!
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-semibold mb-1">অ্যাপ ব্যাকগ্রাউন্ড সক্রিয় করুন</h4>
                <p className="text-xs text-muted-foreground">
                  ব্যাকগ্রাউন্ডে অ্যাপ চলতে থাকবে
                </p>
              </div>
              <Switch checked={backgroundEnabled} onCheckedChange={setBackgroundEnabled} />
            </div>

            <Button onClick={enableBackground} size="lg" className="w-full">
              সক্রিয় করুন
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default PrayerTimes;
