import {Movie} from '@/types/tmdb';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

export const getFavorites = async (): Promise<Movie[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error retrieving:', e);
    return [];
  }
};

export const saveFavorites = async (favorites: Movie[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem(FAVORITES_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving:', e);
  }
};
