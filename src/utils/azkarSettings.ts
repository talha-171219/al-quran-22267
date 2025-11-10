// Azkar settings for vibration and sound

export interface AzkarSettings {
  vibrationEnabled: boolean;
  vibrationPattern: 'short' | 'medium' | 'long';
  soundEnabled: boolean;
  soundVolume: number;
}

const STORAGE_KEY = 'azkar_settings';

const DEFAULT_SETTINGS: AzkarSettings = {
  vibrationEnabled: true,
  vibrationPattern: 'short',
  soundEnabled: true,
  soundVolume: 0.5,
};

const VIBRATION_PATTERNS = {
  short: [50],
  medium: [100],
  long: [200],
};

export const loadAzkarSettings = (): AzkarSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load azkar settings:', error);
  }
  return DEFAULT_SETTINGS;
};

export const saveAzkarSettings = (settings: AzkarSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save azkar settings:', error);
  }
};

export const getVibrationPattern = (settings: AzkarSettings): number[] => {
  return VIBRATION_PATTERNS[settings.vibrationPattern];
};

export const playAzkarSound = (settings: AzkarSettings): void => {
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

export const playCompletionSound = (settings: AzkarSettings): void => {
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
