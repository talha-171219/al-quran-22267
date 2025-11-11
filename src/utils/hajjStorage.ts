// Local storage utilities for Hajj progress and checklist

const STORAGE_KEYS = {
  HAJJ_PROGRESS: 'hajj_progress',
  HAJJ_CHECKLIST: 'hajj_checklist',
  HAJJ_BOOKMARKS: 'hajj_bookmarks',
} as const;

export interface HajjProgress {
  [stepSlug: string]: {
    completed: boolean;
    timestamp?: number;
  };
}

export interface HajjChecklistState {
  [itemId: string]: {
    checked: boolean;
    timestamp?: number;
  };
}

export interface HajjBookmarks {
  steps: string[];
  duas: string[];
}

// Progress Management
export const getHajjProgress = (): HajjProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HAJJ_PROGRESS);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading Hajj progress:', error);
    return {};
  }
};

export const setStepCompleted = (stepSlug: string, completed: boolean) => {
  try {
    const progress = getHajjProgress();
    progress[stepSlug] = {
      completed,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.HAJJ_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving Hajj progress:', error);
  }
};

export const isStepCompleted = (stepSlug: string): boolean => {
  const progress = getHajjProgress();
  return progress[stepSlug]?.completed || false;
};

export const getCompletedStepsCount = (): number => {
  const progress = getHajjProgress();
  return Object.values(progress).filter(p => p.completed).length;
};

export const resetHajjProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.HAJJ_PROGRESS);
  } catch (error) {
    console.error('Error resetting Hajj progress:', error);
  }
};

// Checklist Management
export const getChecklistState = (): HajjChecklistState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HAJJ_CHECKLIST);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading checklist:', error);
    return {};
  }
};

export const toggleChecklistItem = (itemId: string, checked: boolean) => {
  try {
    const state = getChecklistState();
    state[itemId] = {
      checked,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.HAJJ_CHECKLIST, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving checklist:', error);
  }
};

export const isItemChecked = (itemId: string): boolean => {
  const state = getChecklistState();
  return state[itemId]?.checked || false;
};

export const getCheckedItemsCount = (): number => {
  const state = getChecklistState();
  return Object.values(state).filter(item => item.checked).length;
};

export const resetChecklist = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.HAJJ_CHECKLIST);
  } catch (error) {
    console.error('Error resetting checklist:', error);
  }
};

// Bookmarks Management
export const getHajjBookmarks = (): HajjBookmarks => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HAJJ_BOOKMARKS);
    return stored ? JSON.parse(stored) : { steps: [], duas: [] };
  } catch (error) {
    console.error('Error reading bookmarks:', error);
    return { steps: [], duas: [] };
  }
};

export const toggleStepBookmark = (stepSlug: string) => {
  try {
    const bookmarks = getHajjBookmarks();
    const index = bookmarks.steps.indexOf(stepSlug);
    
    if (index > -1) {
      bookmarks.steps.splice(index, 1);
    } else {
      bookmarks.steps.push(stepSlug);
    }
    
    localStorage.setItem(STORAGE_KEYS.HAJJ_BOOKMARKS, JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Error toggling step bookmark:', error);
  }
};

export const toggleDuaBookmark = (duaId: string) => {
  try {
    const bookmarks = getHajjBookmarks();
    const index = bookmarks.duas.indexOf(duaId);
    
    if (index > -1) {
      bookmarks.duas.splice(index, 1);
    } else {
      bookmarks.duas.push(duaId);
    }
    
    localStorage.setItem(STORAGE_KEYS.HAJJ_BOOKMARKS, JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Error toggling dua bookmark:', error);
  }
};

export const isStepBookmarked = (stepSlug: string): boolean => {
  const bookmarks = getHajjBookmarks();
  return bookmarks.steps.includes(stepSlug);
};

export const isDuaBookmarked = (duaId: string): boolean => {
  const bookmarks = getHajjBookmarks();
  return bookmarks.duas.includes(duaId);
};
