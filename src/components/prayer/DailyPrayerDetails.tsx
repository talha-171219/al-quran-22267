import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";
import { PrayerRecord } from "@/utils/prayerTracker";
import { toBengaliNumerals } from "@/utils/bengaliUtils";

interface DailyPrayerDetailsProps {
  record: PrayerRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

const prayerNamesBn: { [key: string]: string } = {
  Fajr: "ফজর",
  Dhuhr: "যুহর",
  Asr: "আসর",
  Maghrib: "মাগরিব",
  Isha: "এশা",
};

export const DailyPrayerDetails = ({ record, isOpen, onClose }: DailyPrayerDetailsProps) => {
  if (!record) return null;

  const completedCount = Object.values(record.prayers).filter(Boolean).length;
  const percentage = Math.round((completedCount / 5) * 100);

  // Format date in Bengali
  const date = new Date(record.date);
  const monthNamesBn = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  const formattedDate = `${toBengaliNumerals(date.getDate())} ${monthNamesBn[date.getMonth()]}, ${toBengaliNumerals(date.getFullYear())}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center">{formattedDate}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary */}
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-4xl font-bold mb-1">
              {toBengaliNumerals(completedCount)}/৫
            </div>
            <p className="text-sm text-muted-foreground">নামাজ সম্পন্ন হয়েছে</p>
            <div className="mt-3">
              <Badge 
                variant={percentage === 100 ? "default" : "secondary"}
                className={percentage === 100 ? "bg-green-600" : ""}
              >
                {toBengaliNumerals(percentage)}% সম্পূর্ণ
              </Badge>
            </div>
          </div>

          {/* Prayer List */}
          <div className="space-y-2">
            {Object.entries(record.prayers).map(([prayer, completed]) => (
              <div
                key={prayer}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  completed
                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                    : "bg-muted/30 border-border"
                }`}
              >
                {completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <span className={`font-medium ${completed ? "text-green-700 dark:text-green-400" : ""}`}>
                  {prayerNamesBn[prayer]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
