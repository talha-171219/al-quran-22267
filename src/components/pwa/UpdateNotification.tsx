import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { versionManager } from "@/utils/versionManager";

export const UpdateNotification = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      let refreshing = false;

      // Check for updates every 2 minutes
      const interval = setInterval(() => {
        navigator.serviceWorker.getRegistration().then((reg) => {
          if (reg) {
            reg.update();
          }
        });
      }, 2 * 60 * 1000);

      // Check immediately on mount
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          reg.update();
        }
      });

      // Listen for new service worker waiting
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);
        
        if (reg.waiting) {
          setShowUpdate(true);
        }

        // Listen for updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setShowUpdate(true);
              }
            });
          }
        });
      });

      // Listen for controller change (new service worker took over)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });

      return () => clearInterval(interval);
    }
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    
    // Clear all caches before updating
    await versionManager.clearAllCaches();
    
    if (registration?.waiting) {
      // Tell the service worker to skip waiting
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    } else {
      // If no waiting worker, just reload
      window.location.reload();
    }
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-background border border-border rounded-lg shadow-2xl max-w-md w-full p-6 space-y-4 animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="relative">
              <Sparkles className="h-10 w-10 text-primary animate-pulse" />
              <RefreshCw className="h-5 w-5 text-primary absolute -bottom-1 -right-1 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-foreground">
              আপডেট উপলব্ধ
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              অ্যাপের একটি নতুন সংস্করণ প্রস্তুত। সর্বশেষ বৈশিষ্ট্য এবং উন্নতি পেতে এখনই আপডেট করুন।
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 pt-2">
          <Button 
            onClick={handleUpdate} 
            className="w-full group relative overflow-hidden"
            size="lg"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                আপডেট হচ্ছে...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                এখনই আপডেট করুন
              </>
            )}
            {isUpdating && (
              <div className="absolute inset-0 bg-primary/20 animate-pulse" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
