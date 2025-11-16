import React from 'react';
import { useVideoPlayer } from '@/contexts/VideoPlayerContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, Play, Pause } from 'lucide-react';

export const FloatingVideoPlayer: React.FC = () => {
  const { current, mode, isPlaying, togglePlay, minimize, expand, close } = useVideoPlayer();
  const location = useLocation();
  const navigate = useNavigate();

  if (!current) return null;

  const onTap = () => {
    // go back to Arabic page and expand
    navigate('/gojol/arabic');
    expand();
  };

  // only render the floating iframe when in mini mode
  if (mode !== 'mini') {
    console.debug('[FloatingVideoPlayer] not rendering (mode)', { mode, isPlaying, currentId: current?.id });
    return null;
  }
  // show mini player bottom-right — restyled to resemble YouTube floating player
  console.debug('[FloatingVideoPlayer] rendering', { mode, isPlaying, currentId: current?.id });
  return (
    <div className="fixed z-50" style={{ right: 14, bottom: 78 }}>
      <div className="bg-neutral-900/90 backdrop-blur-md rounded-xl shadow-lg p-2 flex items-center gap-3 w-72 h-20 animate-fade-up" style={{ minWidth: 280 }}>
        <div className="w-40 h-full rounded overflow-hidden shrink-0 cursor-pointer" onClick={onTap}>
          {/* Only request autoplay when player state is playing. Add youtube params to minimize related/autoplay behavior. */}
          <iframe
            src={current.embedUrl + (isPlaying ? '?autoplay=1&mute=0&playsinline=1&rel=0&enablejsapi=1' : '?playsinline=1&rel=0&enablejsapi=1')}
            title={current.title}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <div className="text-sm font-medium truncate text-white">{current.title}</div>
          <div className="text-xs text-neutral-300 truncate">Now Playing</div>
          <div className="w-full h-1 bg-neutral-800 rounded mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full" style={{ width: '30%' }} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button className="p-1 text-white" onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button className="p-1 text-white" onClick={(e) => { e.stopPropagation(); close(); }}>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingVideoPlayer;
