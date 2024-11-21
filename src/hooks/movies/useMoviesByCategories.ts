import {useState, useEffect} from 'react';
import {fetchGenres, fetchMoviesByGenre} from './../../service/mockService.ts';

export const useMoviesData = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const genres = await fetchGenres();
        const categoriesWithMovies = await Promise.all(
          genres.map(async genre => ({
            ...genre,
            movies: await fetchMoviesByGenre(genre.id),
          })),
        );
        setCategories(categoriesWithMovies);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {loading, categories};
};
