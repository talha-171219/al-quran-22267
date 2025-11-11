import { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineAlert(false);
      console.log('✅ অনলাইন - ইন্টারনেট সংযোগ পুনরুদ্ধার হয়েছে');
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineAlert(true);
      console.log('📱 অফলাইন মোড - ক্যাশ করা কন্টেন্ট দেখাচ্ছে');
      
      // Auto-hide alert after 5 seconds
      setTimeout(() => setShowOfflineAlert(false), 5000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Show alert initially if offline
    if (!navigator.onLine) {
      setShowOfflineAlert(true);
      setTimeout(() => setShowOfflineAlert(false), 5000);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineAlert) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-50 animate-in fade-in slide-in-from-top-5">
      <Alert className={isOnline ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800" : "bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800"}>
        <div className="flex items-start gap-3">
          {isOnline ? (
            <Wifi className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
          ) : (
            <WifiOff className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
          )}
          <div className="flex-1">
            <AlertDescription className="text-sm">
              {isOnline ? (
                <span className="text-green-800 dark:text-green-200 font-medium">
                  ✅ ইন্টারনেট সংযোগ পুনরুদ্ধার হয়েছে
                </span>
              ) : (
                <div className="space-y-1">
                  <p className="text-amber-800 dark:text-amber-200 font-medium">
                    📱 অফলাইন মোড সক্রিয়
                  </p>
                  <p className="text-amber-700 dark:text-amber-300 text-xs">
                    কুরআন, হাদিস, প্রার্থনা সময়, তাসবীহ, আযকার এবং যাকাত ক্যালকুলেটর অফলাইনে কাজ করছে
                  </p>
                </div>
              )}
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </div>
  );
};
