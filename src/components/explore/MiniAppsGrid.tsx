import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MiniApp {
  id: string;
  thumbnail: string;
  url: string;
  title: string;
}

interface MiniAppsGridProps {
  apps: MiniApp[];
}

export const MiniAppsGrid = ({ apps }: MiniAppsGridProps) => {
  const navigate = useNavigate();

  const handleAppClick = (app: MiniApp) => {
    navigate(`/explore/mini-app/${app.id}`, { state: { app } });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {apps.map((app, index) => (
          <div
            key={app.id}
            className="relative rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm shadow-lg border border-border/30 group hover:shadow-xl transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={app.thumbnail}
                alt={app.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Title and Button */}
              <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                <h3 className="text-white text-sm font-semibold text-center line-clamp-1">
                  {app.title}
                </h3>
                <Button
                  onClick={() => handleAppClick(app)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-1.5 h-auto"
                  size="sm"
                >
                  Open Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
