import {useEffect, useState} from 'react';
import {getFavorites, saveFavorites} from '../storage/favoritesStorage.ts';
import {Movie} from '@/types/tmdb.ts';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await getFavorites();
      setFavorites(storedFavorites);
      setIsLoading(false);
    };
    loadFavorites();
  }, []);

  const addFavorite = async (movie: Movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const removeFavorite = async (movie: Movie) => {
    const newFavorites = favorites.filter(item => {
      return item.id !== movie.id;
    });
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const isFavorite = (movie: Movie): boolean => {
    return favorites.some(item => item.id === movie.id);
  };

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};
