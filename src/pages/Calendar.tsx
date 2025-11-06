import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComp } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Sunrise, Sunset, Sun, Moon, MapPin } from "lucide-react";
import { toast } from "sonner";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const Calendar = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState("");
  const [location, setLocation] = useState<{ city: string; country: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getPrayerTimes = async (lat: number, lon: number) => {
    try {
      const date = new Date();
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${Math.floor(date.getTime() / 1000)}?latitude=${lat}&longitude=${lon}&method=2`
      );
      const data = await response.json();
      
      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
        setHijriDate(`${data.data.date.hijri.day} ${data.data.date.hijri.month.bn} ${data.data.date.hijri.year}`);
        setLocation({
          city: data.data.meta.timezone.split('/')[1],
          country: data.data.meta.timezone.split('/')[0]
        });
        toast.success("নামাজের সময় লোড হয়েছে");
      }
    } catch (error) {
      toast.error("নামাজের সময় লোড করতে ব্যর্থ");
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      toast.error("আপনার ব্রাউজার লোকেশন সাপোর্ট করে না");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        getPrayerTimes(position.coords.latitude, position.coords.longitude);
      },
      () => {
        toast.error("লোকেশন অনুমতি প্রয়োজন");
      }
    );
  };

  const prayerIcons = {
    Fajr: Sunrise,
    Dhuhr: Sun,
    Asr: Sun,
    Maghrib: Sunset,
    Isha: Moon,
  };

  const prayerNamesBn = {
    Fajr: "ফজর",
    Dhuhr: "যুহর",
    Asr: "আসর",
    Maghrib: "মাগরিব",
    Isha: "এশা",
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="নামাজের সময়" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <Card className="p-6 bg-gradient-primary text-primary-foreground">
          <div className="flex items-center gap-3 mb-4">
            <Moon className="h-6 w-6" />
            <h3 className="font-semibold text-lg">হিজরি তারিখ</h3>
          </div>
          {hijriDate ? (
            <p className="text-3xl font-bold font-arabic">{hijriDate}</p>
          ) : (
            <p className="text-2xl font-bold">--- লোকেশন দিন ---</p>
          )}
          <p className="text-sm mt-3 opacity-90">{today}</p>
          {location && (
            <p className="text-xs mt-2 opacity-75">
              <MapPin className="inline h-3 w-3" /> {location.city}
            </p>
          )}
        </Card>

        <Card className="p-4">
          <CalendarComp
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md"
          />
        </Card>

        {prayerTimes ? (
          <Card className="p-6">
            <h3 className="font-semibold mb-4">আজকের নামাজের সময়</h3>
            <div className="space-y-3">
              {Object.entries(prayerTimes).map(([name, time]) => {
                const Icon = prayerIcons[name as keyof typeof prayerIcons];
                if (!Icon) return null;
                
                return (
                  <div
                    key={name}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <p className="font-medium">{prayerNamesBn[name as keyof typeof prayerNamesBn]}</p>
                    </div>
                    <Badge variant="secondary" className="text-base font-mono">
                      {time}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        ) : (
          <Card className="p-8 text-center space-y-4">
            <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="font-semibold mb-2">নামাজের সময় দেখুন</h3>
              <p className="text-sm text-muted-foreground mb-4">
                আপনার এলাকার নামাজের সময় জানতে লোকেশন অনুমতি দিন
              </p>
              <Button onClick={requestLocation} className="gap-2">
                <MapPin className="h-4 w-4" />
                লোকেশন অনুমতি দিন
              </Button>
            </div>
          </Card>
        )}

        <Card className="p-6">
          <h3 className="font-semibold mb-4">আগামী ইসলামিক দিবস</h3>
          <div className="space-y-3">
            <div className="flex items-start justify-between pb-3 border-b border-border">
              <div>
                <p className="font-medium">রমজান</p>
                <p className="text-sm text-muted-foreground">১ রমজান ১৪৪৬</p>
              </div>
              <Badge>৫ মাস পরে</Badge>
            </div>
            <div className="flex items-start justify-between pb-3 border-b border-border">
              <div>
                <p className="font-medium">ঈদুল ফিতর</p>
                <p className="text-sm text-muted-foreground">১ শাওয়াল ১৪৪৬</p>
              </div>
              <Badge>৬ মাস পরে</Badge>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">ঈদুল আযহা</p>
                <p className="text-sm text-muted-foreground">১০ জিলহজ্জ ১৪৪৬</p>
              </div>
              <Badge>৮ মাস পরে</Badge>
            </div>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Calendar;
