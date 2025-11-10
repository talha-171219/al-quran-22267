// Tasbih settings for vibration and sound

export interface TasbihSettings {
  vibrationEnabled: boolean;
  vibrationPattern: 'short' | 'medium' | 'long' | 'custom';
  customVibration: number[];
  soundEnabled: boolean;
  soundVolume: number;
}

const STORAGE_KEY = 'tasbih_settings';

const DEFAULT_SETTINGS: TasbihSettings = {
  vibrationEnabled: true,
  vibrationPattern: 'short',
  customVibration: [50],
  soundEnabled: true,
  soundVolume: 0.5,
};

const VIBRATION_PATTERNS = {
  short: [50],
  medium: [100],
  long: [200],
  custom: [50, 50, 50],
};

export const loadTasbihSettings = (): TasbihSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load tasbih settings:', error);
  }
  return DEFAULT_SETTINGS;
};

export const saveTasbihSettings = (settings: TasbihSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save tasbih settings:', error);
  }
};

export const getVibrationPattern = (settings: TasbihSettings): number[] => {
  if (settings.vibrationPattern === 'custom') {
    return settings.customVibration;
  }
  return VIBRATION_PATTERNS[settings.vibrationPattern];
};

export const playTasbihSound = (settings: TasbihSettings): void => {
  if (!settings.soundEnabled) return;
  
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(settings.soundVolume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.error('Failed to play sound:', error);
  }
};

export const playCompletionSound = (settings: TasbihSettings): void => {
  if (!settings.soundEnabled) return;
  
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Play a celebratory tone sequence
    const times = [0, 0.1, 0.2];
    const frequencies = [600, 800, 1000];
    
    times.forEach((time, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequencies[index];
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(settings.soundVolume, audioContext.currentTime + time);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + time + 0.15);
      
      oscillator.start(audioContext.currentTime + time);
      oscillator.stop(audioContext.currentTime + time + 0.15);
    });
  } catch (error) {
    console.error('Failed to play completion sound:', error);
  }
};
