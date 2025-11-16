import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, X } from "lucide-react";

interface Props {
  src: string | null;
  title?: string;
  visible: boolean;
  onClose: () => void;
  autoplay?: boolean;
}

const formatTime = (s: number) => {
  if (isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

const GojolAudioPlayer: React.FC<Props> = ({ src, title, visible, onClose, autoplay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio();
    const a = audioRef.current;
    const onLoaded = () => setDuration(a.duration || 0);
    const onTime = () => setCurrent(a.currentTime || 0);
    const onEnd = () => setIsPlaying(false);
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);

    return () => {
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (!src) {
      a.pause();
      setIsPlaying(false);
      setCurrent(0);
      setDuration(0);
      return;
    }
    // load new src
    a.src = src;
    a.preload = "metadata";
    if (autoplay) {
      a.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [src, autoplay]);

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      try {
        await a.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Play error", err);
      }
    }
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = val;
    setCurrent(val);
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    onClose();
  };

  if (!visible || !src) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-[9999] px-2">
      <Card className="pointer-events-auto max-w-lg mx-auto bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 text-white shadow-xl border-0 animate-slide-up overflow-hidden">
        <div className="flex items-center justify-between p-3">
          <div className="min-w-0 pr-4">
            <p className="font-semibold text-sm truncate">{title}</p>
            <p className="text-xs opacity-75">{formatTime(current)} / {formatTime(duration)}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon" className="h-10 w-10 bg-white/20 text-white" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <Button size="icon" variant="ghost" className="h-8 w-8 text-white" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="px-3 pb-3">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={current}
            onChange={onSeek}
            className="w-full"
          />
        </div>
      </Card>
    </div>
  );
};

export default GojolAudioPlayer;
