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
            "relative w-24 h-24 rounded-full",
            "bg-gradient-to-br from-emerald-900/40 to-emerald-950/60",
            "border-2 border-emerald-500/50",
            "shadow-[0_0_20px_rgba(16,185,129,0.3)]",
            "transition-all duration-300",
            "group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(16,185,129,0.6)]",
            "group-hover:border-emerald-400",
            "backdrop-blur-sm"
          )}
        >
          {/* Inner Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-emerald-500/10 to-transparent" />
          
          {/* 3D Icon Image */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img
              src={icon}
              alt={title}
              className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]"
            />
          </div>

          {/* Outer Glow Ring on Hover */}
          <div className="absolute -inset-1 rounded-full bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10" />
        </div>

        {/* Title Text */}
        <h3 className="text-white font-semibold text-sm text-center leading-tight">
          {title}
        </h3>
      </div>
    </Link>
  );
};
