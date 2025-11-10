import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Sunrise, Sunset, Sun, Moon, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { toBengaliNumerals, formatBengaliDate } from "@/utils/bengaliUtils";
import { convertTo12Hour } from "@/utils/timeUtils";
import {
  getPrayerTimesFromCache,
  savePrayerTimesToCache,
  formatDateKey,
  isCacheValid,
} from "@/utils/prayerTimesCache";
import { getLocationName } from "@/utils/prayerNotifications";

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const DatePrayerTimes = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState("");
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
    if (date) {
      const parsedDate = new Date(date);
      setSelectedDate(parsedDate);
      loadPrayerTimes(parsedDate);
    }
  }, [date]);

  const loadPrayerTimes = async (targetDate: Date) => {
    setLoading(true);
    try {
      const dateKey = formatDateKey(targetDate);

      // Check cache first
      const cached = await getPrayerTimesFromCache(dateKey);
      if (cached && isCacheValid(cached)) {
        setPrayerTimes(cached.timings);
        setHijriDate(cached.hijriDate);
        setLocation(cached.location);
        setLoading(false);
        return;
      }

      // Get location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            await fetchPrayerTimes(
              position.coords.latitude,
              position.coords.longitude,
              targetDate
            );
          },
          async () => {
            // Fallback to Bogra
            const response = await fetch(
              `https://api.aladhan.com/v1/timingsByCity?city=Bogra&country=Bangladesh&method=2&date=${formatDateForAPI(targetDate)}`
            );
            const data = await response.json();

            if (data.code === 200) {
              const timings = data.data.timings;
              const hijri = `${data.data.date.hijri.month.en} ${data.data.date.hijri.day}, ${data.data.date.hijri.year} AH`;
              
              setPrayerTimes(timings);
              setHijriDate(hijri);
              setLocation("বগুড়া");

              await savePrayerTimesToCache({
                date: dateKey,
                timings,
                hijriDate: hijri,
                location: "বগুড়া",
                latitude: 24.8465,
                longitude: 89.3776,
                timestamp: Date.now(),
              });
            }
            setLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        toast.error("লোকেশন সাপোর্ট নেই");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error loading prayer times:", error);
      toast.error("নামাজের সময় লোড করতে সমস্যা হয়েছে");
      setLoading(false);
    }
  };

  const fetchPrayerTimes = async (lat: number, lon: number, targetDate: Date) => {
    try {
      const timestamp = Math.floor(targetDate.getTime() / 1000);
      const dateKey = formatDateKey(targetDate);

      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=2`
      );
      const data = await response.json();

      if (data.code === 200) {
        const timings = data.data.timings;
        const hijri = `${data.data.date.hijri.month.en} ${data.data.date.hijri.day}, ${data.data.date.hijri.year} AH`;
        const cityName = await getLocationName(lat, lon);

        setPrayerTimes(timings);
        setHijriDate(hijri);
        setLocation(cityName);

        await savePrayerTimesToCache({
          date: dateKey,
          timings,
          hijriDate: hijri,
          location: cityName,
          latitude: lat,
          longitude: lon,
          timestamp: Date.now(),
        });

        toast.success(`${cityName} এর নামাজের সময়সূচী`);
      }
    } catch (error) {
      toast.error("নামাজের সময় লোড করতে ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  const formatDateForAPI = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="নামাজের সময়সূচী" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Date Header */}
        <Card className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground animate-fade-in">
          <CardContent className="py-6 text-center">
            <h2 className="text-2xl font-bold mb-2">
              {formatBengaliDate(selectedDate)}
            </h2>
            {hijriDate && (
              <p className="text-sm opacity-90 font-medium">{hijriDate}</p>
            )}
            {location && (
              <div className="flex items-center justify-center gap-2 mt-3">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{location}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card>
            <CardContent className="py-12 flex flex-col items-center justify-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">নামাজের সময় লোড হচ্ছে...</p>
            </CardContent>
          </Card>
        )}

        {/* Prayer Times List */}
        {!loading && prayerTimes && (
          <div className="space-y-3 animate-fade-in">
            {Object.entries(prayerTimes).map(([name, time]) => {
              const Icon = prayerIcons[name as keyof typeof prayerIcons];
              if (!Icon) return null;

              return (
                <Card
                  key={name}
                  className="hover:shadow-lg transition-all duration-200 hover-scale"
                >
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {prayerNamesBn[name]}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {name === "Sunrise" ? "নামাজের সময় নয়" : "নামাজ"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-baseline gap-1 justify-end">
                          <span className="text-3xl font-bold">
                            {convertTo12Hour(time).time}
                          </span>
                          <span className="text-sm font-medium opacity-80">
                            {convertTo12Hour(time).periodBn}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Error State */}
        {!loading && !prayerTimes && (
          <Card>
            <CardContent className="py-12 text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">তথ্য পাওয়া যায়নি</h3>
              <p className="text-sm text-muted-foreground">
                নামাজের সময়সূচী লোড করতে সমস্যা হয়েছে
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default DatePrayerTimes;
