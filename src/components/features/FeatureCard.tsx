import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  gradient?: boolean;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  path,
  gradient,
}: FeatureCardProps) => {
  return (
    <Link to={path}>
      <Card
        className={cn(
          "p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer",
          "border-2 border-transparent hover:border-primary/20",
          gradient && "bg-gradient-primary text-primary-foreground"
        )}
      >
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "p-3 rounded-xl",
              gradient
                ? "bg-white/10"
                : "bg-gradient-primary text-primary-foreground"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p
              className={cn(
                "text-sm",
                gradient ? "text-primary-foreground/80" : "text-muted-foreground"
              )}
            >
              {description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};
