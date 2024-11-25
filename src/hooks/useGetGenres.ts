import {useState, useEffect} from 'react';
import {fetchGenres} from '../service/api/tmdbClient.ts';
import {Genre} from '../types/tmdbType.ts';
import {usePersistentState} from '../hooks/usePersistentState.ts';

export const useGetGenres = () => {
  const [genres, setGenres] = usePersistentState<Genre[]>('Genres', []);
  const [loadingGenres, setLoadingGenres] = useState(
    genres.length === 0 ? true : false,
  );

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const fetchedGenres = await fetchGenres();
        setGenres(fetchedGenres);
      } catch (error) {
        console.error('Error loading genres:', error);
      } finally {
        setLoadingGenres(false);
      }
    };

    if (genres.length <= 0) {
      loadGenres();
    } else {
      setLoadingGenres(false);
    }
  }, []);

  return {
    loadingGenres,
    genres,
  };
};
