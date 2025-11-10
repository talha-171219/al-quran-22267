import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { buildPrayerTimesApiUrl } from "@/utils/prayerSettings";
import { convertTo12Hour } from "@/utils/timeUtils";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface ComparisonData {
  current: PrayerTimes | null;
  location: string;
  method: string;
}

export const PrayerTimeComparison = () => {
  const [loading, setLoading] = useState(false);
  const [comparison, setComparison] = useState<ComparisonData | null>(null);

  const prayerNamesBn: { [key: string]: string } = {
    Fajr: "ফজর",
    Dhuhr: "যুহর",
    Asr: "আসর",
    Maghrib: "মাগরিব",
    Isha: "এশা",
  };

  const runComparison = async () => {
    setLoading(true);
    try {
      if (!navigator.geolocation) {
        toast.error("জিওলোকেশন সাপোর্ট করে না");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const timestamp = Math.floor(Date.now() / 1000);

          // Fetch with current settings
          const apiUrl = buildPrayerTimesApiUrl(lat, lon, timestamp);
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.code === 200) {
            setComparison({
              current: data.data.timings,
              location: data.data.meta?.timezone || "Unknown",
              method: "Bangladesh (Karachi Method + Offset)",
            });
            toast.success("তুলনা সম্পূর্ণ হয়েছে");
          } else {
            toast.error("ডেটা লোড ব্যর্থ");
          }
          setLoading(false);
        },
        (error) => {
          console.error("Location error:", error);
          toast.error("লোকেশন পারমিশন প্রয়োজন");
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Comparison error:", error);
      toast.error("তুলনা করতে সমস্যা হয়েছে");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">নামাজের সময় যাচাই করুন</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            আপনার বর্তমান লোকেশনের জন্য নামাজের সময় দেখুন এবং যাচাই করুন যে এটি
            WeMuslim বা Islamic Foundation এর সাথে মিলছে কিনা।
          </p>

          <Button
            onClick={runComparison}
            disabled={loading}
            className="w-full gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                যাচাই করা হচ্ছে...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                সময় যাচাই করুন
              </>
            )}
          </Button>

          {comparison && (
            <div className="space-y-3 pt-4 border-t animate-fade-in">
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                <span className="text-sm font-medium">লোকেশন:</span>
                <span className="text-sm">{comparison.location}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                <span className="text-sm font-medium">পদ্ধতি:</span>
                <span className="text-sm">{comparison.method}</span>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">আজকের নামাজের সময়:</h4>
                {comparison.current &&
                  Object.entries(comparison.current).map(([name, time]) => {
                    if (!prayerNamesBn[name]) return null;
                    const { time: time12, periodBn } = convertTo12Hour(time);
                    
                    return (
                      <div
                        key={name}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <span className="text-sm font-medium">
                          {prayerNamesBn[name]}
                        </span>
                        <span className="text-sm font-bold">
                          {time12} {periodBn}
                        </span>
                      </div>
                    );
                  })}
              </div>

              <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-green-700 dark:text-green-400 mb-1">
                    বাংলাদেশ স্ট্যান্ডার্ড
                  </p>
                  <p className="text-muted-foreground text-xs">
                    এই সময়সূচী বাংলাদেশের অফিসিয়াল নামাজের সময়ের সাথে
                    সামঞ্জস্যপূর্ণ। WeMuslim বা Islamic Foundation এর সাথে
                    তুলনা করুন।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-blue-700 dark:text-blue-400 mb-1">
                    কিভাবে যাচাই করবেন?
                  </p>
                  <ul className="text-muted-foreground text-xs space-y-1 list-disc list-inside">
                    <li>WeMuslim অ্যাপ খুলুন</li>
                    <li>আজকের তারিখের নামাজের সময় দেখুন</li>
                    <li>উপরের সময়ের সাথে তুলনা করুন</li>
                    <li>সময় মিলে গেলে সেটিংস সঠিক আছে</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
