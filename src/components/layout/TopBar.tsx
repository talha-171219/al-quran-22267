import { ArrowLeft, Search, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InstallPWAButton } from "@/components/pwa/InstallPWAButton";

interface TopBarProps {
  title: string;
  showBack?: boolean;
  backPath?: string; // Optional explicit back path
  showSearch?: boolean;
  onSearch?: () => void;
  action?: React.ReactNode;
}

export const TopBar = ({ title, showBack, backPath, showSearch, onSearch, action }: TopBarProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-gradient-primary text-primary-foreground shadow-md">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => backPath ? navigate(backPath) : navigate(-1)}
              className="text-primary-foreground hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-lg font-semibold truncate">{title}</h1>
        </div>
        
        <div className="flex items-center gap-1">
          <InstallPWAButton />
          {showSearch && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearch}
              className="text-primary-foreground hover:bg-white/10"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          {action ? action : (
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/10"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
