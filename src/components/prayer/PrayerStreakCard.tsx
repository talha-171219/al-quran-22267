import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Calendar, Award } from "lucide-react";
import { toBengaliNumerals } from "@/utils/bengaliUtils";

interface PrayerStreakCardProps {
  currentStreak: number;
  longestStreak: number;
  monthlyCompletion: number;
}

export const PrayerStreakCard = ({ 
  currentStreak, 
  longestStreak,
  monthlyCompletion 
}: PrayerStreakCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="h-5 w-5 text-orange-500" />
          আপনার ধারা
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {/* Current Streak */}
          <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <Flame className="h-6 w-6 text-orange-500 mb-1" />
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {toBengaliNumerals(currentStreak)}
            </p>
            <p className="text-xs text-muted-foreground text-center">
              বর্তমান
            </p>
          </div>

          {/* Longest Streak */}
          <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <Award className="h-6 w-6 text-amber-500 mb-1" />
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {toBengaliNumerals(longestStreak)}
            </p>
            <p className="text-xs text-muted-foreground text-center">
              সর্বোচ্চ
            </p>
          </div>

          {/* Monthly */}
          <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <Calendar className="h-6 w-6 text-green-500 mb-1" />
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {toBengaliNumerals(monthlyCompletion)}%
            </p>
            <p className="text-xs text-muted-foreground text-center">
              এই মাস
            </p>
          </div>
        </div>

        {currentStreak >= 30 && (
          <div className="mt-4 text-center">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              🔥 অসাধারণ! {toBengaliNumerals(currentStreak)} দিনের ধারা!
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
