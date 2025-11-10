import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Lock } from "lucide-react";
import { TasbihMilestone } from "@/utils/tasbihTracker";

interface TasbihMilestonesProps {
  milestones: TasbihMilestone[];
}

export const TasbihMilestones = ({ milestones }: TasbihMilestonesProps) => {
  const achieved = milestones.filter(m => m.achieved);
  const unachieved = milestones.filter(m => !m.achieved);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Trophy className="h-4 w-4 text-yellow-500" />
          অর্জনসমূহ
        </h3>
        <Badge variant="secondary">
          {achieved.length}/{milestones.length}
        </Badge>
      </div>

      <div className="space-y-2">
        {achieved.map(milestone => (
          <div
            key={milestone.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20"
          >
            <div className="text-2xl">🏆</div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{milestone.titleBn}</p>
              <p className="text-xs text-muted-foreground">{milestone.descriptionBn}</p>
            </div>
            {milestone.achievedDate && (
              <Badge variant="outline" className="text-xs">
                {new Date(milestone.achievedDate).toLocaleDateString('bn-BD')}
              </Badge>
            )}
          </div>
        ))}

        {unachieved.map(milestone => (
          <div
            key={milestone.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 opacity-60"
          >
            <div className="text-2xl opacity-50">
              <Lock className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{milestone.titleBn}</p>
              <p className="text-xs text-muted-foreground">{milestone.descriptionBn}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
