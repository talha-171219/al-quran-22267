import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔧 PWA Install Button initialized");
    console.log("📱 PWA Install Status:", { 
      installed: isInstalled, 
      isIOSInstalled: (window.navigator as any).standalone === true,
      isStandalone: window.matchMedia && window.matchMedia("(display-mode: standalone)").matches,
      userAgent: navigator.userAgent
    });

    // Check service worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        console.log("🔄 Service Worker Status:", {
          registered: !!registration,
          state: registration?.active?.state,
          scope: registration?.scope
        });
      });
    } else {
      console.warn("⚠️ Service Worker not supported in this browser");
    }

    // Check manifest
    const manifestLink = document.querySelector('link[rel="manifest"]');
    console.log("📋 Manifest Link:", manifestLink?.getAttribute('href'));

    // Check if already installed
    const installed = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
    const isIOSInstalled = (window.navigator as any).standalone === true;
    setIsInstalled(installed || isIOSInstalled);

    // Don't set up event listeners if already installed
    if (installed || isIOSInstalled) {
      console.log("✅ App is already installed (standalone mode)");
      return;
    }

    const onBeforeInstall = (e: any) => {
      console.log('🎯 beforeinstallprompt event fired!', e);
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };
    
    const onInstalled = () => {
      console.log('✅ App installed successfully');
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
      toast.success("অ্যাপ সফলভাবে ইনস্টল হয়েছে! ✨");
    };

    console.log("👂 Setting up beforeinstallprompt listener");
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    
    // Always show button - it will navigate to install guide if needed
    setCanInstall(true);

    // Check after a delay if event fired
    setTimeout(() => {
      console.log("⏰ 3 second check - beforeinstallprompt fired?", !!deferredPrompt);
      if (!deferredPrompt && !installed && !isIOSInstalled) {
        console.warn("⚠️ beforeinstallprompt event did not fire. Possible reasons:");
        console.warn("  1. App might already be installed");
        console.warn("  2. User dismissed prompt recently (browser cooldown)");
        console.warn("  3. PWA criteria not met (check manifest, service worker, HTTPS)");
        console.warn("  4. Browser doesn't support installation");
      }
    }, 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleClick = async () => {
    console.log('🔘 Install button clicked');
    console.log("📊 Current state:", { 
      hasDeferredPrompt: !!deferredPrompt,
      canInstall,
      isInstalled 
    });
    
    if (deferredPrompt) {
      try {
        console.log('🚀 Showing install prompt...');
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        console.log('📊 User choice:', outcome);
        
        if (outcome === "accepted") {
          toast.success("ইনস্টল শুরু হয়েছে...");
        } else {
          toast.info("ইনস্টল ক্যান্সেল করা হয়েছে");
        }
        
        setDeferredPrompt(null);
        setCanInstall(false);
      } catch (error) {
        console.error("Install error:", error);
        // Fallback to install guide page
        navigate("/install");
      }
      return;
    }
    
    console.log('ℹ️ No deferred prompt, navigating to install guide');
    // If no prompt available, navigate to install guide
    navigate("/install");
  };

  if (isInstalled) return null;

  // Always show the button, it will navigate to install guide if prompt not available
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-primary-foreground hover:bg-white/10"
      onClick={handleClick}
      title="অ্যাপ ইনস্টল করুন"
      aria-label="Install app"
    >
      <Download className="h-5 w-5" />
    </Button>
  );
};
