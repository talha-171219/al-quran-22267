import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, X, Loader2 } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import { useNavigate, useLocation } from "react-router-dom";

export const MiniPlayer = () => {
  const { 
    isPlaying, 
    isLoading,
    togglePlay, 
    skipNext, 
    skipPrev, 
    getSurahInfo, 
    currentSurah,
    showPlayer,
    hidePlayer 
  } = useAudio();
  const navigate = useNavigate();
  const location = useLocation();
  const surah = getSurahInfo();

  // Don't show mini player on audio page itself
  if (location.pathname === "/audio") {
    return null;
  }

  // Show when there's a surah selected and player is visible
  if (!currentSurah || !showPlayer) {
    return null;
  }

  return (
    <Card className="fixed bottom-20 left-0 right-0 mx-auto max-w-lg bg-gradient-primary text-primary-foreground shadow-lg border-0 z-40 animate-slide-up">
      <div className="flex items-center gap-3 p-3">
        <div 
          className="flex-1 min-w-0 cursor-pointer" 
          onClick={() => navigate("/audio")}
        >
          <p className="font-semibold text-sm truncate">{surah.banglaName}</p>
          <p className="text-xs opacity-75 truncate">
            {isLoading ? "লোড হচ্ছে..." : surah.banglaMeaning}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-primary-foreground hover:bg-white/10"
            onClick={skipPrev}
            disabled={currentSurah === 1 || isLoading}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            size="icon"
            className="h-10 w-10 bg-white/20 hover:bg-white/30 text-primary-foreground"
            onClick={togglePlay}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-primary-foreground hover:bg-white/10"
            onClick={skipNext}
            disabled={currentSurah === 114 || isLoading}
          >
            <SkipForward className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-primary-foreground hover:bg-white/10 ml-1"
            onClick={hidePlayer}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
