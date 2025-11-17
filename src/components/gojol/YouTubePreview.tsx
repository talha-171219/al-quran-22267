import React from 'react';
import { cn } from '@/lib/utils';

interface YouTubePreviewProps {
  videoUrl: string; // full youtube url or id
  className?: string;
  visibilityThreshold?: number; // 0-1 how much visible needed to autoplay
  fallbackVideoUrl?: string;
}

const loadYouTubeAPI = (): Promise<void> => {
  return new Promise((resolve) => {
    if ((window as any).YT && (window as any).YT.Player) return resolve();
    const existing = document.getElementById('youtube-iframe-api');
    if (existing) {
      // wait for global to be ready
      const t = setInterval(() => {
        if ((window as any).YT && (window as any).YT.Player) { clearInterval(t); resolve(); }
      }, 50);
      return;
    }
    const s = document.createElement('script');
    s.id = 'youtube-iframe-api';
    s.src = 'https://www.youtube.com/iframe_api';
    s.onload = () => {
      // API will call onYouTubeIframeAPIReady globally; wait for global
      const t = setInterval(() => {
        if ((window as any).YT && (window as any).YT.Player) { clearInterval(t); resolve(); }
      }, 50);
    };
    document.body.appendChild(s);
  });
};

const extractVideoId = (url: string) => {
  // handle youtu.be short and full watch urls
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1);
    if (u.hostname.includes('youtube.com')) {
      return u.searchParams.get('v') || u.pathname.split('/').pop();
    }
  } catch (e) {
    // maybe just an id passed
    return url;
  }
  return url;
};

export const YouTubePreview: React.FC<YouTubePreviewProps> = ({ videoUrl, className = '', visibilityThreshold = 0.5, fallbackVideoUrl }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const playerRef = React.useRef<any>(null);
  const playerIdRef = React.useRef<string>('yt-preview-' + Math.random().toString(36).slice(2, 9));
  const readyRef = React.useRef(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isMutedState, setIsMutedState] = React.useState(true);

  const initialVideoId = extractVideoId(videoUrl || '');
  const fallbackVideoId = fallbackVideoUrl ? extractVideoId(fallbackVideoUrl) : null;
  const currentVideoIdRef = React.useRef<string | null>(initialVideoId);

  React.useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let mounted = true;

    const createPlayer = async (vid?: string) => {
      await loadYouTubeAPI();
      if (!mounted) return;
      const YT = (window as any).YT;
      if (!YT) return;

      const useVid = vid || currentVideoIdRef.current || initialVideoId;
      currentVideoIdRef.current = useVid;

      playerRef.current = new YT.Player(playerIdRef.current, {
        videoId: useVid,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          mute: 0,
          loop: 1,
          playlist: useVid,
        },
        events: {
          onReady: (e: any) => {
            try {
              // ensure iframe allows autoplay
              const iframe = e.target.getIframe && e.target.getIframe();
              if (iframe) {
                iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
                iframe.style.pointerEvents = 'auto';
              }
            } catch (err) {}

            // mark ready
            readyRef.current = true;

            // Try to play with sound first; if blocked, mute and play
            try {
              e.target.unMute();
              e.target.playVideo();
              setIsMutedState(false);
            } catch (err) {
              try { e.target.mute(); e.target.playVideo(); setIsMutedState(true); } catch (e) {}
            }
          },
          onError: (err: any) => {
            // try fallback once
            if (fallbackVideoId && currentVideoIdRef.current !== fallbackVideoId) {
              try { playerRef.current.destroy(); } catch (e) {}
              currentVideoIdRef.current = fallbackVideoId;
              // recreate with fallback
              setTimeout(() => { if (mounted) createPlayer(fallbackVideoId); }, 200);
            }
          },
        },
      });
    };

    createPlayer();

    const onIntersect: IntersectionObserverCallback = (entries) => {
      const e = entries[0];
      const nowVisible = e.intersectionRatio >= visibilityThreshold;
      setIsVisible(nowVisible);
      if (!playerRef.current || !readyRef.current) return;
      if (nowVisible) {
        // Prefer to play with sound. If browser blocks, fall back to muted play.
        try {
          playerRef.current.unMute();
          playerRef.current.playVideo();
          setIsMutedState(false);
        } catch (err) {
          try { playerRef.current.mute(); playerRef.current.playVideo(); setIsMutedState(true); } catch (e) {}
        }
      } else {
        try { playerRef.current.pauseVideo(); playerRef.current.mute(); setIsMutedState(true); } catch (err) {}
      }
    };

    if (containerRef.current) {
      observer = new IntersectionObserver(onIntersect, { threshold: [visibilityThreshold] });
      observer.observe(containerRef.current);
    }

    return () => {
      mounted = false;
      if (observer && containerRef.current) observer.unobserve(containerRef.current);
      if (playerRef.current && playerRef.current.destroy) {
        try { playerRef.current.destroy(); } catch (e) {}
      }
    };
  }, [videoUrl, fallbackVideoUrl, visibilityThreshold]);

  return (
    <div ref={containerRef} className={cn(className, 'relative overflow-hidden')}>
      <div id={playerIdRef.current} className="w-full h-full" />

      {/* transparent overlay to hide YouTube UI (play button, logo, etc.) visually */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20, background: 'transparent' }} />

      {/* cover bottom-right YouTube logo area so branding isn't visible */}
      <div style={{ position: 'absolute', right: 8, bottom: 8, width: 90, height: 36, zIndex: 9999, pointerEvents: 'none', borderRadius: 8, background: 'rgba(6,24,18,0.9)' }} />

      {/* small unmute/play control shown when the card is visible; pointerEvents auto so it receives clicks */}
      {isVisible ? (
        <button
          aria-label={isMutedState ? 'Unmute video' : 'Mute video'}
          onClick={(e) => {
            e.stopPropagation();
            if (!playerRef.current) return;
            try {
              if (isMutedState) {
                playerRef.current.unMute();
                try { playerRef.current.playVideo(); } catch (err) {}
                setIsMutedState(false);
              } else {
                playerRef.current.mute();
                setIsMutedState(true);
              }
            } catch (err) {}
          }}
          className="absolute right-3 bottom-3 z-30 bg-black/50 text-white rounded-full p-2 backdrop-blur-sm hover:bg-black/60 transition-opacity"
          style={{ pointerEvents: 'auto' }}
        >
          {/* speaker icon */}
          {isMutedState ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.5L6 7H3.5A1.5 1.5 0 002 8.5v3A1.5 1.5 0 003.5 13H6l3 2.5V4.5z"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.5L6 7H3.5A1.5 1.5 0 002 8.5v3A1.5 1.5 0 003.5 13H6l3 2.5V4.5z"/><path d="M13.5 7.5a4 4 0 010 5"/></svg>
          )}
        </button>
      ) : null}
    </div>
  );
};

export default YouTubePreview;
