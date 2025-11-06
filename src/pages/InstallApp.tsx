import { useEffect, useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle, Smartphone, Monitor } from "lucide-react";
import { toast } from "sonner";

const InstallApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast.info("ইনস্টল অপশন আপনার ব্রাউজারে দেখাবে");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      toast.success("অ্যাপ ইনস্টল হচ্ছে...");
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="অ্যাপ ইনস্টল করুন" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {isInstalled ? (
          <Card className="p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">ইনস্টল সম্পন্ন!</h2>
              <p className="text-muted-foreground">
                Al-Quran অ্যাপটি আপনার ডিভাইসে ইনস্টল করা আছে
              </p>
            </div>
          </Card>
        ) : (
          <>
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Download className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1">
                    Al-Quran অ্যাপ ইনস্টল করুন
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    অফলাইনেও ব্যবহার করতে পারবেন
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Desktop (Chrome/Edge)
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                {deferredPrompt ? (
                  <Button onClick={handleInstallClick} className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    এখনই ইনস্টল করুন
                  </Button>
                ) : (
                  <>
                    <p>১. Address bar এর ডানদিকে Install icon (⊕) এ ক্লিক করুন</p>
                    <p>২. "Install" বাটনে ক্লিক করুন</p>
                  </>
                )}
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Android (Chrome)
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                {deferredPrompt ? (
                  <Button onClick={handleInstallClick} className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    এখনই ইনস্টল করুন
                  </Button>
                ) : (
                  <>
                    <p>১. মেনু বাটন (⋮) এ ট্যাপ করুন</p>
                    <p>২. "Add to Home screen" বা "Install app" সিলেক্ট করুন</p>
                    <p>৩. "Add" বা "Install" এ ট্যাপ করুন</p>
                  </>
                )}
              </div>
            </Card>

            {isIOS && (
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  iPhone/iPad (Safari)
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>১. নিচের Share বাটন (⎋) এ ট্যাপ করুন</p>
                  <p>২. "Add to Home Screen" খুঁজুন এবং ট্যাপ করুন</p>
                  <p>৩. "Add" বাটনে ট্যাপ করুন</p>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg mt-3">
                    <p className="text-blue-700 dark:text-blue-300">
                      📱 Safari ব্রাউজার ব্যবহার করতে হবে
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-6 space-y-3 bg-muted/50">
              <h3 className="font-semibold">সুবিধা সমূহ:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Home screen থেকে সরাসরি ওপেন করতে পারবেন</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>ইন্টারনেট ছাড়াই অফলাইনে কাজ করবে</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>দ্রুত লোড হবে এবং কম ডেটা খরচ হবে</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Native app এর মতো অভিজ্ঞতা পাবেন</span>
                </li>
              </ul>
            </Card>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default InstallApp;
