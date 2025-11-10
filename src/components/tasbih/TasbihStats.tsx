import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Flame, Award, Calendar } from "lucide-react";
import { TasbihStats as Stats } from "@/utils/tasbihTracker";

interface TasbihStatsProps {
  stats: Stats;
  monthlyStats: {
    totalDays: number;
    daysWithSessions: number;
    totalCount: number;
    totalSessions: number;
    averagePerDay: number;
  };
}

const dhikrNames: { [key: string]: { arabic: string; bangla: string } } = {
  subhanallah: { arabic: "سُبْحَانَ اللهِ", bangla: "সুবহানাল্লাহ" },
  alhamdulillah: { arabic: "الْحَمْدُ لِلَّهِ", bangla: "আলহামদুলিল্লাহ" },
  allahuakbar: { arabic: "اللهُ أَكْبَرُ", bangla: "আল্লাহু আকবার" },
  lailahaillallah: { arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", bangla: "লা ইলাহা ইল্লাল্লাহ" },
  astaghfirullah: { arabic: "أَسْتَغْفِرُ ٱللَّٰهَ", bangla: "আস্তাগফিরুল্লাহ" },
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const TasbihStats = ({ stats, monthlyStats }: TasbihStatsProps) => {
  const favoriteDhikr = dhikrNames[stats.favoritedhikr] || null;

  return (
    <div className="space-y-4">
      {/* Streak Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
          <div className="flex items-start justify-between mb-2">
            <Flame className="h-5 w-5 text-orange-500" />
            {stats.currentStreak >= 7 && (
              <Badge variant="secondary" className="text-xs">🔥</Badge>
            )}
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.currentStreak}</p>
          <p className="text-xs text-muted-foreground">বর্তমান ধারা</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <div className="flex items-start justify-between mb-2">
            <Award className="h-5 w-5 text-blue-500" />
            {stats.longestStreak >= 30 && (
              <Badge variant="secondary" className="text-xs">👑</Badge>
            )}
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.longestStreak}</p>
          <p className="text-xs text-muted-foreground">সর্বোচ্চ ধারা</p>
        </Card>
      </div>

      {/* Overall Statistics */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          সার্বিক পরিসংখ্যান
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-primary">{formatNumber(stats.totalCount)}</p>
            <p className="text-xs text-muted-foreground">মোট জিকির</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{stats.totalSessions}</p>
            <p className="text-xs text-muted-foreground">মোট সেশন</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{stats.completionRate}%</p>
            <p className="text-xs text-muted-foreground">লক্ষ্য সম্পন্নের হার</p>
          </div>
          {favoriteDhikr && (
            <div>
              <p className="font-arabic text-lg text-primary">{favoriteDhikr.arabic}</p>
              <p className="text-xs text-muted-foreground">সবচেয়ে পছন্দের</p>
            </div>
          )}
        </div>
      </Card>

      {/* Monthly Statistics */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          এই মাসের পরিসংখ্যান
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-primary">{monthlyStats.daysWithSessions}</p>
            <p className="text-xs text-muted-foreground">সক্রিয় দিন</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{formatNumber(monthlyStats.totalCount)}</p>
            <p className="text-xs text-muted-foreground">মোট জিকির</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{monthlyStats.totalSessions}</p>
            <p className="text-xs text-muted-foreground">মোট সেশন</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{formatNumber(monthlyStats.averagePerDay)}</p>
            <p className="text-xs text-muted-foreground">দৈনিক গড়</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
