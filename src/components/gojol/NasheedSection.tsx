import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface NasheedSectionProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  linkPath: string;
  linkPath: string;
  linkLabel?: string;

export const NasheedSection = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  linkPath,
  linkPath,
  linkLabel,
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
        <Link
          to={linkPath}
          className="text-primary hover:text-primary-light flex items-center group animate-pulse-subtle transition-all duration-300"
        >
          {linkLabel || 'See Nasheeds'} <span className="ml-1 transition-transform group-hover:translate-x-1">›</span>
        </Link>

      <Link to={linkPath}>
        <Card className="relative w-full h-48 overflow-hidden rounded-xl shadow-lg group hover:shadow-primary-glow transition-all duration-300">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-end p-4">
            <h3 className="text-white text-lg font-semibold z-10">
              Heart-touching Islamic Nasheeds
            </h3>
          </div>
        </Card>
      </Link>
    </section>
  );
};
