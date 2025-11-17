import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SquareIconCardProps {
  icon: string;
  title: string;
  path: string;
  size?: "default" | "small" | "large";
}

export const SquareIconCard = ({ icon, title, path, size = "default" }: SquareIconCardProps) => {
  const sizeClasses =
    size === "small" ? "w-20 h-20" : size === "large" ? "w-32 h-32" : "w-28 h-28";
  const titleSize = size === "small" ? "text-xs" : "text-sm";

  return (
    <Link to={path}>
      <div className="flex flex-col items-center gap-3 group cursor-pointer">
        <div
          className={cn(
            "relative overflow-hidden",
            "rounded-2xl",
            sizeClasses,
            "border border-emerald-500/12",
            "shadow-lg",
            "transition-transform duration-300",
            "group-hover:scale-105",
            "group-hover:shadow-2xl",
            "backdrop-blur-sm",
            "bg-gradient-to-br from-emerald-950/70 via-emerald-900/50 to-emerald-950/80"
          )}
        >
          {/* Soft gradient overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-80" />

          {/* Inner subtle glow */}
          <div className="absolute inset-0 bg-gradient-radial from-emerald-500/6 via-transparent to-transparent" />

          {/* Icon Image - fills square and keeps a slight rounding */}
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <img
              src={icon}
              alt={title}
              className="w-full h-full object-cover rounded-lg drop-shadow-[0_6px_18px_rgba(16,185,129,0.12)] mix-blend-lighten"
            />
          </div>

          {/* Outer Glow on Hover */}
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-400/12 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
        </div>

        <h3 className={cn("text-foreground font-semibold text-center leading-tight drop-shadow-lg", titleSize)}>
          {title}
        </h3>
      </div>
    </Link>
  );
};
