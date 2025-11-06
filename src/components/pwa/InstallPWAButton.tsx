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
    const installed = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
    setIsInstalled(installed);

    const onBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };
    const onInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
      toast.success("অ্যাপ ইনস্টল হয়েছে");
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        toast.success("ইনস্টল শুরু হয়েছে");
      }
      setDeferredPrompt(null);
      setCanInstall(false);
      return;
    }
    // Fallback: open install guide page
    navigate("/install");
  };

  if (isInstalled) return null;

  // Show when we can install or as a shortcut to the guide
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
