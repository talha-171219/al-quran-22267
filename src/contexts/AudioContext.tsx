import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import { surahList } from "@/data/surahs";
import { toast } from "sonner";
import { audioCache } from "@/utils/audioCache";

interface AudioContextType {
  currentSurah: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  cachedSurahs: number[];
  showPlayer: boolean;
  setCurrentSurah: (surah: number) => void;
  togglePlay: () => Promise<void>;
  skipNext: () => void;
  skipPrev: () => void;
  handleSeek: (time: number) => void;
  handleDownload: () => Promise<void>;
  formatTime: (time: number) => string;
  getSurahInfo: () => typeof surahList[0];
  audioRef: React.RefObject<HTMLAudioElement>;
  hidePlayer: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [currentSurah, setCurrentSurah] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cachedSurahs, setCachedSurahs] = useState<number[]>([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentAudioUrl = useRef<string>("");

  const getAudioUrls = (surahNum: number): string[] => {
    const padded = String(surahNum).padStart(3, '0');
    return [
      `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${padded}.mp3`,
      `https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${surahNum}.mp3`,
    ];
  };

  const getSurahInfo = () => {
    return surahList.find(s => s.number === currentSurah) || surahList[0];
  };

  const handleSetCurrentSurah = (surah: number) => {
    setCurrentSurah(surah);
    setShowPlayer(true);
  };

  // Initialize cache
  useEffect(() => {
    audioCache.init().then(() => {
      audioCache.getAllCached().then(cached => {
        setCachedSurahs(cached);
      });
    });
  }, []);

  // Load audio when surah changes
  useEffect(() => {
    const loadAudio = async () => {
      if (!audioRef.current) return;
      
      setIsLoading(true);
      toast.info("অডিও লোড হচ্ছে...", { duration: 1500 });
      
      try {
        const cached = await audioCache.getCachedAudio(currentSurah);
        
        if (cached) {
          const url = URL.createObjectURL(cached);
          if (currentAudioUrl.current) {
            URL.revokeObjectURL(currentAudioUrl.current);
          }
          currentAudioUrl.current = url;
          audioRef.current.src = url;
          
          // Auto play after loading if was playing before
          if (isPlaying) {
            await audioRef.current.play();
          }
        } else {
          const urls = getAudioUrls(currentSurah);
          let loaded = false;
          
          for (const url of urls) {
            try {
              audioRef.current.src = url;
              await new Promise((resolve, reject) => {
                const onCanPlay = () => {
                  audioRef.current?.removeEventListener('canplay', onCanPlay);
                  audioRef.current?.removeEventListener('error', onError);
                  resolve(true);
                };
                const onError = () => {
                  audioRef.current?.removeEventListener('canplay', onCanPlay);
                  audioRef.current?.removeEventListener('error', onError);
                  reject();
                };
                audioRef.current?.addEventListener('canplay', onCanPlay);
                audioRef.current?.addEventListener('error', onError);
              });
              loaded = true;
              
              // Auto play after loading if was playing before
              if (isPlaying) {
                await audioRef.current.play();
              }
              break;
            } catch (e) {
              continue;
            }
          }
          
          if (!loaded) {
            throw new Error("No audio source available");
          }
        }

        toast.success("অডিও লোড সম্পন্ন", { duration: 1000 });
      } catch (e) {
        setIsPlaying(false);
        toast.error("এই সূরার অডিও পাওয়া যায়নি");
      } finally {
        setIsLoading(false);
      }
    };

    loadAudio();

    return () => {
      if (currentAudioUrl.current) {
        URL.revokeObjectURL(currentAudioUrl.current);
      }
    };
  }, [currentSurah]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        setShowPlayer(true);
      }
    } catch (e) {
      toast.error("অডিও প্লে করতে সমস্যা হয়েছে");
    }
  };

  const skipNext = () => {
    if (currentSurah < 114) {
      const wasPlaying = isPlaying;
      setCurrentSurah(prev => prev + 1);
      // Keep playing state for auto-play
      if (wasPlaying) {
        setIsPlaying(true);
      }
    }
  };

  const skipPrev = () => {
    if (currentSurah > 1) {
      const wasPlaying = isPlaying;
      setCurrentSurah(prev => prev - 1);
      // Keep playing state for auto-play
      if (wasPlaying) {
        setIsPlaying(true);
      }
    }
  };

  const handleEnded = () => {
    // Auto-play next surah when current ends
    if (currentSurah < 114) {
      setIsPlaying(true); // Keep playing state for auto-play
      skipNext();
      toast.success("পরবর্তী সূরা চালু হচ্ছে...", { duration: 1500 });
    } else {
      setIsPlaying(false);
      toast.info("সব সূরা সমাপ্ত", { duration: 2000 });
    }
  };

  const hidePlayer = () => {
    setShowPlayer(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      
      const isCached = await audioCache.isCached(currentSurah);
      if (isCached) {
        toast.info("এই সূরা ইতিমধ্যে ডাউনলোড করা আছে");
        setIsLoading(false);
        return;
      }

      const urls = getAudioUrls(currentSurah);
      let downloaded = false;
      
      for (const url of urls) {
        try {
          const response = await fetch(url);
          
          if (!response.ok) continue;

          const blob = await response.blob();
          await audioCache.cacheAudio(currentSurah, blob);
          
          const cached = await audioCache.getAllCached();
          setCachedSurahs(cached);
          
          toast.success("সূরা সফলভাবে ডাউনলোড হয়েছে");
          downloaded = true;
          break;
        } catch (error) {
          continue;
        }
      }
      
      if (!downloaded) {
        toast.error("এই সূরার অডিও পাওয়া যায়নি");
      }
    } catch (error) {
      toast.error("ডাউনলোড করতে সমস্যা হয়েছে");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AudioContext.Provider
      value={{
        currentSurah,
        isPlaying,
        currentTime,
        duration,
        isLoading,
        cachedSurahs,
        showPlayer,
        setCurrentSurah: handleSetCurrentSurah,
        togglePlay,
        skipNext,
        skipPrev,
        handleSeek,
        handleDownload,
        formatTime,
        getSurahInfo,
        audioRef,
        hidePlayer,
      }}
    >
      <audio
        ref={audioRef}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      {children}
    </AudioContext.Provider>
  );
};
