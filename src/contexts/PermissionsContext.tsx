import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Bell, Download, X } from "lucide-react";
import { WelcomeCard } from "@/components/onboarding/WelcomeCard";
import { versionManager } from "@/utils/versionManager";

interface PermissionsContextType {
  locationPermission: boolean;
  notificationPermission: boolean;
  requestLocationPermission: () => Promise<boolean>;
  requestNotificationPermission: () => Promise<boolean>;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error("usePermissions must be used within PermissionsProvider");
  }
  return context;
};

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(false);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [permissionStep, setPermissionStep] = useState<"location" | "notification" | "install" | "welcome" | "done">("location");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if permissions have been requested before
    const permissionsRequested = localStorage.getItem("permissionsRequested");
    const isInstalled = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
    
    const checkPermissions = async () => {
      // Check location permission
      if ('permissions' in navigator) {
        try {
          const locPerm = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
          setLocationPermission(locPerm.state === 'granted');
        } catch (error) {
          console.error('Permission check error:', error);
        }
      }

      // Check notification permission
      if ('Notification' in window) {
        setNotificationPermission(Notification.permission === 'granted');
      }
    };

    checkPermissions();

    // Listen for beforeinstallprompt event
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      localStorage.setItem("appInstalled", "true");
      toast.success("অ্যাপ সফলভাবে ইনস্টল হয়েছে! ✨");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Show permission dialog if not requested before
    if (!permissionsRequested) {
      setTimeout(() => {
        setShowPermissionDialog(true);
      }, 1000);
    } else {
      // Permissions already done, check for updates or first visit
      const checkWelcome = async () => {
        const isUpdate = await versionManager.isUpdateAvailable();
        const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
        
        if (isUpdate || !hasSeenWelcome) {
          // Show welcome for updates or first visit
          setTimeout(() => {
            setShowWelcome(true);
          }, 500);
        }
      };
      checkWelcome();
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const requestLocationPermission = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => {
            setLocationPermission(true);
            toast.success("লোকেশন অনুমতি প্রদান করা হয়েছে");
            resolve(true);
          },
          () => {
            toast.error("লোকেশন অনুমতি প্রয়োজন");
            resolve(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        resolve(false);
      }
    });
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      return false;
    }

    if (Notification.permission === 'granted') {
      setNotificationPermission(true);
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      setNotificationPermission(granted);
      if (granted) {
        toast.success("নোটিফিকেশন অনুমতি প্রদান করা হয়েছে");
      }
      return granted;
    }

    return false;
  };

  const handleLocationRequest = async () => {
    const granted = await requestLocationPermission();
    if (granted) {
      setPermissionStep("notification");
    } else {
      // Skip to notification even if location denied
      setPermissionStep("notification");
    }
  };

  const handleNotificationRequest = async () => {
    await requestNotificationPermission();
    setPermissionStep("install");
  };

  const handleInstall = async () => {
    if (!deferredPrompt) {
      toast.info("অনুগ্রহ করে ব্রাউজার মেনু থেকে 'Add to Home Screen' নির্বাচন করুন", {
        description: "Chrome/Edge: মেনু (⋮) → Install app\niOS Safari: Share → Add to Home Screen",
        duration: 6000,
      });
      setPermissionStep("welcome");
      setShowPermissionDialog(false);
      setTimeout(() => setShowWelcome(true), 300);
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === "accepted") {
        toast.success("ইনস্টল শুরু হয়েছে...");
        localStorage.setItem("appInstalled", "true");
      }
      
      setDeferredPrompt(null);
      setPermissionStep("welcome");
      setShowPermissionDialog(false);
      setTimeout(() => setShowWelcome(true), 300);
    } catch (error) {
      console.error("Install error:", error);
      setPermissionStep("welcome");
      setShowPermissionDialog(false);
      setTimeout(() => setShowWelcome(true), 300);
    }
  };

  const handleSkip = () => {
    if (permissionStep === "location") {
      setPermissionStep("notification");
    } else if (permissionStep === "notification") {
      setPermissionStep("install");
    } else if (permissionStep === "install") {
      setPermissionStep("welcome");
      setShowPermissionDialog(false);
      setTimeout(() => setShowWelcome(true), 300);
    }
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setPermissionStep("done");
    localStorage.setItem("permissionsRequested", "true");
  };

  return (
    <PermissionsContext.Provider
      value={{
        locationPermission,
        notificationPermission,
        requestLocationPermission,
        requestNotificationPermission,
      }}
    >
      {children}

      {/* Welcome Card */}
      {showWelcome && <WelcomeCard onComplete={handleWelcomeComplete} />}

      {/* Permission Request Dialog */}
      <Dialog open={showPermissionDialog} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur">
          {permissionStep === "location" && (
            <>
              <DialogHeader>
                <div className="mx-auto mb-4">
                  <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-blue-500" />
                  </div>
                </div>
                <DialogTitle className="text-center text-xl">
                  লোকেশন অনুমতি
                </DialogTitle>
                <DialogDescription className="text-center">
                  আপনার এলাকার সঠিক নামাজের সময় দেখতে লোকেশন অনুমতি প্রয়োজন
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-4">
                <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                  <p className="text-sm font-medium">কেন প্রয়োজন?</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ সঠিক শহরের নাম দেখাতে</li>
                    <li>✓ নির্ভুল নামাজের সময় পেতে</li>
                    <li>✓ আপনার এলাকা অনুযায়ী সময় সেট করতে</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <Button onClick={handleLocationRequest} size="lg" className="w-full">
                  লোকেশন অনুমতি দিন
                </Button>
                <Button onClick={handleSkip} variant="ghost" size="sm" className="w-full">
                  এখন নয়
                </Button>
              </div>
            </>
          )}

          {permissionStep === "notification" && (
            <>
              <DialogHeader>
                <div className="mx-auto mb-4">
                  <div className="w-24 h-24 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Bell className="h-12 w-12 text-orange-500" />
                  </div>
                </div>
                <DialogTitle className="text-center text-xl">
                  নোটিফিকেশন অনুমতি
                </DialogTitle>
                <DialogDescription className="text-center">
                  নামাজের সময় হলে নোটিফিকেশন পেতে অনুমতি প্রয়োজন
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-4">
                <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                  <p className="text-sm font-medium">কেন প্রয়োজন?</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ নামাজের সময় মনে করিয়ে দিতে</li>
                    <li>✓ আযান এর সময় জানাতে</li>
                    <li>✓ ৫ মিনিট আগে অ্যালার্ম দিতে</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <Button onClick={handleNotificationRequest} size="lg" className="w-full">
                  নোটিফিকেশন অনুমতি দিন
                </Button>
                <Button onClick={handleSkip} variant="ghost" size="sm" className="w-full">
                  এখন নয়
                </Button>
              </div>
            </>
          )}

          {permissionStep === "install" && (
            <>
              <DialogHeader>
                <div className="mx-auto mb-4">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <Download className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <DialogTitle className="text-center text-xl">
                  কুরআন অ্যাপ ইনস্টল করুন?
                </DialogTitle>
                <DialogDescription className="text-center">
                  আপনার ডিভাইসে অ্যাপটি ইনস্টল করে সেরা অভিজ্ঞতা পান। দ্রুত অ্যাক্সেস এবং অফলাইন ব্যবহার করুন।
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2 py-4">
                <Button onClick={handleInstall} size="lg" className="w-full">
                  <Download className="mr-2 h-5 w-5" />
                  ইনস্টল করুন
                </Button>
                <Button onClick={handleSkip} variant="ghost" size="sm" className="w-full">
                  <X className="mr-2 h-4 w-4" />
                  এখন নয়
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PermissionsContext.Provider>
  );
};
