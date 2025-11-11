import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, Users, ChevronRight, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { HajjStep } from "@/data/hajj";
import { isStepCompleted, isStepBookmarked, toggleStepBookmark } from "@/utils/hajjStorage";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface HajjStepCardProps {
  step: HajjStep;
  index: number;
}

export const HajjStepCard = ({ step, index }: HajjStepCardProps) => {
  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setCompleted(isStepCompleted(step.slug));
    setBookmarked(isStepBookmarked(step.slug));
  }, [step.slug]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleStepBookmark(step.slug);
    setBookmarked(!bookmarked);
  };

  const getCrowdColor = (level?: string) => {
    switch (level) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-muted-foreground';
    }
  };

  const getCrowdText = (level?: string) => {
    switch (level) {
      case 'high': return 'অধিক ভিড়';
      case 'medium': return 'মাঝারি ভিড়';
      case 'low': return 'কম ভিড়';
      default: return '';
    }
  };

  return (
    <Link to={`/hajj/steps/${step.slug}`}>
      <Card
        className={cn(
          "p-4 hover:shadow-xl transition-all duration-300 cursor-pointer group",
          "border backdrop-blur-sm bg-gradient-to-br from-card/80 to-card/40",
          "hover:scale-[1.02] hover:border-primary/30",
          completed && "border-primary/50 bg-primary/5"
        )}
      >
        <div className="flex gap-4">
          {/* Step Number & Status */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
                "bg-gradient-to-br shadow-lg",
                completed
                  ? "from-primary to-primary/80 text-primary-foreground"
                  : "from-muted to-muted/50 text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            {completed ? (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {step.title_bn}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBookmark}
                className="shrink-0 h-8 w-8"
              >
                <Bookmark
                  className={cn(
                    "h-4 w-4 transition-all",
                    bookmarked && "fill-primary text-primary"
                  )}
                />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {step.summary_bn}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                {step.duration_minutes} মিনিট
              </Badge>
              
              {step.crowd_level && (
                <Badge variant="outline" className={cn("gap-1", getCrowdColor(step.crowd_level))}>
                  <Users className="h-3 w-3" />
                  {getCrowdText(step.crowd_level)}
                </Badge>
              )}

              {step.audio && (
                <Badge variant="outline" className="gap-1">
                  🎵 অডিও সহ
                </Badge>
              )}
            </div>
          </div>

          {/* Arrow */}
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 self-center" />
        </div>
      </Card>
    </Link>
  );
};
