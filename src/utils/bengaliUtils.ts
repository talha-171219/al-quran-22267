// Bengali numeral conversion utilities

const bengaliNumerals: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

export const toBengaliNumerals = (num: string | number): string => {
  return String(num)
    .split('')
    .map((digit) => bengaliNumerals[digit] || digit)
    .join('');
};

export const formatTimeToBengali = (time: string): string => {
  return toBengaliNumerals(time);
};

export const formatCountdownToBengali = (hours: number, minutes: number, seconds: number): string => {
  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');
  return `${toBengaliNumerals(h)}:${toBengaliNumerals(m)}:${toBengaliNumerals(s)}`;
};

export const getBengaliMonthName = (month: number): string => {
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  return months[month];
};

export const getBengaliWeekday = (day: number): string => {
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  return days[day];
};

export const formatBengaliDate = (date: Date): string => {
  const day = toBengaliNumerals(date.getDate());
  const month = getBengaliMonthName(date.getMonth());
  const year = toBengaliNumerals(date.getFullYear());
  return `${day} ${month} ${year}`;
};
