import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Download, Volume2, Check } from "lucide-react";
import { useState } from "react";
import { surahList } from "@/data/surahs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAudio } from "@/contexts/AudioContext";

const Audio = () => {
  const [search, setSearch] = useState("");
  const {
    currentSurah,
    isPlaying,
    currentTime,
    duration,
    isLoading,
    cachedSurahs,
    setCurrentSurah,
    togglePlay,
    skipNext,
    skipPrev,
    handleSeek,
    handleDownload,
    formatTime,
    getSurahInfo,
    audioRef,
  } = useAudio();

  const surah = getSurahInfo();

  const filteredSurahs = surahList.filter(s =>
    s.banglaName.toLowerCase().includes(search.toLowerCase()) ||
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="কুরআন অডিও" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Player */}
        <Card className="p-6 bg-gradient-primary text-primary-foreground">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-1">{surah.banglaName}</h3>
            <p className="text-sm opacity-90">{surah.banglaMeaning} • {surah.verses} আয়াত</p>
            <p className="text-xs opacity-75 mt-1">Sheikh Mishary Rashid Alafasy</p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              size="icon"
              variant="ghost"
              className="text-primary-foreground hover:bg-white/10"
              onClick={skipPrev}
              disabled={currentSurah === 1}
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              size="icon"
              className="h-16 w-16 bg-white/20 hover:bg-white/30 text-primary-foreground"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className="text-primary-foreground hover:bg-white/10"
              onClick={skipNext}
              disabled={currentSurah === 114}
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
            <div className="flex justify-between text-xs opacity-75">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-white/10"
              onClick={handleDownload}
              disabled={isLoading || cachedSurahs.includes(currentSurah)}
            >
              {cachedSurahs.includes(currentSurah) ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  ডাউনলোড হয়েছে
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  অফলাইন ডাউনলোড
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-white/10"
              onClick={() => {
                if (audioRef.current) {
                  const speeds = [1, 1.25, 1.5, 0.75];
                  const currentSpeed = audioRef.current.playbackRate;
                  const nextSpeed = speeds[(speeds.indexOf(currentSpeed) + 1) % speeds.length];
                  audioRef.current.playbackRate = nextSpeed;
                  toast.success(`গতি: ${nextSpeed}x`);
                }
              }}
            >
              <Volume2 className="h-4 w-4 mr-2" />
              গতি
            </Button>
          </div>
        </Card>

        {/* Surah List */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3">সূরা তালিকা</h4>
          <Input
            placeholder="সূরা খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3"
          />
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredSurahs.map((s) => (
              <button
                key={s.number}
                onClick={() => {
                  setCurrentSurah(s.number);
                  if (!isPlaying) {
                    togglePlay();
                  }
                }}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  currentSurah === s.number
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded text-xs font-bold">
                    {s.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-sm">{s.banglaName}</span>
                      <div className="flex items-center gap-2">
                        {cachedSurahs.includes(s.number) && (
                          <Check className="h-3 w-3 text-green-500" />
                        )}
                        <span className="text-sm font-arabic">{s.arabicName}</span>
                      </div>
                    </div>
                    <span className="text-xs opacity-75">{s.verses} আয়াত</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Audio;
