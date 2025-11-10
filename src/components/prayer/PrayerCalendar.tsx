import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toBengaliNumerals, getBengaliMonthName } from "@/utils/bengaliUtils";
import { formatDateKey } from "@/utils/prayerTimesCache";

interface PrayerCalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate: Date;
  navigateToPage?: boolean;
}

export const PrayerCalendar = ({ onDateSelect, selectedDate, navigateToPage = true }: PrayerCalendarProps) => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateClick = (date: Date) => {
    if (navigateToPage) {
      // Navigate to dedicated page
      const dateStr = formatDateKey(date);
      navigate(`/calendar/date/${dateStr}`);
    } else if (onDateSelect) {
      // Use callback for inline display
      onDateSelect(date);
    }
  };

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
    <Card className="animate-fade-in">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={prevMonth} className="hover-scale">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h3 className="font-semibold text-lg">
            {getBengaliMonthName(currentMonth.getMonth())} {toBengaliNumerals(currentMonth.getFullYear())}
          </h3>
          <Button variant="ghost" size="icon" onClick={nextMonth} className="hover-scale">
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
                onClick={() => handleDateClick(date)}
                className={`
                  aspect-square rounded-lg text-sm font-medium transition-all duration-200
                  ${isToday ? 'bg-primary text-primary-foreground shadow-lg scale-105' : ''}
                  ${isSelected && !isToday ? 'bg-primary/20 border-2 border-primary ring-2 ring-primary/20' : ''}
                  ${isFriday && !isToday && !isSelected ? 'bg-accent/20 text-accent-foreground' : ''}
                  ${!isToday && !isSelected && !isFriday ? 'hover:bg-muted hover:scale-105' : ''}
                  flex items-center justify-center
                  hover-scale
                  cursor-pointer
                `}
              >
                {toBengaliNumerals(i + 1)}
              </button>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary shadow-sm"></div>
            <span>আজ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-accent/20"></div>
            <span>জুম্মা</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border-2 border-primary"></div>
            <span>নির্বাচিত</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
