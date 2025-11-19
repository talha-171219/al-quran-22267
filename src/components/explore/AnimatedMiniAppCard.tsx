import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import clickHandData from "@/assets/lottie/click_hand_tap.json";

interface MiniApp {
  id: string;
  thumbnail: string;
  url: string;
  title: string;
}

interface AnimatedMiniAppCardProps {
  apps: MiniApp[];
}

export const AnimatedMiniAppCard = ({ apps }: AnimatedMiniAppCardProps) => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lottieContainersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isDragging) {
      const animation = setInterval(() => {
        setOffset((prev) => (prev - 0.45) % (apps.length * 408));
      }, 35); // Slightly slower animation speed

      return () => clearInterval(animation);
    }
  }, [apps.length, isDragging]);

  // Initialize Lottie animations for tap hand icons
  useEffect(() => {
    const animations: any[] = [];
    
    lottieContainersRef.current.forEach((container) => {
      if (container) {
        container.innerHTML = ''; // Clear previous animations
        const anim = lottie.loadAnimation({
          container: container,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: clickHandData,
        });
        animations.push(anim);
      }
    });

    return () => {
      animations.forEach(anim => anim.destroy());
    };
  }, [apps]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(offset);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(offset);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setOffset(dragOffset + deltaX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    setOffset(dragOffset + deltaX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleAppClick = (app: MiniApp) => {
    navigate(`/explore/mini-app/${app.id}`, { state: { app } });
  };

  return (
    <div className="w-full">
      <div 
        className="w-full overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm shadow-lg border border-border/30 p-6 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
      >
        <div className="relative w-full h-64 overflow-hidden">
          <div
            className="flex gap-6"
            style={{
              transform: `translateX(${offset}px)`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-linear',
            }}
          >
            {[...apps, ...apps, ...apps].map((app, index) => (
              <button
                key={`${app.id}-${index}`}
                onClick={() => handleAppClick(app)}
                className="flex-shrink-0 w-96 h-64 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary shadow-md relative"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <img
                  src={app.thumbnail}
                  alt={app.title}
                  className="w-full h-full object-cover pointer-events-none"
                />
                {/* Lottie Tap Hand Icon */}
                <div 
                  ref={(el) => lottieContainersRef.current[index] = el}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none"
                  style={{ zIndex: 10 }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-3 animate-pulse">
        tap to open
      </p>
    </div>
  );
};
