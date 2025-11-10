import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { convertTo12Hour, formatCurrentTime12Hour } from "@/utils/timeUtils";
import { toBengaliNumerals } from "@/utils/bengaliUtils";
import { getLocationName } from "@/utils/prayerNotifications";
import { buildPrayerTimesApiUrl } from "@/utils/prayerSettings";
import mosqueImage from "@/assets/mosque-sunset.jpg";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface PrayerHeaderProps {
  className?: string;
}

export const PrayerHeader = ({ className }: PrayerHeaderProps) => {
  const navigate = useNavigate();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState("");
  const [currentPrayer, setCurrentPrayer] = useState<{ name: string; time: string } | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);
  const [countdown, setCountdown] = useState("");
  const [location, setLocation] = useState<string>("");
  const [currentTime, setCurrentTime] = useState("");

  const prayerNamesBn: { [key: string]: string } = {
    Fajr: "ফজর",
    Dhuhr: "যুহর",
    Asr: "আসর",
    Maghrib: "মাগরিব",
    Isha: "এশা",
  };

  useEffect(() => {
    const initializePrayerTimes = async () => {
      const cached = localStorage.getItem("prayerTimes");
      if (cached) {
        const data = JSON.parse(cached);
        setPrayerTimes(data.timings);
        setHijriDate(data.hijriDate);
        setLocation(data.location);
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
          },
          () => {
            // Fallback to default location (Bogra, Bangladesh)
            fetchPrayerTimesByCity("Bogra", "Bangladesh");
          }
        );
      }
    };

    initializePrayerTimes();

    // Listen for prayer times updates from midnight refresh
    const handlePrayerTimesUpdate = (event: CustomEvent) => {
      const { timings, hijriDate, location } = event.detail;
      setPrayerTimes(timings);
      setHijriDate(hijriDate);
      setLocation(location);
    };

    window.addEventListener('prayerTimesUpdated', handlePrayerTimesUpdate as EventListener);

    return () => {
      window.removeEventListener('prayerTimesUpdated', handlePrayerTimesUpdate as EventListener);
    };
  }, []);

  const fetchPrayerTimes = async (lat: number, lon: number) => {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const apiUrl = buildPrayerTimesApiUrl(lat, lon, timestamp);
      
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.code === 200) {
        const timings = data.data.timings;
        setPrayerTimes(timings);
        const hijri = `${data.data.date.hijri.month.en} ${data.data.date.hijri.day}, ${data.data.date.hijri.year} AH`;
        setHijriDate(hijri);
        
        // Get actual city name using reverse geocoding
        const cityName = await getLocationName(lat, lon);
        setLocation(cityName);

        localStorage.setItem(
          "prayerTimes",
          JSON.stringify({
            timings,
            hijriDate: hijri,
            location: cityName,
            timestamp: Date.now(),
          })
        );
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  const fetchPrayerTimesByCity = async (city: string, country: string) => {
    try {
      const date = new Date();
      const dateStr = date.toISOString().split('T')[0];
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=1&tune=+1,0,+2,0,+2,+1,+2&date=${dateStr}`
      );
      const data = await response.json();

      if (data.code === 200) {
        const timings = data.data.timings;
        setPrayerTimes(timings);
        const hijri = `${data.data.date.hijri.month.en} ${data.data.date.hijri.day}, ${data.data.date.hijri.year} AH`;
        setHijriDate(hijri);
        setLocation(city);

        localStorage.setItem(
          "prayerTimes",
          JSON.stringify({
            timings,
            hijriDate: hijri,
            location: city,
            timestamp: Date.now(),
          })
        );
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  useEffect(() => {
    if (!prayerTimes) return;

    const updateCurrentPrayer = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

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

      let current = prayerMinutes[prayerMinutes.length - 1];
      let next = prayerMinutes[0];

      for (let i = 0; i < prayerMinutes.length; i++) {
        if (currentTime >= prayerMinutes[i].minutes) {
          current = prayerMinutes[i];
          next = prayerMinutes[(i + 1) % prayerMinutes.length];
        } else {
          break;
        }
      }

      setCurrentPrayer({ name: current.name, time: current.time });
      setNextPrayer({ name: next.name, time: next.time });

      // Calculate countdown with seconds
      let nextMinutes = next.minutes;
      if (nextMinutes <= currentTime) {
        nextMinutes += 24 * 60; // Next day
      }
      const diff = nextMinutes - currentTime;
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;
      const seconds = (60 - now.getSeconds()) % 60;
      setCountdown(`${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    };

    updateCurrentPrayer();
    const interval = setInterval(updateCurrentPrayer, 1000); // Update every second

    return () => clearInterval(interval);
  }, [prayerTimes]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(formatCurrentTime12Hour(new Date()));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!prayerTimes || !currentPrayer) return null;

  return (
    <Card
      className={`relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground cursor-pointer hover:shadow-lg transition-shadow ${className}`}
      onClick={() => navigate("/calendar")}
    >
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

      <div className="relative p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm opacity-90">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-sm font-semibold">{currentTime}</span>
            <span className="text-xs opacity-75">{hijriDate}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold">{prayerNamesBn[currentPrayer.name]}</h3>
              <div className="h-3 w-3 bg-white rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-4xl font-bold">{convertTo12Hour(currentPrayer.time).time}</p>
              <span className="text-xl font-semibold opacity-90">{convertTo12Hour(currentPrayer.time).periodBn}</span>
            </div>
            <p className="text-sm opacity-90 mt-1">
              পরবর্তী নামাজ {toBengaliNumerals(countdown)} এ
            </p>
          </div>

          <div className="flex flex-col items-end justify-center">
            <img
              src={mosqueImage}
              alt="Mosque"
              className="h-24 w-24 object-cover rounded-lg opacity-90"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/20">
          <span className="text-sm opacity-90">আরও দেখতে ট্যাপ করুন</span>
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
};
