import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { toast } from "sonner";
import { convertTo12Hour, formatTime12Hour } from "@/utils/timeUtils";
import { toBengaliNumerals, formatBengaliDate, getBengaliWeekday } from "@/utils/bengaliUtils";
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
  const [currentDate, setCurrentDate] = useState(new Date());

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
      const now = new Date();
      setCurrentDate(now);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!prayerTimes || !currentPrayer) return null;

  const currentPrayerName = prayerNamesBn[currentPrayer.name] || currentPrayer.name;

  return (
    <Card 
      className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 bg-gradient-to-br from-emerald-950/95 via-emerald-900/90 to-teal-900/85 border-emerald-700/20 backdrop-blur-sm rounded-[28px] ${className}`}
      onClick={() => navigate('/calendar')}
      style={{
        boxShadow: '0 0 40px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Frosted Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="prayer-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#prayer-pattern)" />
        </svg>
      </div>

      <div className="p-3 sm:p-4 relative">
        <div className="grid grid-cols-[1fr,auto] gap-3">
          {/* Left Column - Prayer Info */}
          <div className="space-y-1.5">
            {/* Date and Location Row */}
            <div className="flex items-start justify-between mb-2">
              <div className="text-sky-400/90 text-[13px] font-medium tracking-wide">
                {formatBengaliDate(currentDate)}
              </div>
              <div className="text-amber-300/70 text-xs font-medium">
                {location}
              </div>
            </div>

            {/* Bell Icon */}
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 mb-1.5">
              <Bell className="w-4 h-4 text-white/80" />
            </div>

            {/* Current Prayer Status */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-white/80 text-sm">এখন :</span>
                <span className="text-white font-semibold text-sm">{currentPrayerName}</span>
                <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" style={{
                  boxShadow: '0 0 8px rgba(52, 211, 153, 0.8), 0 0 12px rgba(52, 211, 153, 0.4)'
                }} />
              </div>
              
              <div className="text-white text-[36px] sm:text-[42px] font-bold tracking-tight leading-none" style={{
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}>
                {prayerTimes[currentPrayer.name as keyof PrayerTimes] ? formatTime12Hour(prayerTimes[currentPrayer.name as keyof PrayerTimes], true) : '...'}
              </div>
              
              <div className="text-emerald-300/70 text-[11px] font-light">
                (ওয়াক্ত শুরু)
              </div>

              {/* Countdown */}
              <div className="text-white/85 text-xs mt-1 font-light">
                {toBengaliNumerals(countdown)} বাকি (প্রায়)
              </div>
            </div>

            {/* Sehri & Iftar Times */}
            {(prayerTimes.Fajr || prayerTimes.Maghrib) && (
              <div className="space-y-0.5 text-xs pt-2 border-t border-white/10">
                {prayerTimes.Fajr && (
                  <div className="text-white/70">
                    সেহরি: <span className="text-white/90 font-medium">{formatTime12Hour(prayerTimes.Fajr, true)}</span>
                  </div>
                )}
                {prayerTimes.Maghrib && (
                  <div className="text-white/70">
                    ইফতার: <span className="text-white/90 font-medium">{formatTime12Hour(prayerTimes.Maghrib, true)}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Circular Timer */}
          <div className="flex items-start justify-center pt-3">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/10 blur-xl" />
              
              {/* Circular Progress */}
              <svg className="w-full h-full transform -rotate-90 relative z-10">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="2.5"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="url(#premium-gradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * (40)} ${2 * Math.PI * (40)}`}
                  strokeDashoffset={2 * Math.PI * (40) * (1 - 0.65)}
                  className="transition-all duration-1000"
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))'
                  }}
                />
                <defs>
                  <linearGradient id="premium-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#10b981" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Time Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-lg sm:text-xl font-bold text-white" style={{
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                }}>
                  {toBengaliNumerals(countdown.split(':').slice(0, 2).join(':'))}
                </div>
                <div className="text-[9px] text-white/60 mt-0 font-light">
                  বাকি
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prayer Timeline */}
        <div className="mt-3 pt-2.5 border-t border-white/10">
          <div className="flex justify-between items-center px-1">
            {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map((prayer) => {
              const bengaliName = {
                'Fajr': 'ফজর',
                'Dhuhr': 'যোহর',
                'Asr': 'আসর',
                'Maghrib': 'মাগরিব',
                'Isha': 'এশা'
              }[prayer];
              
              const isActive = currentPrayer.name === prayer;
              
              return (
                <div key={prayer} className="flex flex-col items-center space-y-0.5">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-white scale-150 shadow-lg shadow-white/60' 
                      : 'bg-white/25'
                  }`} style={isActive ? {
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.4)'
                  } : {}} />
                  <div className={`text-[10px] ${isActive ? 'text-white font-semibold' : 'text-white/60'}`}>
                    {bengaliName}
                  </div>
                  <div className={`text-[10px] ${isActive ? 'text-white font-medium' : 'text-white/50'}`}>
                    {prayerTimes[prayer] ? formatTime12Hour(prayerTimes[prayer], false).split(' ')[0] : '...'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};
