import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {fetchGenres} from '../service/api/tmdbClient';
import {Genre} from '../types/tmdbType';

interface GenreContextProps {
  genres: Genre[];
  loadingGenres: boolean;
}

const GenreContext = createContext<GenreContextProps | undefined>(undefined);

interface GenreProviderProps {
  children: ReactNode;
}

export const GenreProvider: React.FC<GenreProviderProps> = ({children}) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loadingGenres, setLoadingGenres] = useState(genres.length === 0);

  const loadGenres = async () => {
    setLoadingGenres(true);
    try {
      const fetchedGenres = await fetchGenres();
      setGenres(fetchedGenres);
    } catch (error) {
      console.error('Error loading genres:', error);
    } finally {
      setLoadingGenres(false);
    }
  };

  useEffect(() => {
    if (genres.length === 0) {
      loadGenres();
    }
  }, []);
  return (
    <GenreContext.Provider value={{genres, loadingGenres}}>
      {children}
    </GenreContext.Provider>
  );
};

export const useGenreContext = (): GenreContextProps => {
  const context = useContext(GenreContext);
  if (!context) {
    throw new Error('useGenreContext must be used within a GenreProvider');
  }
  return context;
};
