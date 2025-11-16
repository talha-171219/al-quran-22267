import { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineAlert, setShowOfflineAlert] = useState(!navigator.onLine);

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
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

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
                <div className="space-y-2">
                  <p className="text-amber-800 dark:text-amber-200 font-medium">
                    📱 আপনি এখন অফলাইনে আছেন
                  </p>
                  <p className="text-amber-700 dark:text-amber-300 text-xs">
                    প্লেলিস্ট ও যে কন্টেন্টগুলো আগে লোড করা হয়েছে (কুরআন, হাদিস, সেভ করা গান, প্রার্থনা সময় ইত্যাদি) অফলাইনে দেখা/চলতে পারে।
                  </p>
                  <p className="text-amber-700 dark:text-amber-300 text-xs">
                    ভিডিও স্ট্রিমিং (YouTube iframe) অনলাইনে ছাড়া সম্ভব নয়। অনলাইন ফিরে এলে পূর্ণ কার্যকারিতা ফিরে পাবে।
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        // Try reload to re-check network and resources
                        try { window.location.reload(); } catch (e) { console.error(e); }
                      }}
                      className="px-3 py-1 bg-amber-700 text-white text-xs rounded-md hover:bg-amber-600"
                    >
                      রিলোড করুন
                    </button>
                    <button
                      onClick={() => setShowOfflineAlert(false)}
                      className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-md hover:bg-amber-200"
                    >
                      বন্ধ করুন
                    </button>
                  </div>
                </div>
              )}
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </div>
  );
};
