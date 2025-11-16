import React, { useState, useRef, useEffect } from 'react';
import { useVideoPlayer } from '@/contexts/VideoPlayerContext';
import cn from 'clsx';
import { Play } from 'lucide-react';

type NasheedItem = {
  id: string;
  title: string;
  subtitle?: string;
  thumbnail: string;
  youtubeId?: string;
};

export default function NasheedCardPremium({ item, onPlay }: { item: NasheedItem; onPlay: (id: string) => void }) {
  const [hover, setHover] = useState(false);
  const { current, mode, isPlaying, minimize } = useVideoPlayer();
  // thumbnails are static now (no parallax)
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Observe card visibility: if this card is playing inline and scrolled out -> minimize to floating
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    // Track if this card has ever been visible while playing inline; only minimize when it transitions
    const hadBeenVisible = { value: false };
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // mark visibility
          if (entry.isIntersecting) {
            hadBeenVisible.value = true;
            return;
          }
          // only minimize if it was visible before and now went out of view
          if (current && mode === 'inline' && isPlaying && current.id === item.youtubeId && hadBeenVisible.value && !entry.isIntersecting) {
            minimize();
          }
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [current, mode, isPlaying, item.youtubeId, minimize]);

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => item.youtubeId && onPlay(item.youtubeId)}
      className={cn(
        'transform-gpu transition-all duration-300 ease-out hover:scale-103',
        'rounded-2xl overflow-hidden shadow-lg'
      )}
      style={{ borderRadius: 24 }}
      ref={containerRef}
    >
      <div className="relative h-64 w-full bg-[#0f1f1a] border border-[#0b2a21]">
        {/* If this video is current and inline mode, show inline iframe */}
        {current && mode === 'inline' && current.id === item.youtubeId ? (
          <iframe
            src={current.embedUrl + '?autoplay=1'}
            title={current.title}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%' }}
          />
        ) : null}
        {/* thumbnail background */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${item.thumbnail})` }}
        />

        {/* gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.5))' }} />

        {/* play button (hidden when inline playing) */}
        {!(current && mode === 'inline' && current.id === item.youtubeId) ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn('rounded-full p-4 bg-gradient-to-br from-emerald-600 to-teal-700', hover ? 'scale-105 shadow-2xl' : 'shadow-md')}>
              <Play className="text-white" />
            </div>
          </div>
        ) : null}

        {/* small youtube tag */}
        <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded">YouTube</div>
      </div>

      <div className="p-4 bg-transparent">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="text-white font-semibold text-lg leading-tight">{item.title}</div>
            <div className="text-sm text-slate-300">{item.subtitle || 'Tap to play'}</div>
          </div>

          <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-800 border border-[#0b2a21]">
            <img src={item.thumbnail} alt="mini" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
