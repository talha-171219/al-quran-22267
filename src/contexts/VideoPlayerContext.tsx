import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Video = {
  id: string;
  title?: string;
  thumbnail?: string;
  embedUrl: string;
};

type Mode = 'hidden' | 'full' | 'mini' | 'inline';

type VideoPlayerContextValue = {
  current?: Video;
  mode: Mode;
  isPlaying: boolean;
  playVideo: (v: Video, initialMode?: Mode) => void;
  togglePlay: () => void;
  minimize: () => void;
  expand: () => void;
  close: () => void;
};

const VideoPlayerContext = createContext<VideoPlayerContextValue | undefined>(undefined);

export const VideoPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [current, setCurrent] = useState<Video | undefined>(undefined);
  const [mode, setMode] = useState<Mode>('hidden');
  const [isPlaying, setIsPlaying] = useState(false);
  const location = useLocation();

  const playVideo = (v: Video, initialMode: Mode = 'full') => {
    console.debug('[VideoPlayer] playVideo', { id: v.id, initialMode });
    setCurrent(v);
    setIsPlaying(true);
    setMode(initialMode);
  };

  const togglePlay = () => setIsPlaying(p => !p);
  const minimize = () => setMode('mini');
  const expand = () => setMode('full');
  const close = () => { setCurrent(undefined); setIsPlaying(false); setMode('hidden'); };

  // Auto-minimize inline player when navigating to another route
  useEffect(() => {
    console.debug('[VideoPlayer] location changed', { pathname: location.pathname, mode, isPlaying, currentId: current?.id });
    if (!current) return;
    if (mode === 'inline' && isPlaying) {
      console.debug('[VideoPlayer] auto-minimize inline -> mini because route changed');
      setMode('mini');
    }
  }, [location.pathname, current, mode, isPlaying]);

  return (
    <VideoPlayerContext.Provider value={{ current, mode, isPlaying, playVideo, togglePlay, minimize, expand, close }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export const useVideoPlayer = () => {
  const ctx = useContext(VideoPlayerContext);
  if (!ctx) throw new Error('useVideoPlayer must be used within VideoPlayerProvider');
  return ctx;
};

export default VideoPlayerContext;
