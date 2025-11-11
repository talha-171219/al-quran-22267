import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Bell } from "lucide-react";
import { toBengaliNumerals } from "@/utils/bengaliUtils";

const HajjCalendar = () => {
  // Hajj 2025 dates (estimated - Dhul Hijjah 1446)
  const hajjDates = {
    ihram: new Date(2025, 5, 14), // 8 Dhul Hijjah - June 14, 2025
    arafah: new Date(2025, 5, 15), // 9 Dhul Hijjah - June 15, 2025 (Day of Arafah)
    eid: new Date(2025, 5, 16), // 10 Dhul Hijjah - June 16, 2025 (Eid al-Adha)
    tashriq1: new Date(2025, 5, 17), // 11 Dhul Hijjah
    tashriq2: new Date(2025, 5, 18), // 12 Dhul Hijjah
    tashriq3: new Date(2025, 5, 19), // 13 Dhul Hijjah
  };

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const diff = hajjDates.ihram.getTime() - now.getTime();

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const schedule = [
    {
      date: hajjDates.ihram,
      hijriDate: "৮ জিলহজ",
      title: "তারবিয়াহ দিবস",
      activities: [
        "মক্কায় ইহরাম বাঁধা",
        "মিনায় গমন",
        "মিনায় রাত্রিযাপন",
        "পাঁচ ওয়াক্ত নামাজ আদায়"
      ]
    },
    {
      date: hajjDates.arafah,
      hijriDate: "৯ জিলহজ",
      title: "আরাফাহ দিবস",
      activities: [
        "ফজরের পর আরাফাহ যাত্রা",
        "সূর্যোদয় থেকে সূর্যাস্ত পর্যন্ত আরাফাহে অবস্থান",
        "জোহর ও আসর একসাথে (কসর)",
        "সূর্যাস্তের পর মুযদালিফাহ যাত্রা",
        "মুযদালিফাহে রাত্রিযাপন"
      ],
      important: true
    },
    {
      date: hajjDates.eid,
      hijriDate: "১০ জিলহজ",
      title: "ঈদুল আযহা",
      activities: [
        "ফজরের পর মিনায় ফিরে যাওয়া",
        "জামরাতুল আকাবায় কঙ্কর নিক্ষেপ (৭টি)",
        "কুরবানী",
        "মাথা মুণ্ডন/চুল কাটা",
        "ইহরাম থেকে মুক্ত হওয়া",
        "তাওয়াফে ইফাদাহ",
        "সাঈ (যদি আগে না করা থাকে)"
      ],
      important: true
    },
    {
      date: hajjDates.tashriq1,
      hijriDate: "১১ জিলহজ",
      title: "আইয়ামে তাশরীক (১ম দিন)",
      activities: [
        "মিনায় রাত্রিযাপন",
        "তিনটি জামরাতে কঙ্কর নিক্ষেপ (২১টি)",
        "জোহরের পর কঙ্কর নিক্ষেপ শুরু"
      ]
    },
    {
      date: hajjDates.tashriq2,
      hijriDate: "১২ জিলহজ",
      title: "আইয়ামে তাশরীক (২য় দিন)",
      activities: [
        "মিনায় রাত্রিযাপন",
        "তিনটি জামরাতে কঙ্কর নিক্ষেপ (২১টি)",
        "সূর্যাস্তের আগে মিনা ত্যাগ করা যাবে (তাড়াহুড়ি)",
        "অথবা পরের দিন পর্যন্ত থাকা (উত্তম)"
      ]
    },
    {
      date: hajjDates.tashriq3,
      hijriDate: "১৩ জিলহজ",
      title: "আইয়ামে তাশরীক (৩য় দিন)",
      activities: [
        "তিনটি জামরাতে কঙ্কর নিক্ষেপ (২১টি)",
        "মক্কায় ফিরে যাওয়া",
        "তাওয়াফে বিদা (বিদায়ী তাওয়াফ)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="হজ ক্যালেন্ডার" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Countdown Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              হজ ২০২৫ কাউন্টডাউন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {toBengaliNumerals(countdown.days)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">দিন</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {toBengaliNumerals(countdown.hours)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">ঘন্টা</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {toBengaliNumerals(countdown.minutes)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">মিনিট</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {toBengaliNumerals(countdown.seconds)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">সেকেন্ড</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Dates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              প্রধান তারিখসমূহ (২০২৫)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">ইহরাম দিবস</span>
              <Badge variant="secondary">{formatDate(hajjDates.ihram)}</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg border border-primary/20">
              <span className="text-sm font-medium">আরাফাহ দিবস ⭐</span>
              <Badge className="bg-primary">{formatDate(hajjDates.arafah)}</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg border border-primary/20">
              <span className="text-sm font-medium">ঈদুল আযহা ⭐</span>
              <Badge className="bg-primary">{formatDate(hajjDates.eid)}</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">তাশরীক দিবস</span>
              <Badge variant="secondary">১১-১৩ জিলহজ</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Day by Day Schedule */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            দিনভিত্তিক সময়সূচী
          </h2>
          
          {schedule.map((day, index) => (
            <Card
              key={index}
              className={day.important ? "border-primary/30 bg-primary/5" : ""}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{day.title}</h3>
                      {day.important && <Badge variant="destructive">গুরুত্বপূর্ণ</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{day.hijriDate}</p>
                  </div>
                  <Badge variant="outline">{formatDate(day.date)}</Badge>
                </div>
                
                <ul className="space-y-2">
                  {day.activities.map((activity, idx) => (
                    <li key={idx} className="flex gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>নোট:</strong> হজের তারিখ চাঁদ দেখার উপর নির্ভর করে পরিবর্তিত হতে পারে। 
              সৌদি আরবের সরকারি ঘোষণা অনুসরণ করুন।
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default HajjCalendar;
