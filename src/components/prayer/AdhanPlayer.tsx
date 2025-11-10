import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { adhanStyles, type AdhanStyle } from "@/data/adhanAudio";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdhanPlayerProps {
  autoPlay?: boolean;
  onEnded?: () => void;
}

export const AdhanPlayer = ({ autoPlay = false, onEnded }: AdhanPlayerProps) => {
  const [selectedStyle, setSelectedStyle] = useState<AdhanStyle>(adhanStyles[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const savedStyle = localStorage.getItem("adhanStyle");
    if (savedStyle) {
      const style = adhanStyles.find(s => s.id === savedStyle);
      if (style) setSelectedStyle(style);
    }
  }, []);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [autoPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnded) onEnded();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [onEnded]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleStyleChange = (styleId: string) => {
    const style = adhanStyles.find(s => s.id === styleId);
    if (style) {
      setSelectedStyle(style);
      localStorage.setItem("adhanStyle", styleId);
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.load();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">আযান প্লেয়ার</h3>
            <p className="text-sm text-muted-foreground">{selectedStyle.muezzin}</p>
          </div>
          <Select value={selectedStyle.id} onValueChange={handleStyleChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {adhanStyles.map((style) => (
                <SelectItem key={style.id} value={style.id}>
                  {style.nameBn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={togglePlay}
            size="lg"
            className="flex-1 gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="h-5 w-5" />
                <span>থামান</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <span>চালান</span>
              </>
            )}
          </Button>
          
          <div className="flex items-center gap-2 flex-1">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMute}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="flex-1"
            />
          </div>
        </div>

        <audio
          ref={audioRef}
          src={selectedStyle.audioUrl}
          preload="metadata"
        />
      </CardContent>
    </Card>
  );
};
