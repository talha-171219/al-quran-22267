import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import lottie from "lottie-web";
import loadingData from "@/assets/lottie/loading.json";

interface MiniApp {
  id: string;
  thumbnail: string;
  url: string;
  title: string;
}

const MiniAppViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const app = location.state?.app as MiniApp;
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const loadingStartTime = useRef<number>(Date.now());

  useEffect(() => {
    if (!app) {
      navigate("/explore");
    }
  }, [app, navigate]);

  // Initialize Lottie loading animation
  useEffect(() => {
    if (loading && lottieContainerRef.current) {
      lottieContainerRef.current.innerHTML = '';
      const anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: loadingData,
      });

      return () => {
        anim.destroy();
      };
    }
  }, [loading]);

  if (!app) {
    return null;
  }

  const isComingSoon = !app.url || app.url === "/explore";

  const handleIframeLoad = () => {
    const elapsedTime = Date.now() - loadingStartTime.current;
    const minLoadingTime = 5500; // 5.5 seconds
    const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
    
    setTimeout(() => {
      setLoading(false);
    }, remainingTime);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/explore")}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">{app.title}</h1>
        </div>
      </div>

      {isComingSoon ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4 max-w-md">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-3xl font-bold text-foreground">Coming Soon</h2>
            <p className="text-muted-foreground text-lg">
              This mini-app is under development and will be available soon.
            </p>
            <Button
              onClick={() => navigate("/explore")}
              className="mt-6"
            >
              Back to Explore
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Loading Indicator */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-40">
              <div className="flex flex-col items-center gap-4">
                <div ref={lottieContainerRef} className="w-20 h-20" />
                <p className="text-sm text-muted-foreground">Loading mini-app...</p>
              </div>
            </div>
          )}

          {/* iFrame Container */}
          <div className="flex-1 relative">
            <iframe
              src={app.url}
              className="w-full h-full border-0"
              title={app.title}
              onLoad={handleIframeLoad}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              style={{ minHeight: "calc(100vh - 60px)" }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MiniAppViewer;
