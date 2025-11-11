import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { versionManager, APP_VERSION } from "@/utils/versionManager";

export const UpdateNotification = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [newVersion, setNewVersion] = useState<string>('');
  const [oldVersion, setOldVersion] = useState<string>('');

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      let userInitiatedUpdate = false;

      // Get version info
      const loadVersionInfo = async () => {
        const stored = await versionManager.getStoredVersion();
        setOldVersion(stored?.version || '');
        setNewVersion(APP_VERSION);
      };
      loadVersionInfo();

      // Function to check for waiting service worker
      const checkForWaitingWorker = async () => {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) {
          setRegistration(reg);
          
          // Check if there's a waiting worker (update available)
          if (reg.waiting) {
            console.log('Update available - waiting worker found on app open');
            setShowUpdate(true);
            toast.info(`নতুন আপডেট উপলব্ধ! (v${APP_VERSION})`, {
              description: 'আপডেট বাটনে ক্লিক করুন'
            });
            return true;
          }
          
          // Check if there's an installing worker
          if (reg.installing) {
            console.log('Update installing - will show notification when ready');
            const newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('Update ready - showing notification');
                setShowUpdate(true);
                setRegistration(reg);
                toast.info(`নতুন আপডেট উপলব্ধ! (v${APP_VERSION})`, {
                  description: 'আপডেট বাটনে ক্লিক করুন'
                });
              }
            });
          }
        }
        return false;
      };

      // Check immediately when component mounts (when user opens app)
      checkForWaitingWorker();

      // Also force an update check to detect new versions
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          reg.update().then(() => {
            console.log('Update check completed');
          });
        }
      });

      // Check for updates periodically (every 5 minutes)
      const interval = setInterval(() => {
        navigator.serviceWorker.getRegistration().then((reg) => {
          if (reg) {
            reg.update();
          }
        });
      }, 5 * 60 * 1000);

      // Listen for new updates while app is running
      navigator.serviceWorker.ready.then((reg) => {
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          console.log('Update found - new worker installing');
          
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              console.log('Worker state changed:', newWorker.state);
              
              // Only show update notification if there's already an active controller
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('Update ready - showing notification');
                setShowUpdate(true);
                setRegistration(reg);
                toast.info(`নতুন আপডেট উপলব্ধ! (v${APP_VERSION})`, {
                  description: 'আপডেট বাটনে ক্লিক করুন'
                });
              }
            });
          }
        });
      });

      // Listen for controller change ONLY after user initiates update
      const handleControllerChange = () => {
        if (userInitiatedUpdate) {
          console.log('Controller changed - reloading');
          window.location.reload();
        }
      };

      navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

      // Store the setter for user-initiated updates
      (window as any).__userInitiatedUpdate = () => {
        userInitiatedUpdate = true;
      };

      return () => {
        clearInterval(interval);
        navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
      };
    }
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    console.log('User initiated update');
    
    // Mark that this update is user-initiated
    if ((window as any).__userInitiatedUpdate) {
      (window as any).__userInitiatedUpdate();
    }
    
    // Clear all caches before updating
    try {
      await versionManager.clearAllCaches();
      console.log('Caches cleared');
    } catch (error) {
      console.error('Error clearing caches:', error);
    }
    
    // Show success message
    setUpdateSuccess(true);
    
    // Wait a moment to show success, then activate new service worker
    setTimeout(() => {
      if (registration?.waiting) {
        console.log('Telling service worker to skip waiting');
        // Tell the service worker to skip waiting and take control
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      } else {
        console.log('No waiting worker, reloading directly');
        // If no waiting worker, just reload
        window.location.reload();
      }
    }, 1500);
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-background border border-border rounded-lg shadow-2xl max-w-md w-full p-6 space-y-4 animate-in slide-in-from-bottom-4 duration-300">
        {updateSuccess ? (
          // Success view
          <div className="flex flex-col items-center justify-center space-y-6 py-4 animate-in zoom-in duration-300">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-in scale-in duration-500">
                <CheckCircle2 className="h-12 w-12 text-primary animate-in zoom-in duration-300" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-foreground animate-in slide-in-from-bottom-2 duration-300">
                আপডেট সফল হয়েছে! ✨
              </h3>
              <p className="text-muted-foreground text-sm animate-in slide-in-from-bottom-2 duration-500">
                অ্যাপ পুনরায় লোড হচ্ছে...
              </p>
            </div>
          </div>
        ) : isUpdating ? (
          // Updating progress view
          <div className="flex flex-col items-center justify-center space-y-6 py-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-primary/20 animate-pulse" />
              <RefreshCw className="h-20 w-20 text-primary absolute inset-0 animate-spin" style={{ animationDuration: '1s' }} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-foreground animate-pulse">
                আপডেট হচ্ছে...
              </h3>
              <p className="text-muted-foreground text-sm">
                অনুগ্রহ করে অপেক্ষা করুন
              </p>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div className="h-full bg-primary animate-[slide-in-right_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        ) : (
          // Update available view
          <>
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
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    অ্যাপের একটি নতুন সংস্করণ প্রস্তুত। সর্বশেষ বৈশিষ্ট্য এবং উন্নতি পেতে এখনই আপডেট করুন।
                  </p>
                  {oldVersion && newVersion && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 bg-muted rounded text-muted-foreground">
                        v{oldVersion}
                      </span>
                      <span className="text-muted-foreground">→</span>
                      <span className="px-2 py-1 bg-primary/10 rounded text-primary font-semibold">
                        v{newVersion}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 pt-2">
              <Button 
                onClick={handleUpdate} 
                className="w-full group"
                size="lg"
              >
                <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                এখনই আপডেট করুন
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
