import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, MapPin, Clock, Star } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { toBengaliNumerals, getBengaliMonthName } from "@/utils/bengaliUtils";
import { formatTime12Hour } from "@/utils/timeUtils";
import { islamicEvents, IslamicEvent } from "@/data/islamicEvents";
import { toast } from "sonner";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
}

interface HijriDate {
  date: string;
  day: string;
  month: { en: string; ar: string };
  year: string;
  weekday: { en: string; ar: string };
}

const IslamicCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [location, setLocation] = useState<string>("বগুড়া");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPrayerTimes(selectedDate);
  }, [selectedDate]);

  const fetchPrayerTimes = async (date: Date) => {
    setLoading(true);
    try {
      // Get coordinates from localStorage or use default (Bogra)
      const cached = localStorage.getItem("prayerTimes");
      let lat = 24.8354319;
      let lon = 89.3641751;

      if (cached) {
        const data = JSON.parse(cached);
        if (data.coordinates) {
          lat = data.coordinates.lat;
          lon = data.coordinates.lon;
        }
      }

      // Try to get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            await loadPrayerData(lat, lon, date);
          },
          async () => {
            // Use default location if permission denied
            await loadPrayerData(lat, lon, date);
          }
        );
      } else {
        await loadPrayerData(lat, lon, date);
      }
    } catch (error) {
      toast.error("নামাজের সময় লোড করতে ব্যর্থ");
      setLoading(false);
    }
  };

  const loadPrayerData = async (lat: number, lon: number, date: Date) => {
    try {
      const timestamp = Math.floor(date.getTime() / 1000);
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=2`
      );
      const data = await response.json();

      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
        setHijriDate(data.data.date.hijri);

        // Get location name
        const locationResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`
        );
        const locationData = await locationResponse.json();
        const cityName = locationData.address?.city || locationData.address?.state_district || "বগুড়া";
        setLocation(cityName);
      }
    } catch (error) {
      toast.error("তথ্য লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const prayerNamesBn: { [key: string]: string } = {
    Fajr: "ফজর",
    Sunrise: "সূর্যোদয়",
    Dhuhr: "যুহর",
    Asr: "আসর",
    Maghrib: "মাগরিব",
    Isha: "এশা",
  };

  const getEventIcon = (type: IslamicEvent["type"]) => {
    switch (type) {
      case "eid":
        return "🌙";
      case "friday":
        return "🕌";
      default:
        return "✨";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="ইসলামিক ক্যালেন্ডার" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Hijri Date Card */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="py-6">
            <div className="text-center space-y-2">
              <CalendarIcon className="h-8 w-8 mx-auto opacity-90" />
              {hijriDate ? (
                <>
                  <h2 className="text-3xl font-bold">
                    {toBengaliNumerals(hijriDate.day)} {hijriDate.month.en}
                  </h2>
                  <p className="text-xl">{toBengaliNumerals(hijriDate.year)} হিজরি</p>
                  <p className="text-sm opacity-90">{hijriDate.weekday.en}</p>
                </>
              ) : (
                <div className="animate-pulse">
                  <div className="h-8 bg-white/20 rounded w-48 mx-auto mb-2"></div>
                  <div className="h-6 bg-white/20 rounded w-32 mx-auto"></div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location & Selected Date */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">{location}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {toBengaliNumerals(selectedDate.getDate())} {getBengaliMonthName(selectedDate.getMonth())}, {toBengaliNumerals(selectedDate.getFullYear().toString())}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">তারিখ নির্বাচন করুন</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border w-full"
            />
          </CardContent>
        </Card>

        {/* Prayer Times for Selected Date */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              নামাজের সময়সূচি
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse flex justify-between">
                    <div className="h-4 bg-muted rounded w-20"></div>
                    <div className="h-4 bg-muted rounded w-24"></div>
                  </div>
                ))}
              </div>
            ) : prayerTimes ? (
              <div className="space-y-3">
                {Object.entries(prayerTimes)
                  .filter(([key]) => ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(key))
                  .map(([prayer, time]) => (
                    <div key={prayer} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="font-medium">{prayerNamesBn[prayer]}</span>
                      <span className="text-lg font-bold text-primary">
                        {formatTime12Hour(time)}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">তথ্য লোড করা যায়নি</p>
            )}
          </CardContent>
        </Card>

        {/* Islamic Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="h-5 w-5" />
              গুরুত্বপূর্ণ ইসলামিক দিবস
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {islamicEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <span className="text-2xl">{getEventIcon(event.type)}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold">{event.nameBn}</h4>
                    <p className="text-sm text-muted-foreground">{event.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event.hijriDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default IslamicCalendar;
