import React from 'react';
import { useVideoPlayer } from '@/contexts/VideoPlayerContext';
import { Play } from 'lucide-react';
import { useLocation } from 'react-router-dom';

type Props = {
  title: string;
  embedUrl: string; // full embed URL (https://www.youtube.com/embed/VIDEO_ID)
  thumbnailUrl?: string;
  artist?: string;
};

export const YouTubeGojolCard: React.FC<Props> = ({ title, embedUrl, thumbnailUrl, artist }) => {
  const { playVideo } = useVideoPlayer();
  const idMatch = embedUrl.match(/embed\/([\w-]{11})/);
  const id = idMatch ? idMatch[1] : '';

  const onPlay = () => {
    // request inline playback (play where tapped)
    playVideo({ id, title, thumbnail: thumbnailUrl, embedUrl }, 'inline');
  };

  return (
    <div className="bg-card p-4 rounded-[18px] shadow-lg border border-muted">
      {/* If this video is the active full video, render inline player here */}
      <InlinePlayer id={id} embedUrl={embedUrl} title={title} thumbnail={thumbnailUrl} onPlay={onPlay} />

      <div className="flex items-center justify-between gap-3 mt-3">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">{title}</div>
          <div className="text-xs text-muted-foreground">Tap to Play</div>
        </div>
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} className="h-12 w-20 rounded-md object-cover" />
        ) : null}
      </div>
    </div>
  );
};

export default YouTubeGojolCard;

const InlinePlayer: React.FC<{ id: string; embedUrl: string; title: string; thumbnail?: string; onPlay: () => void }> = ({ id, embedUrl, title, thumbnail, onPlay }) => {
  const { current, mode, isPlaying, minimize } = useVideoPlayer();
  const location = useLocation();
  const isActiveInline = current?.id === id && mode === 'inline' && location.pathname.startsWith('/gojol');

  // only show the iframe when actively playing
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // when the inline player is less than 50% visible, minimize
          if (isActiveInline && isPlaying && !entry.isIntersecting) {
            minimize();
          }
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isActiveInline, isPlaying, minimize]);

  if (isActiveInline && isPlaying) {
    return (
      <div ref={containerRef} className="w-full rounded-lg overflow-hidden" style={{ borderRadius: 12 }}>
        <iframe
          title={title}
          src={`${embedUrl}?autoplay=1`}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: 220 }}
        />
      </div>
    );
  }

  // not active: show thumbnail with play overlay clickable
  return (
    <div className="relative rounded-lg overflow-hidden mb-0 cursor-pointer" style={{ paddingTop: '56.25%' }} onClick={onPlay}>
      {thumbnail ? (
        <img src={thumbnail} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/20 rounded-full p-3">
          <Play className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};
