import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { toast } from "sonner";

export const InstallPromptModal = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if app is already installed
    const isInstalled = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
    
    console.log("Install check - isInstalled:", isInstalled);
    
    if (isInstalled) {
      console.log("App already installed, not showing prompt");
      return; // Don't show prompt if already installed
    }

    // Check if user dismissed before (localStorage)
    const dismissed = localStorage.getItem("installPromptDismissed");
    if (dismissed === "true") {
      console.log("User previously dismissed, checking for beforeinstallprompt event");
    }

    let timeoutId: NodeJS.Timeout;
    let eventFired = false;

    // Listen for beforeinstallprompt event
    const handleBeforeInstall = (e: any) => {
      console.log("beforeinstallprompt event fired");
      e.preventDefault();
      eventFired = true;
      setDeferredPrompt(e);
      setShowPrompt(true); // Show modal automatically
      clearTimeout(timeoutId);
    };

    const handleAppInstalled = () => {
      console.log("App installed successfully");
      setShowPrompt(false);
      setDeferredPrompt(null);
      localStorage.setItem("appInstalled", "true");
      toast.success("অ্যাপ সফলভাবে ইনস্টল হয়েছে! ✨");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Fallback: Show modal after 2 seconds if beforeinstallprompt doesn't fire
    // This helps with testing and browsers that don't support the event
    timeoutId = setTimeout(() => {
      if (!eventFired && !isInstalled) {
        console.log("beforeinstallprompt event didn't fire, showing modal anyway");
        setShowPrompt(true);
      }
    }, 2000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      console.log("No deferredPrompt available");
      toast.info("অনুগ্রহ করে ব্রাউজার মেনু থেকে 'Add to Home Screen' নির্বাচন করুন", {
        description: "Chrome/Edge: মেনু (⋮) → Install app\niOS Safari: Share → Add to Home Screen",
        duration: 6000,
      });
      setShowPrompt(false);
      return;
    }

    try {
      console.log("Triggering install prompt");
      // Trigger native install prompt
      deferredPrompt.prompt();
      
      const { outcome } = await deferredPrompt.userChoice;
      console.log("User choice:", outcome);
      
      if (outcome === "accepted") {
        toast.success("ইনস্টল শুরু হয়েছে...");
        setShowPrompt(false);
        localStorage.setItem("appInstalled", "true");
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error("Install error:", error);
      toast.error("ইনস্টল করতে সমস্যা হয়েছে");
    }
  };

  const handleNotNow = () => {
    console.log("User clicked Not Now");
    setShowPrompt(false);
    localStorage.setItem("installPromptDismissed", "true");
    // Modal will show again on next app open
  };

  return (
    <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Download className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">
            কুরআন অ্যাপ ইনস্টল করুন। কারণঃ
          </DialogTitle>
          <DialogDescription className="text-center">
            আপনার ডিভাইসে অ্যাপটি ইনস্টল করে অফলাইনে সেরা অভিজ্ঞতা পাবেন। দ্রুত অ্যাক্সেস এবং অফলাইন ব্যবহার করুন।
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex-col sm:flex-col gap-2 sm:gap-2">
          <Button
            onClick={handleInstall}
            className="w-full"
            size="lg"
          >
            <Download className="mr-2 h-5 w-5" />
            ইনস্টল করুন
          </Button>
          <Button
            onClick={handleNotNow}
            variant="ghost"
            className="w-full"
            size="lg"
          >
            <X className="mr-2 h-4 w-4" />
            এখন নয়
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
