import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CircularIconCardProps {
  icon: string;
  title: string;
  path: string;
}

export const CircularIconCard = ({ icon, title, path }: CircularIconCardProps) => {
  return (
    <Link to={path}>
      <div className="flex flex-col items-center gap-3 group cursor-pointer">
        {/* Circular Icon Container with Glowing Border */}
        <div
          className={cn(
            "relative w-28 h-28 rounded-full overflow-hidden",
            "border-2 border-emerald-500/20",
            "shadow-[0_0_15px_rgba(16,185,129,0.15),inset_0_0_10px_rgba(16,185,129,0.05)]",
            "transition-all duration-300",
            "group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25),inset_0_0_15px_rgba(16,185,129,0.08)]",
            "group-hover:border-emerald-400/30",
            "backdrop-blur-sm"
          )}
        >
          {/* Dark gradient background to replace icon backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/80 via-emerald-900/60 to-emerald-950/90" />
          
          {/* Inner Radial Glow */}
          <div className="absolute inset-0 bg-gradient-radial from-emerald-500/8 via-transparent to-transparent" />
          
          {/* 3D Icon Image - Larger to fill circle */}
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <img
              src={icon}
              alt={title}
              className="w-full h-full object-cover rounded-full drop-shadow-[0_0_8px_rgba(16,185,129,0.2)] mix-blend-lighten"
            />
          </div>

          {/* Outer Glow Ring on Hover */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500/12 via-emerald-400/15 to-emerald-500/12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
        </div>

        {/* Title Text */}
        <h3 className="text-white font-semibold text-sm text-center leading-tight drop-shadow-lg">
          {title}
        </h3>
      </div>
    </Link>
  );
};
