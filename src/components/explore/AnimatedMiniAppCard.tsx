import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const animation = setInterval(() => {
      setOffset((prev) => (prev - 0.5) % (apps.length * 320));
    }, 30);

    return () => clearInterval(animation);
  }, [apps.length]);

  const handleAppClick = (app: MiniApp) => {
    navigate(`/explore/mini-app/${app.id}`, { state: { app } });
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm shadow-lg border border-border/30 p-4">
      <div className="relative w-full h-48 overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-100 ease-linear"
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          {[...apps, ...apps, ...apps].map((app, index) => (
            <button
              key={`${app.id}-${index}`}
              onClick={() => handleAppClick(app)}
              className="flex-shrink-0 w-80 h-48 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary shadow-md"
            >
              <img
                src={app.thumbnail}
                alt={app.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
