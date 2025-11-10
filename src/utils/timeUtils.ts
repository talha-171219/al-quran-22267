import { toBengaliNumerals } from "./bengaliUtils";

export const convertTo12Hour = (time24: string): { time: string, period: string, periodBn: string } => {
  const [hours, minutes] = time24.split(':').map(Number);
  
  let period = 'AM';
  let periodBn = 'পূর্বাহ্ণ';
  let hours12 = hours;
  
  if (hours >= 12) {
    period = 'PM';
    periodBn = 'অপরাহ্ণ';
    if (hours > 12) {
      hours12 = hours - 12;
    }
  }
  
  if (hours === 0) {
    hours12 = 12;
  }
  
  const timeStr = `${hours12}:${minutes.toString().padStart(2, '0')}`;
  
  return {
    time: toBengaliNumerals(timeStr),
    period,
    periodBn
  };
};

export const formatTime12Hour = (time24: string, useBengali: boolean = true): string => {
  const { time, period, periodBn } = convertTo12Hour(time24);
  return `${time} ${useBengali ? periodBn : period}`;
};

export const formatCurrentTime12Hour = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  let period = 'AM';
  let periodBn = 'পূর্বাহ্ণ';
  let hours12 = hours;
  
  if (hours >= 12) {
    period = 'PM';
    periodBn = 'অপরাহ্ণ';
    if (hours > 12) {
      hours12 = hours - 12;
    }
  }
  
  if (hours === 0) {
    hours12 = 12;
  }
  
  const timeStr = `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  return `${toBengaliNumerals(timeStr)} ${periodBn}`;
};
