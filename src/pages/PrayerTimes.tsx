import { useState, useEffect, useRef } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sunrise, Sunset, Sun, Moon, MapPin, Bell, Volume2, Calendar as CalendarIcon, ChevronDown, X, AlarmClock } from "lucide-react";
import { toast } from "sonner";
import { PrayerCalendar } from "@/components/prayer/PrayerCalendar";
import { AdhanPlayer } from "@/components/prayer/AdhanPlayer";
import { toBengaliNumerals, formatCountdownToBengali, formatBengaliDate } from "@/utils/bengaliUtils";
import { convertTo12Hour, formatCurrentTime12Hour } from "@/utils/timeUtils";
import { getUpcomingEvents } from "@/data/islamicEvents";
import { getDefaultAdhanStyle } from "@/data/adhanAudio";
import {
  scheduleNotification,
  scheduleAdhan,
  getLocationName,
  saveAlarmSettings,
  loadAlarmSettings,
  saveAdhanSettings,
  loadAdhanSettings,
  requestNotificationPermission,
  playAdhan,
} from "@/utils/prayerNotifications";
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
  const [alarmSettings, setAlarmSettings] = useState<{ [key: string]: boolean }>({});
  const [adhanSettings, setAdhanSettings] = useState<{ [key: string]: boolean }>({});
  const adhanTimeouts = useRef<{ [key: string]: NodeJS.Timeout | null }>({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showAdhanPlayer, setShowAdhanPlayer] = useState(false);
  const [battery, setBattery] = useState("--");
  const [audioPermission, setAudioPermission] = useState(false);

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
    // Load saved settings
    setAlarmSettings(loadAlarmSettings());
    setAdhanSettings(loadAdhanSettings());

    // Check permissions on load and request immediately
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

      // Check audio permission
      const audioAllowed = localStorage.getItem("audioPermission");
      setAudioPermission(audioAllowed === "granted");
    };

    checkPermissions();

    const cached = localStorage.getItem("prayerTimes");
    if (cached) {
      const data = JSON.parse(cached);
      setPrayerTimes(data.timings);
      setHijriDate(data.hijriDate);
      setLocation(data.location);
      
      // Auto-refresh prayer times if cached data is old
      const cacheTime = data.timestamp || 0;
      const now = Date.now();
      const oneHour = 60 * 60 * 1000;
      
      if (now - cacheTime > oneHour) {
        // Request location permission immediately for accurate location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              getPrayerTimes(position.coords.latitude, position.coords.longitude);
            },
            () => {
              // Silently fail, use cached data
              toast.info("সংরক্ষিত তথ্য থেকে দেখানো হচ্ছে");
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0
            }
          );
        }
      }
    } else {
      // No cached data, must request permission
      setShowPermissionDialog(true);
    }

    return () => {
      // Clean up adhan timeouts
      Object.values(adhanTimeouts.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  // Schedule prayers when settings or prayer times change
  useEffect(() => {
    if (prayerTimes && Object.keys(alarmSettings).length > 0) {
      scheduleAllPrayers(prayerTimes);
    }
  }, [prayerTimes, alarmSettings, adhanSettings]);

  useEffect(() => {
    // Get battery status
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          setBattery(Math.round(battery.level * 100).toString());
        };
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
      });
    }

    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(formatCurrentTime12Hour(now));
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
      setCountdown(formatCountdownToBengali(hours, minutes, seconds));
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
        (error) => {
          console.error("Location error:", error);
          toast.error("লোকেশন অনুমতি প্রয়োজন");
          // Fallback to Bogra
          getPrayerTimesByCity("Bogra", "Bangladesh");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }

    // Request notifications
    if ('Notification' in window && Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission === 'granted');
      if (permission === 'granted') {
        toast.success("নোটিফিকেশন অনুমতি প্রদান করা হয়েছে");
      }
    } else if (Notification.permission === 'granted') {
      setNotificationPermission(true);
    }

    // Request audio permission (implicit)
    localStorage.setItem("audioPermission", "granted");
    setAudioPermission(true);
    setShowAthanDialog(true);
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
        
        // Get actual city name using reverse geocoding
        const cityName = await getLocationName(lat, lon);
        setLocation(cityName);

        localStorage.setItem(
          "prayerTimes",
          JSON.stringify({
            timings: data.data.timings,
            hijriDate: hijri,
            location: cityName,
            timestamp: Date.now(),
          })
        );

        toast.success(`নামাজের সময় লোড হয়েছে - ${cityName}`);
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
            timestamp: Date.now(),
          })
        );

        toast.success("নামাজের সময় লোড হয়েছে");
      }
    } catch (error) {
      toast.error("নামাজের সময় লোড করতে ব্যর্থ");
    }
  };

  const scheduleAllPrayers = (timings: PrayerTimes) => {
    // Clear existing timeouts
    Object.values(adhanTimeouts.current).forEach(timeout => {
      if (timeout) clearTimeout(timeout);
    });

    // Schedule alarms and adhan for enabled prayers
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    prayers.forEach(prayer => {
      const time = timings[prayer as keyof PrayerTimes];
      
      // Schedule alarm if enabled
      if (alarmSettings[prayer]) {
        scheduleNotification(prayer, time, prayerNamesBn[prayer]);
      }

      // Schedule adhan if enabled
      if (adhanSettings[prayer]) {
        const timeoutId = scheduleAdhan(prayer, time, () => {
          const defaultStyle = getDefaultAdhanStyle();
          playAdhan(defaultStyle.audioUrl);
          
          // Show notification
          if (Notification.permission === 'granted') {
            new Notification(`${prayerNamesBn[prayer]} এর সময়`, {
              body: 'আযান চলছে...',
              icon: '/icon-192.png',
              tag: `adhan-${prayer}`,
            });
          }
        });
        
        if (timeoutId) {
          adhanTimeouts.current[prayer] = timeoutId;
        }
      }
    });
  };

  const enableBackground = () => {
    setBackgroundEnabled(true);
    setShowAthanDialog(false);
    toast.success("অ্যাপ ব্যাকগ্রাউন্ড সক্রিয় করা হয়েছে");
  };

  const today = formatBengaliDate(new Date());
  const upcomingEvents = getUpcomingEvents(3);

  const toggleAlarm = async (prayer: string) => {
    // Request notification permission if not granted
    if (!notificationPermission) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        toast.error("নোটিফিকেশন চালু করতে সেটিংসে যান");
        return;
      }
      setNotificationPermission(true);
    }

    const newSettings = {
      ...alarmSettings,
      [prayer]: !alarmSettings[prayer],
    };
    setAlarmSettings(newSettings);
    saveAlarmSettings(newSettings);

    if (prayerTimes && newSettings[prayer]) {
      const time = prayerTimes[prayer as keyof PrayerTimes];
      scheduleNotification(prayer, time, prayerNamesBn[prayer]);
      toast.success(`${prayerNamesBn[prayer]} এর অ্যালার্ম সেট করা হয়েছে`);
    } else {
      toast.success(`${prayerNamesBn[prayer]} এর অ্যালার্ম বন্ধ করা হয়েছে`);
    }
  };

  const toggleAdhan = async (prayer: string) => {
    // Request notification permission if not granted (for adhan notification)
    if (!notificationPermission) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        toast.error("নোটিফিকেশন চালু করতে সেটিংসে যান");
        return;
      }
      setNotificationPermission(true);
    }

    const newSettings = {
      ...adhanSettings,
      [prayer]: !adhanSettings[prayer],
    };
    setAdhanSettings(newSettings);
    saveAdhanSettings(newSettings);

    if (prayerTimes) {
      scheduleAllPrayers(prayerTimes);
      toast.success(
        `${prayerNamesBn[prayer]} এর আযান ${newSettings[prayer] ? 'চালু' : 'বন্ধ'} করা হয়েছে`
      );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="নামাজের সময়" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Compact Header Card with Status */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 800 400" className="w-full h-full">
              <path
                d="M400,50 L450,100 L450,200 L350,200 L350,100 Z M400,50 L400,20 L420,20 L420,40 L380,40 L380,20 L400,20 Z M340,200 L330,210 L340,220 L460,220 L470,210 L460,200 Z"
                fill="currentColor"
              />
              <circle cx="400" cy="25" r="8" fill="currentColor" />
              <rect x="320" y="220" width="160" height="30" rx="5" fill="currentColor" />
            </svg>
          </div>

          <CardContent className="py-4 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Button variant="ghost" size="sm" className="text-primary-foreground/90 hover:bg-white/10 gap-1 h-8 px-2">
                <MapPin className="h-3 w-3" />
                <span className="text-xs font-medium">{location || "বগুড়া"}</span>
              </Button>
              <div className="flex items-center gap-3 text-xs font-medium">
                <span className="text-base">{currentTime}</span>
                <span className="opacity-90 text-xs">🔋 {toBengaliNumerals(battery)}%</span>
              </div>
            </div>

            <div className="text-center space-y-2 py-2">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-xl font-bold">{currentPrayer ? prayerNamesBn[currentPrayer] : ""}</h2>
                <div className="h-1.5 w-1.5 bg-white rounded-full animate-pulse"></div>
              </div>
              <p className="text-4xl font-bold tracking-tight">
                {currentPrayer && prayerTimes ? (() => {
                  const { time, periodBn } = convertTo12Hour(prayerTimes[currentPrayer as keyof PrayerTimes]);
                  return `${time} ${periodBn}`;
                })() : ""}
              </p>
              <p className="text-sm opacity-90 font-medium">
                পরবর্তী: {countdown}
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-white/20 text-center">
              <p className="text-xs opacity-90">{today}</p>
              <p className="text-xs font-semibold mt-0.5">{hijriDate}</p>
            </div>
          </CardContent>
        </Card>

        {/* Permission Banners */}
        {!notificationPermission && prayerTimes && (
          <Card className="border-orange-500/50 bg-orange-50 dark:bg-orange-950/20">
            <CardContent className="py-3 flex items-center gap-3">
              <Bell className="h-5 w-5 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">নোটিফিকেশন চালু করুন</p>
                <p className="text-xs text-muted-foreground">
                  নামাজের সময় জানান পেতে সেটিংসে যান
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  const granted = await requestNotificationPermission();
                  if (granted) {
                    setNotificationPermission(true);
                    toast.success("নোটিফিকেশন চালু হয়েছে");
                  } else {
                    toast.error("নোটিফিকেশন অনুমতি প্রয়োজন");
                  }
                }}
              >
                চালু করুন
              </Button>
            </CardContent>
          </Card>
        )}

        {!locationPermission && prayerTimes && (
          <Card className="border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="py-3 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">লোকেশন অনুরোধ দিন</p>
                <p className="text-xs text-muted-foreground">
                  সঠিক সময় পেতে লোকেশন চালু করুন
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        setLocationPermission(true);
                        getPrayerTimes(position.coords.latitude, position.coords.longitude);
                      },
                      () => {
                        toast.error("লোকেশন অনুমতি প্রয়োজন");
                      },
                      {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                      }
                    );
                  }
                }}
              >
                চালু করুন
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-1.5"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <CalendarIcon className="h-4 w-4" />
            <span className="text-xs font-medium">ক্যালেন্ডার</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-1.5"
            onClick={() => setShowAdhanPlayer(!showAdhanPlayer)}
          >
            <Volume2 className="h-4 w-4" />
            <span className="text-xs font-medium">আযান শুনুন</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-1.5"
            onClick={() => setShowEvents(!showEvents)}
          >
            <Bell className="h-4 w-4" />
            <span className="text-xs font-medium">দিবস</span>
          </Button>
        </div>

        {/* Adhan Player */}
        {showAdhanPlayer && <AdhanPlayer />}

        {/* Calendar View */}
        {showCalendar && (
          <PrayerCalendar
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              setSelectedDate(date);
              toast.success(`${formatBengaliDate(date)} এর নামাজের সময় দেখানো হচ্ছে`);
            }}
          />
        )}

        {/* Islamic Events */}
        {showEvents && (
          <Card>
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">আসন্ন ইসলামিক দিবস</h3>
              </div>
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{event.nameBn}</p>
                    <p className="text-sm text-muted-foreground">{event.hijriDate}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.type === 'eid' ? 'bg-accent text-accent-foreground' :
                    event.type === 'friday' ? 'bg-primary/20 text-primary' :
                    'bg-secondary/20 text-secondary-foreground'
                  }`}>
                    {event.type === 'eid' ? 'ঈদ' : event.type === 'friday' ? 'জুম্মা' : 'বিশেষ'}
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full mt-2">
                সব দিন দেখুন
              </Button>
            </CardContent>
          </Card>
        )}

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
                      ? "bg-primary/10 border-2 border-primary shadow-lg"
                      : "bg-card hover:bg-muted/50"
                  }`}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-full ${
                            isActive ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-semibold text-lg block">
                            {prayerNamesBn[name]}
                          </span>
                          {isActive && (
                            <span className="text-xs text-primary font-medium">চলমান</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-baseline gap-1 justify-end">
                          <span className="text-2xl font-bold">{convertTo12Hour(time).time}</span>
                          <span className="text-xs font-medium opacity-80">{convertTo12Hour(time).periodBn}</span>
                        </div>
                        {name === nextPrayer && !isActive && countdown && (
                          <span className="text-xs text-muted-foreground">বাকি: {countdown}</span>
                        )}
                      </div>
                    </div>
                    {name !== "Sunrise" && (
                      <div className="flex items-center gap-2 pt-3 border-t">
                        <Button
                          variant={alarmSettings[name] ? "default" : "outline"}
                          size="sm"
                          className="flex-1 gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAlarm(name);
                          }}
                        >
                          <AlarmClock className="h-4 w-4" />
                          <span className="text-xs">
                            {alarmSettings[name] ? 'অ্যালার্ম চালু' : 'অ্যালার্ম সেট'}
                          </span>
                        </Button>
                        <Button
                          variant={adhanSettings[name] ? "default" : "outline"}
                          size="sm"
                          className="flex-1 gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAdhan(name);
                          }}
                        >
                          <Volume2 className="h-4 w-4" />
                          <span className="text-xs">
                            {adhanSettings[name] ? 'আজান চালু' : 'আজান বন্ধ'}
                          </span>
                        </Button>
                      </div>
                    )}
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

            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <Volume2 className="h-6 w-6 text-primary mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">আযান অডিও অনুমতি</h4>
                <p className="text-sm text-muted-foreground">
                  আযান শুনতে ও বাজাতে
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
