import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Trophy, Target, TrendingUp } from "lucide-react";
import { AzkarStats } from "@/utils/azkarTracker";
import { toBengaliNumerals } from "@/utils/bengaliUtils";

interface AzkarStatsProps {
  stats: AzkarStats;
}

export const AzkarStatsCard = ({ stats }: AzkarStatsProps) => {
  return (
    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="h-5 w-5 text-orange-600" />
          আপনার অগ্রগতি
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Current Streak */}
          <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded-lg border border-orange-200 dark:border-orange-800">
            <Flame className="h-6 w-6 text-orange-500 mb-1" />
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {toBengaliNumerals(stats.currentStreak)}
            </p>
            <p className="text-xs text-muted-foreground text-center">
              বর্তমান ধারা (দিন)
            </p>
          </div>

          {/* Longest Streak */}
          <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded-lg border border-orange-200 dark:border-orange-800">
            <Trophy className="h-6 w-6 text-amber-500 mb-1" />
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {toBengaliNumerals(stats.longestStreak)}
            </p>
            <p className="text-xs text-muted-foreground text-center">
              সর্বোচ্চ ধারা (দিন)
            </p>
          </div>

          {/* Total Completed */}
          <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded-lg border border-orange-200 dark:border-orange-800">
            <Target className="h-6 w-6 text-green-500 mb-1" />
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {toBengaliNumerals(stats.totalCompleted)}
            </p>
            <p className="text-xs text-muted-foreground text-center">
              মোট সম্পন্ন
            </p>
          </div>

          {/* Completion Rate */}
          <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded-lg border border-orange-200 dark:border-orange-800">
            <TrendingUp className="h-6 w-6 text-blue-500 mb-1" />
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {toBengaliNumerals(stats.completionRate)}%
            </p>
            <p className="text-xs text-muted-foreground text-center">
              সম্পূর্ণতার হার
            </p>
          </div>
        </div>

        {stats.currentStreak >= 7 && (
          <div className="mt-4 text-center">
            <Badge className="bg-orange-500 hover:bg-orange-600">
              🎉 চমৎকার! {toBengaliNumerals(stats.currentStreak)} দিনের ধারা!
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
