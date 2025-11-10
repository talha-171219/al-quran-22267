// Azkar progress tracking utilities

export interface AzkarProgress {
  categoryId: string;
  dhikrIndex: number;
  count: number;
  completed: boolean;
  lastUpdated: number;
}

export interface DailyAzkarRecord {
  date: string; // YYYY-MM-DD
  progress: AzkarProgress[];
  completedCategories: string[];
}

export interface AzkarStats {
  currentStreak: number;
  longestStreak: number;
  totalCompleted: number;
  completionRate: number;
}

const STORAGE_KEY = 'azkar_progress_history';

// Get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Load azkar records from localStorage
export const loadAzkarRecords = (): DailyAzkarRecord[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

// Save azkar records to localStorage
export const saveAzkarRecords = (records: DailyAzkarRecord[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

// Get today's azkar record
export const getTodayAzkarRecord = (): DailyAzkarRecord => {
  const today = getTodayDate();
  const records = loadAzkarRecords();
  const todayRecord = records.find(r => r.date === today);
  
  if (todayRecord) {
    return todayRecord;
  }
  
  return {
    date: today,
    progress: [],
    completedCategories: [],
  };
};

// Update dhikr count
export const updateDhikrCount = (
  categoryId: string,
  dhikrIndex: number,
  count: number,
  maxCount: number
): DailyAzkarRecord => {
  const today = getTodayDate();
  const records = loadAzkarRecords();
  const todayIndex = records.findIndex(r => r.date === today);
  
  const progress: AzkarProgress = {
    categoryId,
    dhikrIndex,
    count,
    completed: count >= maxCount,
    lastUpdated: Date.now(),
  };
  
  if (todayIndex >= 0) {
    const record = records[todayIndex];
    const progressIndex = record.progress.findIndex(
      p => p.categoryId === categoryId && p.dhikrIndex === dhikrIndex
    );
    
    if (progressIndex >= 0) {
      record.progress[progressIndex] = progress;
    } else {
      record.progress.push(progress);
    }
  } else {
    const newRecord: DailyAzkarRecord = {
      date: today,
      progress: [progress],
      completedCategories: [],
    };
    records.push(newRecord);
  }
  
  saveAzkarRecords(records);
  return records[todayIndex >= 0 ? todayIndex : records.length - 1];
};

// Mark category as completed
export const markCategoryCompleted = (categoryId: string): void => {
  const today = getTodayDate();
  const records = loadAzkarRecords();
  const todayIndex = records.findIndex(r => r.date === today);
  
  if (todayIndex >= 0) {
    if (!records[todayIndex].completedCategories.includes(categoryId)) {
      records[todayIndex].completedCategories.push(categoryId);
    }
  } else {
    records.push({
      date: today,
      progress: [],
      completedCategories: [categoryId],
    });
  }
  
  saveAzkarRecords(records);
};

// Check if category is completed
export const isCategoryCompleted = (categoryId: string, totalDhikrs: number): boolean => {
  const todayRecord = getTodayAzkarRecord();
  const categoryProgress = todayRecord.progress.filter(p => p.categoryId === categoryId);
  
  if (categoryProgress.length < totalDhikrs) return false;
  
  return categoryProgress.every(p => p.completed);
};

// Get dhikr count for today
export const getTodayDhikrCount = (categoryId: string, dhikrIndex: number): number => {
  const todayRecord = getTodayAzkarRecord();
  const progress = todayRecord.progress.find(
    p => p.categoryId === categoryId && p.dhikrIndex === dhikrIndex
  );
  
  return progress ? progress.count : 0;
};

// Reset dhikr count
export const resetDhikrCount = (categoryId: string, dhikrIndex: number): void => {
  updateDhikrCount(categoryId, dhikrIndex, 0, 1);
};

// Calculate azkar statistics
export const calculateAzkarStats = (): AzkarStats => {
  const records = loadAzkarRecords();
  
  // Sort by date
  const sortedRecords = records.sort((a, b) => a.date.localeCompare(b.date));
  
  // Calculate current streak
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  const today = getTodayDate();
  let currentDate = new Date(today);
  
  // Count backwards from today
  for (let i = 0; i < 365; i++) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const record = sortedRecords.find(r => r.date === dateStr);
    
    if (record && record.completedCategories.length > 0) {
      if (i === 0 || tempStreak > 0) {
        currentStreak++;
        tempStreak++;
      } else {
        break;
      }
    } else if (i > 0) {
      break;
    }
    
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  // Calculate longest streak
  tempStreak = 0;
  for (const record of sortedRecords) {
    if (record.completedCategories.length > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }
  
  // Calculate total completed and completion rate
  let totalCompleted = 0;
  records.forEach(record => {
    totalCompleted += record.completedCategories.length;
  });
  
  const last30Days = records.slice(-30);
  const possibleCompletions = last30Days.length * 3; // 3 categories
  const actualCompletions = last30Days.reduce(
    (sum, r) => sum + r.completedCategories.length,
    0
  );
  const completionRate = possibleCompletions > 0 
    ? Math.round((actualCompletions / possibleCompletions) * 100)
    : 0;
  
  return {
    currentStreak,
    longestStreak,
    totalCompleted,
    completionRate,
  };
};

// Get monthly statistics
export const getMonthlyAzkarStats = () => {
  const records = loadAzkarRecords();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const monthlyRecords = records.filter(r => {
    const date = new Date(r.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
  
  const totalDays = monthlyRecords.length;
  const daysWithProgress = monthlyRecords.filter(r => r.completedCategories.length > 0).length;
  const totalCategoriesCompleted = monthlyRecords.reduce(
    (sum, r) => sum + r.completedCategories.length,
    0
  );
  
  return {
    totalDays,
    daysWithProgress,
    totalCategoriesCompleted,
    completionRate: totalDays > 0 ? Math.round((daysWithProgress / totalDays) * 100) : 0,
  };
};
