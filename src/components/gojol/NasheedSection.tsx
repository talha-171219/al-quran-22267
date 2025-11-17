import React from 'react';
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface NasheedSectionProps {
  title: string;
  subtitle?: string;
  // allow single image/video or array of images/videos for a small slider
  // items may be image URLs (jpg/png/...) or video URLs (mp4/webm)
  imageSrc: string | string[];
  imageAlt: string;
  linkPath: string;
  linkLabel?: string;
}

export const NasheedSection = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  linkPath,
  linkLabel,
  // optional slider props
  intervalMs = 4000,
  pauseOnHover = true,
  showControls = true,
  transition = 'fade',
}: NasheedSectionProps & { intervalMs?: number; pauseOnHover?: boolean; showControls?: boolean; transition?: 'fade' | 'none' }) => {
  const imgs = Array.isArray(imageSrc) ? imageSrc : [imageSrc];
  const [index, setIndex] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const intervalRef = React.useRef<number | null>(null);
  const videoRefs = React.useRef<Array<HTMLVideoElement | null>>([]);

  React.useEffect(() => {
    if (imgs.length <= 1) return;
    if (pauseOnHover && hovered) return;
    intervalRef.current = window.setInterval(() => setIndex(i => (i + 1) % imgs.length), intervalMs);
    return () => {
      if (intervalRef.current) { window.clearInterval(intervalRef.current); intervalRef.current = null; }
    };
  }, [imgs.length, intervalMs, pauseOnHover, hovered]);

  // control video playback on hover / slide change
  React.useEffect(() => {
    // when slide changes, ensure current video's playback state matches hovered/pauseOnHover
    const current = videoRefs.current[index];
    if (current) {
      if (hovered && pauseOnHover) {
        try { current.pause(); } catch (e) {}
      } else {
        try { current.play().catch(() => {}); } catch (e) {}
      }
    }
    // pause other videos
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i !== index) {
        try { v.pause(); v.currentTime = 0; } catch (e) {}
      }
    });
  }, [index, hovered, pauseOnHover]);

  const prev = (e?: React.MouseEvent) => { e?.preventDefault(); setIndex(i => (i - 1 + imgs.length) % imgs.length); };
  const next = (e?: React.MouseEvent) => { e?.preventDefault(); setIndex(i => (i + 1) % imgs.length); };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          )}
        </div>
        <Link
          to={linkPath}
          className="text-primary hover:text-primary-light flex items-center group animate-pulse-subtle transition-all duration-300"
        >
          {linkLabel || 'See Nasheeds'} <span className="ml-1 transition-transform group-hover:translate-x-1">›</span>
        </Link>
      </div>

      <Link to={linkPath} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <Card className="relative w-full h-48 overflow-hidden rounded-xl shadow-lg group hover:shadow-primary-glow transition-all duration-300">
          {/* render images stacked for fade transition */}
          {imgs.map((src, i) => {
            const isVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(src) || /^data:video\//.test(src);
            if (isVideo) {
              return (
                <video
                  key={i}
                  ref={el => videoRefs.current[i] = el}
                  src={src}
                  className={"w-full h-full object-cover absolute inset-0 " + (transition === 'fade' ? 'transition-opacity duration-500 ease-in-out' : '')}
                  style={{ opacity: i === index ? 1 : 0 }}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              );
            }

            return (
              <img
                key={i}
                src={src}
                alt={`${imageAlt} ${i + 1}`}
                className={"w-full h-full object-cover absolute inset-0 " + (transition === 'fade' ? 'transition-opacity duration-500 ease-in-out' : '')}
                style={{ opacity: i === index ? 1 : 0 }}
                loading="lazy"
                decoding="async"
              />
            );
          })}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-end p-4">
            <h3 className="text-white text-lg font-semibold z-10"></h3>
          </div>

          {/* prev/next controls shown on hover */}
          {showControls && imgs.length > 1 ? (
            <>
              <button onClick={prev} className={"absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"} aria-label="Previous slide">‹</button>
              <button onClick={next} className={"absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"} aria-label="Next slide">›</button>
            </>
          ) : null}

          {/* indicators */}
          {imgs.length > 1 ? (
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-3 z-20 flex gap-2">
              {imgs.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); setIndex(i); }}
                  className={"w-2 h-2 rounded-full " + (i === index ? 'bg-white' : 'bg-white/40')}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          ) : null}
        </Card>
      </Link>
    </section>
  );
};
