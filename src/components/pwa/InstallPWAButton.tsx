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
    const standalone = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
    const iosStandalone = (window.navigator as any).standalone === true;
    
    console.log("🔧 PWA Install Button initialized");
    console.log("📱 PWA Install Status:");
    console.log("  - isInstalled:", isInstalled);
    console.log("  - isStandalone (display-mode):", standalone);
    console.log("  - isIOSInstalled (navigator.standalone):", iosStandalone);
    console.log("  - userAgent:", navigator.userAgent);
    console.log("  - protocol:", window.location.protocol);
    console.log("  - hostname:", window.location.hostname);

    // Check service worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        console.log("🔄 Service Worker Status:");
        console.log("  - registered:", !!registration);
        console.log("  - state:", registration?.active?.state);
        console.log("  - scope:", registration?.scope);
        console.log("  - waiting:", !!registration?.waiting);
        console.log("  - installing:", !!registration?.installing);
      });
      
      navigator.serviceWorker.ready.then(() => {
        console.log("✅ Service Worker is ready");
      });
    } else {
      console.warn("⚠️ Service Worker not supported in this browser");
    }

    // Check manifest
    const manifestLink = document.querySelector('link[rel="manifest"]');
    console.log("📋 Manifest:");
    console.log("  - link found:", !!manifestLink);
    console.log("  - href:", manifestLink?.getAttribute('href'));
    
    // Try to fetch and validate manifest
    if (manifestLink) {
      fetch(manifestLink.getAttribute('href') || '')
        .then(res => res.json())
        .then(manifest => {
          console.log("📋 Manifest Content:");
          console.log("  - name:", manifest.name);
          console.log("  - short_name:", manifest.short_name);
          console.log("  - start_url:", manifest.start_url);
          console.log("  - display:", manifest.display);
          console.log("  - icons count:", manifest.icons?.length);
          console.log("  - has 192px icon:", manifest.icons?.some((i: any) => i.sizes.includes('192')));
          console.log("  - has 512px icon:", manifest.icons?.some((i: any) => i.sizes.includes('512')));
        })
        .catch(err => console.error("❌ Failed to fetch manifest:", err));
    }

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
      console.log("⏰ 5 second check - beforeinstallprompt fired?", !!deferredPrompt);
      if (!deferredPrompt && !standalone && !iosStandalone) {
        console.warn("⚠️ beforeinstallprompt event did NOT fire!");
        console.warn("🔍 Troubleshooting steps:");
        console.warn("  1. Check Chrome DevTools > Application > Manifest");
        console.warn("     - Make sure manifest has no errors");
        console.warn("     - Verify icons are loading (192px and 512px required)");
        console.warn("  2. Check Chrome DevTools > Application > Service Workers");
        console.warn("     - Service worker should be 'activated and running'");
        console.warn("  3. If you recently dismissed the prompt:");
        console.warn("     - Chrome has a 3-month cooldown period");
        console.warn("     - Clear site data in DevTools > Application > Storage");
        console.warn("  4. Check if already installed:");
        console.warn("     - Look for the app in chrome://apps");
        console.warn("     - Uninstall it from there if found");
        console.warn("  5. Try in Incognito mode (no history/cooldown)");
      }
    }, 5000);

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
