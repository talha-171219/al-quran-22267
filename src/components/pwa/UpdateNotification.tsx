import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RefreshCw } from "lucide-react";

export const UpdateNotification = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Check for updates every 5 minutes
      const interval = setInterval(() => {
        navigator.serviceWorker.getRegistration().then((reg) => {
          if (reg) {
            reg.update();
          }
        });
      }, 5 * 60 * 1000);

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
        window.location.reload();
      });

      return () => clearInterval(interval);
    }
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      // Tell the service worker to skip waiting
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  return (
    <AlertDialog open={showUpdate} onOpenChange={setShowUpdate}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            নতুন আপডেট উপলব্ধ
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            আপনার অ্যাপের একটি নতুন সংস্করণ উপলব্ধ। সর্বশেষ বৈশিষ্ট্য এবং উন্নতি পেতে এখনই আপডেট করুন।
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-col gap-2">
          <Button 
            onClick={handleUpdate} 
            className="w-full"
            size="lg"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            এখনই আপডেট করুন
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowUpdate(false)}
            className="w-full"
          >
            পরে আপডেট করব
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
