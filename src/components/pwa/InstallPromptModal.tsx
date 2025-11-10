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
    
    if (isInstalled) {
      return; // Don't show prompt if already installed
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true); // Show modal automatically
    };

    const handleAppInstalled = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
      toast.success("অ্যাপ সফলভাবে ইনস্টল হয়েছে! ✨");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      toast.error("ইনস্টল সুবিধা উপলব্ধ নেই");
      return;
    }

    // Trigger native install prompt
    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      toast.success("ইনস্টল শুরু হয়েছে...");
      setShowPrompt(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleNotNow = () => {
    setShowPrompt(false);
    // Note: We don't store anything in localStorage, so it will show again next time
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
            কুরআন অ্যাপ ইনস্টল করুন?
          </DialogTitle>
          <DialogDescription className="text-center">
            আপনার ডিভাইসে অ্যাপটি ইনস্টল করে সেরা অভিজ্ঞতা পান। দ্রুত অ্যাক্সেস এবং অফলাইন ব্যবহার করুন।
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
