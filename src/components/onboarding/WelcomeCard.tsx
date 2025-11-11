import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { versionManager } from "@/utils/versionManager";

interface WelcomeCardProps {
  onComplete?: () => void;
}

export const WelcomeCard = ({ onComplete }: WelcomeCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [welcomeType, setWelcomeType] = useState<"first" | "update" | "refresh">("first");
  const [autoNavigate, setAutoNavigate] = useState(false);

  useEffect(() => {
    const detectWelcomeType = async () => {
      const isUpdate = await versionManager.isUpdateAvailable();
      const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
      
      if (isUpdate) {
        setWelcomeType("update");
        setAutoNavigate(false);
      } else if (hasSeenWelcome === "true") {
        setWelcomeType("refresh");
        setAutoNavigate(true);
      } else {
        setWelcomeType("first");
        setAutoNavigate(false);
        localStorage.setItem("hasSeenWelcome", "true");
      }
    };

    detectWelcomeType();
    
    // Trigger animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    if (autoNavigate && welcomeType === "refresh") {
      const timer = setTimeout(() => {
        handleEnter();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoNavigate, welcomeType]);

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onComplete) onComplete();
      // Navigate to home page without using react-router
      window.location.href = "/";
    }, 300);
  };

  const getWelcomeContent = () => {
    switch (welcomeType) {
      case "update":
        return {
          title: "Welcome to New DeenSphereX",
          subtitle: "Experience upgraded features and deeper guidance.",
          message: "May this version bring more light to your journey.",
          verse: "\"Indeed, in the remembrance of Allah do hearts find rest.\" — Surah Ar-Ra'd 13:28",
          showButton: true,
        };
      case "refresh":
        return {
          title: "Welcome Back to DeenSphereX",
          subtitle: "Reconnecting your journey of Faith and Knowledge...",
          message: "",
          verse: "\"Indeed, in the remembrance of Allah do hearts find rest.\" — Surah Ar-Ra'd 13:28",
          showButton: false,
        };
      default:
        return {
          title: "Welcome to DeenSphereX",
          subtitle: "Your journey of Faith, Knowledge, and Light begins here.",
          message: "Explore Quran, Hadith, Duas, and more — all in one Islamic world.",
          verse: "\"Indeed, in the remembrance of Allah do hearts find rest.\" — Surah Ar-Ra'd 13:28",
          showButton: true,
        };
    }
  };

  const content = getWelcomeContent();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/5 backdrop-blur-xl p-4">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Welcome Card */}
      <div
        className={`
          relative max-w-lg w-full mx-4
          bg-card/95 backdrop-blur-xl
          rounded-3xl shadow-2xl
          border border-border/50
          overflow-hidden
          transition-all duration-700 ease-out
          ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
        `}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
        
        {/* Animated border glow */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-primary via-accent to-primary opacity-20 blur-xl animate-pulse" />

        <div className="relative p-8 space-y-6">
          {/* Logo with glow */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Sparkles className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              🌙 {content.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {content.subtitle}
            </p>
            {content.message && (
              <p className="text-base text-foreground/80">
                {content.message}
              </p>
            )}
          </div>

          {/* Animated divider */}
          <div className="relative h-[2px] w-full overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent"
              style={{
                animation: "shimmer 2s infinite",
              }}
            />
          </div>

          {/* Verse */}
          <div className="text-center p-4 rounded-xl bg-muted/30 backdrop-blur">
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              {content.verse}
            </p>
          </div>

          {/* Button or Loading */}
          {content.showButton ? (
            <Button
              onClick={handleEnter}
              size="lg"
              className="w-full relative group overflow-hidden bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Enter the Light
                <Sparkles className="h-4 w-4 animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          )}

          {/* Footer */}
          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              🕋 Powered by DeenSphereX
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
