import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { PrayerRecord } from "@/utils/prayerTracker";
import { toBengaliNumerals } from "@/utils/bengaliUtils";

interface MonthlyCalendarProps {
  records: PrayerRecord[];
}

export const MonthlyCalendar = ({ records }: MonthlyCalendarProps) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Get first day of month and total days
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();
  
  // Bengali month names
  const monthNamesBn = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];
  
  const weekDaysBn = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"];
  
  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const record = records.find(r => r.date === dateStr);
    
    let completedCount = 0;
    if (record) {
      completedCount = Object.values(record.prayers).filter(Boolean).length;
    }
    
    calendarDays.push({
      day,
      dateStr,
      completedCount,
      isToday: dateStr === now.toISOString().split('T')[0],
    });
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          {monthNamesBn[currentMonth]} {toBengaliNumerals(currentYear)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDaysBn.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground p-1">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dayData, index) => {
            if (!dayData) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }
            
            const { day, completedCount, isToday } = dayData;
            const isPerfectDay = completedCount === 5;
            
            return (
              <div
                key={day}
                className={`
                  aspect-square flex flex-col items-center justify-center rounded-lg text-xs
                  ${isToday ? 'ring-2 ring-primary' : ''}
                  ${isPerfectDay ? 'bg-green-100 dark:bg-green-950/40 border border-green-500' : 'bg-muted/30'}
                `}
              >
                <div className="font-medium">{toBengaliNumerals(day)}</div>
                {completedCount > 0 && (
                  <div className="flex gap-px mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      i < completedCount ? (
                        <CheckCircle2 key={i} className="h-2 w-2 text-green-600" />
                      ) : (
                        <Circle key={i} className="h-2 w-2 text-gray-300" />
                      )
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            <span>সম্পন্ন</span>
          </div>
          <div className="flex items-center gap-1">
            <Circle className="h-3 w-3 text-gray-300" />
            <span>বাকি</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
