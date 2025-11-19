import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    if (!app) {
      navigate("/explore");
    }
  }, [app, navigate]);

  if (!app) {
    return null;
  }

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

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-40">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
          onLoad={() => setLoading(false)}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          style={{ minHeight: "calc(100vh - 60px)" }}
        />
      </div>
    </div>
  );
};

export default MiniAppViewer;
