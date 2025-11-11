import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sunrise, Sunset, MapPin, RefreshCw } from "lucide-react";
import { formatTime12Hour } from "@/utils/timeUtils";
import { toast } from "sonner";

const FastingTiming = () => {
  const [location, setLocation] = useState<string>("Loading...");
  const [sehriTime, setSehriTime] = useState<string>("");
  const [iftarTime, setIftarTime] = useState<string>("");
  const [fajrTime, setFajrTime] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchPrayerTimes = async (lat: number, lon: number) => {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=1&tune=1,0,2,0,2,1,2`
      );
      const data = await response.json();

      if (data.code === 200) {
        const fajr = data.data.timings.Fajr;
        const maghrib = data.data.timings.Maghrib;

        setFajrTime(fajr);
        setSehriTime(fajr); // Sehri ends at Fajr
        setIftarTime(maghrib);
      }

      // Get location name
      const locationResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`
      );
      const locationData = await locationResponse.json();
      const city = locationData.address.city || locationData.address.state_district || "Unknown";
      setLocation(city);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      toast.error("সময় লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Location error:", error);
          // Default to Dhaka
          fetchPrayerTimes(23.8103, 90.4125);
          toast.error("লোকেশন পারমিশন প্রয়োজন");
        }
      );
    } else {
      // Default to Dhaka
      fetchPrayerTimes(23.8103, 90.4125);
      setLoading(false);
    }
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fetchPrayerTimes(23.8103, 90.4125);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="সাহরী ও ইফতারের সময়" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Location Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">আপনার লোকেশন</p>
                  <p className="font-semibold">{location}</p>
                </div>
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Timing */}
        <div className="grid grid-cols-2 gap-4">
          {/* Sehri Time */}
          <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Sunrise className="h-5 w-5" />
                <CardTitle className="text-lg">সাহরীর শেষ সময়</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-3xl font-bold animate-pulse">--:--</p>
              ) : (
                <div>
                  <p className="text-3xl font-bold">{formatTime12Hour(sehriTime)}</p>
                  <p className="text-xs text-muted-foreground mt-1">ফজরের আযান</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Iftar Time */}
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <Sunset className="h-5 w-5" />
                <CardTitle className="text-lg">ইফতারের সময়</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-3xl font-bold animate-pulse">--:--</p>
              ) : (
                <div>
                  <p className="text-3xl font-bold">{formatTime12Hour(iftarTime)}</p>
                  <p className="text-xs text-muted-foreground mt-1">মাগরিবের আযান</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Card */}
        <Card>
          <CardHeader>
            <CardTitle>সাহরী ও ইফতারের টিপস</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Sunrise className="h-4 w-4 text-blue-500" />
                সাহরীর আদব
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-6 list-disc">
                <li>যত দেরিতে সম্ভব সাহরী খান</li>
                <li>হালকা ও পুষ্টিকর খাবার খান</li>
                <li>পর্যাপ্ত পানি পান করুন</li>
                <li>নিয়ত করতে ভুলবেন না</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Sunset className="h-4 w-4 text-orange-500" />
                ইফতারের আদব
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-6 list-disc">
                <li>আযানের সাথে সাথে ইফতার করুন</li>
                <li>খেজুর ও পানি দিয়ে শুরু করুন</li>
                <li>দোয়া পড়তে ভুলবেন না</li>
                <li>ধীরে ধীরে খাবার খান</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Note */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-center text-muted-foreground">
              সময়গুলো আপনার লোকেশনের উপর ভিত্তি করে স্বয়ংক্রিয়ভাবে আপডেট হয়।
              সঠিক সময় নিশ্চিত করতে লোকেশন পারমিশন দিন।
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default FastingTiming;
