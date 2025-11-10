import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toBengaliNumerals, getBengaliMonthName } from "@/utils/bengaliUtils";

interface PrayerCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export const PrayerCalendar = ({ onDateSelect, selectedDate }: PrayerCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const weekdays = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h3 className="font-semibold text-lg">
            {getBengaliMonthName(currentMonth.getMonth())} {toBengaliNumerals(currentMonth.getFullYear())}
          </h3>
          <Button variant="ghost" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
            date.setHours(0, 0, 0, 0);
            const isToday = date.getTime() === today.getTime();
            const isSelected = date.getTime() === new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).setHours(0, 0, 0, 0);
            const isFriday = date.getDay() === 5;

            return (
              <button
                key={i}
                onClick={() => onDateSelect(date)}
                className={`
                  aspect-square rounded-lg text-sm font-medium transition-all
                  ${isToday ? 'bg-primary text-primary-foreground' : ''}
                  ${isSelected && !isToday ? 'bg-primary/20 border-2 border-primary' : ''}
                  ${isFriday && !isToday && !isSelected ? 'bg-accent/20 text-accent-foreground' : ''}
                  ${!isToday && !isSelected && !isFriday ? 'hover:bg-muted' : ''}
                  flex items-center justify-center
                `}
              >
                {toBengaliNumerals(i + 1)}
              </button>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary"></div>
            <span>আজ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-accent/20"></div>
            <span>জুম্মা</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
