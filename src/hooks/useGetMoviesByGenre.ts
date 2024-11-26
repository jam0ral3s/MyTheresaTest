import {useRef, useState} from 'react';
import {fetchMoviesByGenre} from '../service/api/tmdbClient.ts';
import {Movie, MovieData} from '../types/tmdbType.ts';

export const useMoviesByGenre = (genreId: number) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(Infinity);

  const isLoadingRef = useRef(false);

  const fetchMovies = async (pageToFetch: number) => {
    console.log('fetchMovies');
    if (isLoadingRef.current || pageToFetch > totalPages) {
      return;
    }

    isLoadingRef.current = true;
    setLoading(true);
    try {
      const moviesFetched: MovieData = await fetchMoviesByGenre(
        genreId,
        pageToFetch,
      );

      setMovies(prevMovies =>
        prevMovies
          ? [...prevMovies, ...moviesFetched.movies]
          : moviesFetched.movies,
      );
      setPage(pageToFetch);
      setTotalPages(moviesFetched.total_pages);
    } catch (error) {
      console.error(`Error fetching movies for genre ${genreId}:`, error);
    } finally {
      isLoadingRef.current = false;
      setLoading(false);
    }
  };

  const loadMoreMovies = () => {
    console.log('loadMoreMovies');
    if (loading || page > totalPages) {
      return;
    }
    fetchMovies(page + 1);
  };

  return {movies, loading, loadMoreMovies, fetchMovies};
};
