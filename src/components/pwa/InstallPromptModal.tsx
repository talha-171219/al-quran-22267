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
    const isIOSInstalled = (window.navigator as any).standalone === true;
    
    if (isInstalled || isIOSInstalled) {
      return; // Don't show prompt if already installed
    }

    // Check if user dismissed recently (within last 7 days)
    const dismissedTime = localStorage.getItem("installPromptDismissedTime");
    if (dismissedTime) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        return; // Don't show again within 7 days
      }
    }

    let timeoutId: NodeJS.Timeout;

    // Listen for beforeinstallprompt event
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt after a short delay
      timeoutId = setTimeout(() => {
        setShowPrompt(true);
      }, 3000); // Show after 3 seconds
    };

    const handleAppInstalled = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
      localStorage.removeItem("installPromptDismissedTime");
      toast.success("অ্যাপ সফলভাবে ইনস্টল হয়েছে! ✨");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // Show manual installation instructions
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      
      let instructions = "অ্যাপ ইনস্টল করতে:\n\n";
      
      if (isIOS) {
        instructions += "Safari এ:\n1. Share বাটনে ট্যাপ করুন (↑)\n2. 'Add to Home Screen' সিলেক্ট করুন\n3. 'Add' চাপুন";
      } else if (isAndroid) {
        instructions += "Chrome এ:\n1. মেনু বাটন ট্যাপ করুন (⋮)\n2. 'Install app' বা 'Add to Home Screen' সিলেক্ট করুন\n3. 'Install' চাপুন";
      } else {
        instructions += "Desktop এ:\n1. Address bar এ install আইকন (⊕) ক্লিক করুন\n2. অথবা মেনু থেকে 'Install app' সিলেক্ট করুন";
      }
      
      toast.info(instructions, {
        duration: 10000,
      });
      setShowPrompt(false);
      return;
    }

    try {
      // Trigger native install prompt
      await deferredPrompt.prompt();
      
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === "accepted") {
        toast.success("ইনস্টল শুরু হয়েছে...");
        setShowPrompt(false);
        localStorage.removeItem("installPromptDismissedTime");
      } else {
        toast.info("ইনস্টল ক্যান্সেল করা হয়েছে");
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error("Install error:", error);
      toast.error("ইনস্টল করতে সমস্যা হয়েছে। ম্যানুয়ালি ব্রাউজার মেনু থেকে চেষ্টা করুন।");
    }
  };

  const handleNotNow = () => {
    setShowPrompt(false);
    // Save dismiss time to not show again for 7 days
    localStorage.setItem("installPromptDismissedTime", Date.now().toString());
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
