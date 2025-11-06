import { Home, BookOpen, Bookmark, Settings, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Surahs", path: "/surahs" },
  { icon: Sparkles, label: "AI", path: "/ai" },
  { icon: Bookmark, label: "Bookmarks", path: "/bookmarks" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-200",
                "min-w-[4rem] hover:bg-muted/50",
                isActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn("h-5 w-5", isActive && "scale-110")} />
                <span className="text-xs">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
