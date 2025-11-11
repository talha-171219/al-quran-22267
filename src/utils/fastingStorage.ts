// Storage utilities for fasting tracker and progress

interface FastingProgress {
  [date: string]: {
    completed: boolean;
    timestamp: number;
    note?: string;
  };
}

const FASTING_PROGRESS_KEY = 'fasting_progress';
const FASTING_CURRENT_YEAR_KEY = 'fasting_current_year';

// Get fasting progress
export const getFastingProgress = (): FastingProgress => {
  try {
    const stored = localStorage.getItem(FASTING_PROGRESS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading fasting progress:', error);
    return {};
  }
};

// Save fasting progress
const saveFastingProgress = (progress: FastingProgress): void => {
  try {
    localStorage.setItem(FASTING_PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving fasting progress:', error);
  }
};

// Toggle fasting completion for a date
export const toggleFastingDay = (date: string, completed: boolean, note?: string): void => {
  const progress = getFastingProgress();
  progress[date] = {
    completed,
    timestamp: Date.now(),
    note
  };
  saveFastingProgress(progress);
};

// Check if fasting is completed for a date
export const isFastingCompleted = (date: string): boolean => {
  const progress = getFastingProgress();
  return progress[date]?.completed || false;
};

// Get fasting note for a date
export const getFastingNote = (date: string): string | undefined => {
  const progress = getFastingProgress();
  return progress[date]?.note;
};

// Get total completed fasting days
export const getTotalCompletedDays = (): number => {
  const progress = getFastingProgress();
  return Object.values(progress).filter(day => day.completed).length;
};

// Get completed days count for current month
export const getMonthCompletedDays = (year: number, month: number): number => {
  const progress = getFastingProgress();
  const monthKey = `${year}-${String(month).padStart(2, '0')}`;
  
  return Object.entries(progress)
    .filter(([date, data]) => date.startsWith(monthKey) && data.completed)
    .length;
};

// Get Ramadan progress (days 1-30)
export const getRamadanProgress = (): { completed: number; total: number; percentage: number } => {
  const currentYear = new Date().getFullYear();
  const storedYear = localStorage.getItem(FASTING_CURRENT_YEAR_KEY);
  
  // Reset if new Ramadan year
  if (storedYear !== currentYear.toString()) {
    localStorage.setItem(FASTING_CURRENT_YEAR_KEY, currentYear.toString());
  }

  const progress = getFastingProgress();
  const completed = Object.values(progress).filter(day => day.completed).length;
  const total = 30;
  const percentage = Math.round((completed / total) * 100);

  return { completed, total, percentage };
};

// Reset fasting progress (for new Ramadan)
export const resetFastingProgress = (): void => {
  try {
    localStorage.removeItem(FASTING_PROGRESS_KEY);
    localStorage.setItem(FASTING_CURRENT_YEAR_KEY, new Date().getFullYear().toString());
  } catch (error) {
    console.error('Error resetting fasting progress:', error);
  }
};

// Export fasting data as JSON
export const exportFastingData = (): string => {
  const progress = getFastingProgress();
  return JSON.stringify(progress, null, 2);
};
