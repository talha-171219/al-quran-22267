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
  setCurrentSurah: (surah: number) => void;
  togglePlay: () => Promise<void>;
  skipNext: () => void;
  skipPrev: () => void;
  handleSeek: (time: number) => void;
  handleDownload: () => Promise<void>;
  formatTime: (time: number) => string;
  getSurahInfo: () => typeof surahList[0];
  audioRef: React.RefObject<HTMLAudioElement>;
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
  const [autoPlay, setAutoPlay] = useState(false);
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
      
      try {
        const cached = await audioCache.getCachedAudio(currentSurah);
        
        if (cached) {
          const url = URL.createObjectURL(cached);
          if (currentAudioUrl.current) {
            URL.revokeObjectURL(currentAudioUrl.current);
          }
          currentAudioUrl.current = url;
          audioRef.current.src = url;
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
              break;
            } catch (e) {
              continue;
            }
          }
          
          if (!loaded) {
            throw new Error("No audio source available");
          }
        }

        if (autoPlay) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (e) {
        setIsPlaying(false);
        setAutoPlay(false);
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
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (e) {
      toast.error("অডিও প্লে করতে সমস্যা হয়েছে");
    }
  };

  const skipNext = () => {
    if (currentSurah < 114) {
      setCurrentSurah(prev => prev + 1);
      setAutoPlay(isPlaying);
    }
  };

  const skipPrev = () => {
    if (currentSurah > 1) {
      setCurrentSurah(prev => prev - 1);
      setAutoPlay(isPlaying);
    }
  };

  const handleEnded = () => {
    if (currentSurah < 114) {
      skipNext();
    } else {
      setIsPlaying(false);
      setAutoPlay(false);
    }
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
        setCurrentSurah,
        togglePlay,
        skipNext,
        skipPrev,
        handleSeek,
        handleDownload,
        formatTime,
        getSurahInfo,
        audioRef,
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
