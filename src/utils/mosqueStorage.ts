export interface Mosque {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  distance?: number;
  type?: string;
}

const FAVORITES_KEY = 'mosque_favorites';

export const mosqueStorage = {
  getFavorites: (): Mosque[] => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  },

  addFavorite: (mosque: Mosque): void => {
    try {
      const favorites = mosqueStorage.getFavorites();
      // Check if already exists
      if (!favorites.some(m => m.id === mosque.id)) {
        favorites.push(mosque);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  removeFavorite: (mosqueId: string): void => {
    try {
      const favorites = mosqueStorage.getFavorites();
      const filtered = favorites.filter(m => m.id !== mosqueId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  isFavorite: (mosqueId: string): boolean => {
    try {
      const favorites = mosqueStorage.getFavorites();
      return favorites.some(m => m.id === mosqueId);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  },

  clearFavorites: (): void => {
    try {
      localStorage.removeItem(FAVORITES_KEY);
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  }
};
