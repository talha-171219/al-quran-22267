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
    currentTrack,
    showPlayer,
    hidePlayer,
    currentTime,
    duration,
    handleSeek,
    formatTime
  } = useAudio();
  const navigate = useNavigate();
  const location = useLocation();
  const surah = getSurahInfo();

  // Don't show mini player on audio page itself
  if (location.pathname === "/audio") {
    return null;
  }
  // Show when player is visible
  if (!showPlayer) {
    return null;
  }

  const isCustom = currentTrack && currentTrack.type === 'custom';
  const title = isCustom ? (currentTrack!.title || "Gojol") : getSurahInfo().banglaName;
  const subtitle = isCustom ? "বাংলা গজল" : (isLoading ? "লোড হচ্ছে..." : getSurahInfo().banglaMeaning);

  return (
    <div className="fixed bottom-20 left-0 right-0 z-[9999] pointer-events-none px-2" style={{ position: 'fixed' }}>
      <Card className="pointer-events-auto max-w-lg mx-auto bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-xl border-0 animate-slide-up overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mini-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mini-grid)" />
        </svg>
      </div>

      <div className="p-2 relative z-10">
        <div className="flex items-center gap-3 px-3">
          <div 
            className="flex-1 min-w-0 cursor-pointer" 
            onClick={() => navigate("/audio")}
          >
            <p className="font-semibold text-sm truncate">{title}</p>
            <p className="text-xs opacity-75 truncate">{subtitle}</p>
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-white hover:bg-white/10"
              onClick={skipPrev}
              disabled={isCustom || currentSurah === 1 || isLoading}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              size="icon"
              className="h-10 w-10 bg-white/20 hover:bg-white/30 text-white"
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
              className="h-8 w-8 text-white hover:bg-white/10"
              onClick={skipNext}
              disabled={isCustom || currentSurah === 114 || isLoading}
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-white hover:bg-white/10 ml-1"
              onClick={hidePlayer}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Seekbar and timing */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-xs opacity-80 w-10 text-left">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={Math.min(currentTime, duration || 0)}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-xs opacity-80 w-10 text-right">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      </Card>
    </div>
  );
};
