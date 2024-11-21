import {useState, useEffect} from 'react';
import {fetchGenres, fetchMoviesByGenre} from '../../service/api/tmdbClient.ts';
import {Genre, Movie} from '@/types/tmdb.ts';

export const useMoviesData = () => {
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<{
    [key: number]: Movie[] | null;
  }>({});
  const [pagesByGenre, setPagesByGenre] = useState<{[key: number]: number}>({});
  const [loadingByGenre, setLoadingByGenre] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const fetechGenres = await fetchGenres();
        setGenres(fetechGenres);
        setLoadingGenres(false);

        const initialMoviesState = fetechGenres.reduce((acc, genre) => {
          acc[genre.id] = null;
          return acc;
        }, {} as {[key: number]: null});
        setMoviesByGenre(initialMoviesState);

        const initialPagesState = fetechGenres.reduce((acc, genre) => {
          acc[genre.id] = 1;
          return acc;
        }, {} as {[key: number]: number});
        setPagesByGenre(initialPagesState);

        const initialLoadingState = fetechGenres.reduce((acc, genre) => {
          acc[genre.id] = false;
          return acc;
        }, {} as {[key: number]: boolean});

        setLoadingByGenre(initialLoadingState);

        for (const genre of fetechGenres) {
          const movies = await fetchMoviesByGenre(genre.id);
          setMoviesByGenre(prevState => ({
            ...prevState,
            [genre.id]: movies,
          }));
        }
      } catch (error) {
        console.error('Error loading genres or movies:', error);
      } finally {
        setLoadingGenres(false);
      }
    };

    loadGenres();
  }, []);

  const loadMoreMoviesByGenre = async (genreId: number) => {
    if (loadingByGenre[genreId]) {
      return;
    }

    setLoadingByGenre(prevState => ({
      ...prevState,
      [genreId]: true,
    }));

    const nextPage = (pagesByGenre[genreId] || 1) + 1;
    try {
      const moreMovies = await fetchMoviesByGenre(genreId, nextPage);
      setMoviesByGenre(prevState => ({
        ...prevState,
        [genreId]: [...(prevState[genreId] || []), ...moreMovies],
      }));
      setPagesByGenre(prevState => ({
        ...prevState,
        [genreId]: nextPage,
      }));
    } catch (error) {
      console.error(`Error loading more movies for genre ${genreId}:`, error);
    } finally {
      setLoadingByGenre(prevState => ({
        ...prevState,
        [genreId]: false,
      }));
    }
  };

  return {
    loadingGenres,
    genres,
    moviesByGenre,
    loadMoreMoviesByGenre,
    loadingByGenre,
  };
};
