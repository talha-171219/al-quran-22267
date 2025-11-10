// Tasbih progress tracking utilities

export interface TasbihSession {
  dhikrType: string;
  count: number;
  target: number;
  completed: boolean;
  timestamp: number;
}

export interface DailyTasbihRecord {
  date: string; // YYYY-MM-DD
  sessions: TasbihSession[];
  totalCount: number;
  dhikrTypes: { [key: string]: number }; // Track count per dhikr type
}

export interface TasbihStats {
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  totalCount: number;
  favoritedhikr: string;
  completionRate: number;
}

export interface TasbihMilestone {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  target: number;
  achieved: boolean;
  achievedDate?: string;
}

const STORAGE_KEY = 'tasbih_history';
const MILESTONES_KEY = 'tasbih_milestones';

// Get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Load tasbih records from localStorage
export const loadTasbihRecords = (): DailyTasbihRecord[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

// Save tasbih records to localStorage
export const saveTasbihRecords = (records: DailyTasbihRecord[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

// Get today's tasbih record
export const getTodayTasbihRecord = (): DailyTasbihRecord => {
  const today = getTodayDate();
  const records = loadTasbihRecords();
  const todayRecord = records.find(r => r.date === today);
  
  if (todayRecord) {
    return todayRecord;
  }
  
  return {
    date: today,
    sessions: [],
    totalCount: 0,
    dhikrTypes: {},
  };
};

// Save a completed session
export const saveSession = (
  dhikrType: string,
  count: number,
  target: number,
  completed: boolean
): void => {
  const today = getTodayDate();
  const records = loadTasbihRecords();
  const todayIndex = records.findIndex(r => r.date === today);
  
  const session: TasbihSession = {
    dhikrType,
    count,
    target,
    completed,
    timestamp: Date.now(),
  };
  
  if (todayIndex >= 0) {
    const record = records[todayIndex];
    record.sessions.push(session);
    record.totalCount += count;
    record.dhikrTypes[dhikrType] = (record.dhikrTypes[dhikrType] || 0) + count;
  } else {
    const newRecord: DailyTasbihRecord = {
      date: today,
      sessions: [session],
      totalCount: count,
      dhikrTypes: { [dhikrType]: count },
    };
    records.push(newRecord);
  }
  
  saveTasbihRecords(records);
  checkMilestones();
};

// Calculate tasbih statistics
export const calculateTasbihStats = (): TasbihStats => {
  const records = loadTasbihRecords();
  
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
    
    if (record && record.sessions.length > 0) {
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
    if (record.sessions.length > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }
  
  // Calculate total sessions and count
  let totalSessions = 0;
  let totalCount = 0;
  const dhikrTypeCounts: { [key: string]: number } = {};
  
  records.forEach(record => {
    totalSessions += record.sessions.length;
    totalCount += record.totalCount;
    Object.entries(record.dhikrTypes).forEach(([type, count]) => {
      dhikrTypeCounts[type] = (dhikrTypeCounts[type] || 0) + count;
    });
  });
  
  // Find favorite dhikr
  let favoritedhikr = '';
  let maxCount = 0;
  Object.entries(dhikrTypeCounts).forEach(([type, count]) => {
    if (count > maxCount) {
      maxCount = count;
      favoritedhikr = type;
    }
  });
  
  // Calculate completion rate (sessions with completed targets)
  const completedSessions = records.reduce(
    (sum, r) => sum + r.sessions.filter(s => s.completed).length,
    0
  );
  const completionRate = totalSessions > 0 
    ? Math.round((completedSessions / totalSessions) * 100)
    : 0;
  
  return {
    currentStreak,
    longestStreak,
    totalSessions,
    totalCount,
    favoritedhikr,
    completionRate,
  };
};

// Get monthly statistics
export const getMonthlyTasbihStats = () => {
  const records = loadTasbihRecords();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const monthlyRecords = records.filter(r => {
    const date = new Date(r.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
  
  const totalDays = monthlyRecords.length;
  const daysWithSessions = monthlyRecords.filter(r => r.sessions.length > 0).length;
  const totalCount = monthlyRecords.reduce((sum, r) => sum + r.totalCount, 0);
  const totalSessions = monthlyRecords.reduce((sum, r) => sum + r.sessions.length, 0);
  
  return {
    totalDays,
    daysWithSessions,
    totalCount,
    totalSessions,
    averagePerDay: daysWithSessions > 0 ? Math.round(totalCount / daysWithSessions) : 0,
  };
};

// Milestones
const defaultMilestones: TasbihMilestone[] = [
  { id: 'first_100', title: 'First Steps', titleBn: 'প্রথম পদক্ষেপ', description: 'Complete 100 dhikr', descriptionBn: '১০০ জিকির সম্পন্ন করুন', target: 100, achieved: false },
  { id: 'first_1000', title: 'Dedicated', titleBn: 'নিবেদিত', description: 'Complete 1,000 dhikr', descriptionBn: '১,০০০ জিকির সম্পন্ন করুন', target: 1000, achieved: false },
  { id: 'first_10000', title: 'Devoted', titleBn: 'ভক্তিপূর্ণ', description: 'Complete 10,000 dhikr', descriptionBn: '১০,০০০ জিকির সম্পন্ন করুন', target: 10000, achieved: false },
  { id: 'streak_7', title: '7 Day Streak', titleBn: '৭ দিনের ধারা', description: 'Practice for 7 days in a row', descriptionBn: 'পরপর ৭ দিন অনুশীলন করুন', target: 7, achieved: false },
  { id: 'streak_30', title: '30 Day Streak', titleBn: '৩০ দিনের ধারা', description: 'Practice for 30 days in a row', descriptionBn: 'পরপর ৩০ দিন অনুশীলন করুন', target: 30, achieved: false },
  { id: 'streak_100', title: '100 Day Streak', titleBn: '১০০ দিনের ধারা', description: 'Practice for 100 days in a row', descriptionBn: 'পরপর ১০০ দিন অনুশীলন করুন', target: 100, achieved: false },
];

// Load milestones
export const loadMilestones = (): TasbihMilestone[] => {
  const saved = localStorage.getItem(MILESTONES_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return defaultMilestones;
};

// Save milestones
export const saveMilestones = (milestones: TasbihMilestone[]) => {
  localStorage.setItem(MILESTONES_KEY, JSON.stringify(milestones));
};

// Check and update milestones
export const checkMilestones = (): TasbihMilestone[] => {
  const milestones = loadMilestones();
  const stats = calculateTasbihStats();
  let updated = false;
  
  milestones.forEach(milestone => {
    if (!milestone.achieved) {
      if (
        (milestone.id.startsWith('first_') && stats.totalCount >= milestone.target) ||
        (milestone.id.startsWith('streak_') && stats.currentStreak >= milestone.target)
      ) {
        milestone.achieved = true;
        milestone.achievedDate = getTodayDate();
        updated = true;
      }
    }
  });
  
  if (updated) {
    saveMilestones(milestones);
  }
  
  return milestones;
};

// Get newly achieved milestones
export const getNewlyAchievedMilestones = (): TasbihMilestone[] => {
  const milestones = loadMilestones();
  const today = getTodayDate();
  return milestones.filter(m => m.achieved && m.achievedDate === today);
};
