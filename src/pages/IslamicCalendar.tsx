import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, MapPin, Moon, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { toBengaliNumerals } from "@/utils/bengaliUtils";
import { convertTo12Hour } from "@/utils/timeUtils";
import { islamicEvents } from "@/data/islamicEvents";
import { usePermissions } from "@/contexts/PermissionsContext";
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

interface MonthlyPrayerTimes {
  date: string;
  hijri: string;
  timings: PrayerTimes;
}

const IslamicCalendar = () => {
  const { locationPermission, requestLocationPermission } = usePermissions();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState("");
  const [hijriDateBn, setHijriDateBn] = useState("");
  const [location, setLocation] = useState<string>("");
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [showMonthlyCalendar, setShowMonthlyCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [monthlyTimes, setMonthlyTimes] = useState<MonthlyPrayerTimes[]>([]);
  const [loadingMonthly, setLoadingMonthly] = useState(false);

  const prayerNamesBn: { [key: string]: string } = {
    Fajr: "ফজর",
    Sunrise: "সূর্যোদয়",
    Dhuhr: "যুহর",
    Asr: "আসর",
    Maghrib: "মাগরিব",
    Isha: "এশা",
  };

  const monthNamesBn = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  useEffect(() => {
    const cached = localStorage.getItem("islamicCalendarData");
    if (cached) {
      const data = JSON.parse(cached);
      setPrayerTimes(data.timings);
      setHijriDate(data.hijriDate);
      setHijriDateBn(data.hijriDateBn);
      setLocation(data.location);
    }

    // Check if location permission is available
    if (navigator.geolocation && locationPermission) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getPrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setShowPermissionDialog(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else if (!cached) {
      setShowPermissionDialog(true);
    }
  }, [locationPermission]);

  const getPrayerTimes = async (lat: number, lon: number) => {
    try {
      const date = new Date();
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${Math.floor(date.getTime() / 1000)}?latitude=${lat}&longitude=${lon}&method=2`
      );
      const data = await response.json();

      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
        const hijri = `${data.data.date.hijri.day} ${data.data.date.hijri.month.en}, ${data.data.date.hijri.year} হিজরি`;
        const hijriBn = `${toBengaliNumerals(data.data.date.hijri.day)} ${data.data.date.hijri.month.ar}, ${toBengaliNumerals(data.data.date.hijri.year)} হিজরি`;
        setHijriDate(hijri);
        setHijriDateBn(hijriBn);
        
        // Get location name
        const locationResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`
        );
        const locationData = await locationResponse.json();
        const cityName = locationData.address?.city || locationData.address?.state_district || "Unknown";
        setLocation(cityName);

        localStorage.setItem(
          "islamicCalendarData",
          JSON.stringify({
            timings: data.data.timings,
            hijriDate: hijri,
            hijriDateBn: hijriBn,
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

  const getMonthlyPrayerTimes = async (lat: number, lon: number, month: number, year: number) => {
    setLoadingMonthly(true);
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${lat}&longitude=${lon}&method=2`
      );
      const data = await response.json();

      if (data.code === 200) {
        const times: MonthlyPrayerTimes[] = data.data.map((day: any) => ({
          date: day.date.readable,
          hijri: `${day.date.hijri.day} ${day.date.hijri.month.en}`,
          timings: day.timings,
        }));
        setMonthlyTimes(times);
        toast.success("মাসিক নামাজের সময় লোড হয়েছে");
      }
    } catch (error) {
      toast.error("মাসিক নামাজের সময় লোড করতে ব্যর্থ");
    } finally {
      setLoadingMonthly(false);
    }
  };

  const requestPermissions = async () => {
    setShowPermissionDialog(false);
    await requestLocationPermission();
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getPrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Location error:", error);
          toast.error("লোকেশন অনুমতি প্রয়োজন");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  };

  const openMonthlyCalendar = () => {
    if (!locationPermission) {
      toast.error("লোকেশন অনুমতি প্রয়োজন");
      setShowPermissionDialog(true);
      return;
    }

    setShowMonthlyCalendar(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getMonthlyPrayerTimes(position.coords.latitude, position.coords.longitude, currentMonth, currentYear);
        },
        () => {
          toast.error("লোকেশন অ্যাক্সেস করতে ব্যর্থ");
        }
      );
    }
  };

  const changeMonth = (delta: number) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getMonthlyPrayerTimes(position.coords.latitude, position.coords.longitude, newMonth, newYear);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="ইসলামিক ক্যালেন্ডার" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Hijri Date Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
          <CardContent className="py-6 text-center space-y-3">
            <Moon className="h-12 w-12 mx-auto mb-2 opacity-90" />
            <div>
              <p className="text-sm opacity-90 mb-1">আজকের হিজরি তারিখ</p>
              <p className="text-2xl font-bold">{hijriDateBn}</p>
            </div>
            {location && (
              <div className="flex items-center justify-center gap-2 text-sm opacity-90 pt-2">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            )}
            <Button
              onClick={openMonthlyCalendar}
              variant="secondary"
              size="sm"
              className="mt-4"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              বার্ষিক ক্যালেন্ডার দেখুন
            </Button>
          </CardContent>
        </Card>

        {/* Today's Prayer Times */}
        {prayerTimes && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">আজকের নামাজের সময়সূচী</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(prayerNamesBn).map(([key, nameBn]) => {
                if (key === "Sunrise") return null;
                const time = prayerTimes[key as keyof PrayerTimes];
                const { time: time12, periodBn } = convertTo12Hour(time);
                return (
                  <div key={key} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="font-medium">{nameBn}</span>
                    <span className="text-lg font-bold text-primary">
                      {time12} {periodBn}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Islamic Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">গুরুত্বপূর্ণ ইসলামিক দিবসসমূহ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {islamicEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-semibold">{event.nameBn}</p>
                  <p className="text-sm text-muted-foreground">{event.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">{event.hijriDate}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      <BottomNav />

      {/* Permission Dialog */}
      <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>লোকেশন অনুমতি প্রয়োজন</DialogTitle>
            <DialogDescription>
              আপনার এলাকার সঠিক নামাজের সময় দেখাতে লোকেশন অনুমতি প্রয়োজন।
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button onClick={requestPermissions} className="flex-1">
              অনুমতি দিন
            </Button>
            <Button onClick={() => setShowPermissionDialog(false)} variant="outline" className="flex-1">
              বাতিল
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Monthly Calendar Dialog */}
      <Dialog open={showMonthlyCalendar} onOpenChange={setShowMonthlyCalendar}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <Button onClick={() => changeMonth(-1)} variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span>
                {monthNamesBn[currentMonth - 1]} {toBengaliNumerals(currentYear.toString())}
              </span>
              <Button onClick={() => changeMonth(1)} variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {loadingMonthly ? (
            <div className="text-center py-8">লোড হচ্ছে...</div>
          ) : (
            <div className="space-y-2">
              {monthlyTimes.map((day, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{day.date}</p>
                      <p className="text-sm text-muted-foreground">{day.hijri} হিজরি</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-sm">
                    {Object.entries(prayerNamesBn).map(([key, nameBn]) => {
                      if (key === "Sunrise") return null;
                      const time = day.timings[key as keyof PrayerTimes];
                      const { time: time12, periodBn } = convertTo12Hour(time);
                      return (
                        <div key={key} className="text-center">
                          <p className="text-xs text-muted-foreground">{nameBn}</p>
                          <p className="font-medium text-primary">{time12}</p>
                          <p className="text-xs">{periodBn}</p>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IslamicCalendar;
