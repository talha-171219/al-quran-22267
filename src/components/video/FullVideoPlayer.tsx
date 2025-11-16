import React from 'react';
import { useVideoPlayer } from '@/contexts/VideoPlayerContext';
import { Button } from '@/components/ui/button';
import { X, Play, Pause } from 'lucide-react';

export const FullVideoPlayer: React.FC = () => {
  const { current, isPlaying, togglePlay, minimize, close } = useVideoPlayer();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  if (!current) return null;

  // Auto-minimize when the full player is scrolled out of view
  React.useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (isPlaying && !entry.isIntersecting) {
            minimize();
          }
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isPlaying, minimize]);

  return (
    <div ref={containerRef} className="w-full bg-transparent">
      <div className="w-full rounded-xl overflow-hidden" style={{ borderRadius: 16 }}>
        {isPlaying ? (
          <iframe
            src={current.embedUrl + '?autoplay=1'}
            title={current.title}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: 220 }}
          />
        ) : (
          <div className="w-full h-56 bg-muted/40 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
            <div className="bg-white/20 rounded-full p-3">
              <Play className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <div>
          <div className="font-semibold text-lg">{current.title}</div>
          <div className="text-xs text-foreground/70">Now Playing</div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={togglePlay}>
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={minimize}>Minimize</Button>
          <Button variant="ghost" size="sm" onClick={close}><X className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  );
};

export default FullVideoPlayer;
