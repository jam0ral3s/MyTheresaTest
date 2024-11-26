import {act, renderHook} from '@testing-library/react';
import {useMoviesByGenre} from '../useGetMoviesByGenre';
import {MovieData} from '@/types/tmdbType';

jest.mock('../../service/api/tmdbClient.ts', () => ({
  fetchMoviesByGenre: jest.fn(() => Promise.resolve([])),
}));

const {fetchMoviesByGenre} = require('../../service/api/tmdbClient.ts');

describe('useGetMoviesByGenre hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  /*
  it('Do not fetch movies when initialize hook', async () => {
    const {result} = renderHook(() => useMoviesByGenre(1));
    const fetchMoviesSpy = jest.fn(result.current.fetchMovies);

    await act(async () => {
      jest.useFakeTimers();
    });

    expect(result.current.movies).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(fetchMoviesSpy).not.toHaveBeenCalled();
  });

  it('Fetch movies if not previous call', async () => {
    const mockMoview = {
      id: 1,
      title: 'Title',
      poster_path: '',
      vote_average: 1,
      overview: 'overview',
      release_date: '',
    };

    const mockMovieData: MovieData = {
      movies: [mockMoview],
      total_pages: 1,
    };

    (fetchMoviesByGenre as jest.Mock).mockResolvedValue(mockMovieData);

    const {result} = renderHook(() => useMoviesByGenre(1));
    const fetchMoviesSpy = jest.fn(result.current.fetchMovies);

    await act(async () => {
      jest.useFakeTimers();
      await fetchMoviesSpy(1);
    });

    expect(result.current.movies).toEqual([mockMoview]);
    expect(result.current.loading).toBe(false);
    expect(fetchMoviesSpy).toHaveBeenCalled();
  }); */

  it('Do not fetch movies if it is loading', async () => {
    const mockMovie = {
      id: 1,
      title: 'Title',
      poster_path: '',
      vote_average: 1,
      overview: 'overview',
      release_date: '',
    };

    const mockMovieData: MovieData = {
      movies: [mockMovie],
      total_pages: 1,
    };

    (fetchMoviesByGenre as jest.Mock).mockResolvedValueOnce(mockMovieData);

    const {result} = renderHook(() => useMoviesByGenre(1));

    const fetchMoviesSpy = jest.spyOn(result.current, 'fetchMovies');

    await act(async () => {
      const firstCall = result.current.fetchMovies(1);
      const secondCall = result.current.fetchMovies(1);
      await Promise.all([firstCall, secondCall]);
    });

    expect(fetchMoviesByGenre).toHaveBeenCalledTimes(1);
    expect(fetchMoviesSpy).toHaveBeenCalledTimes(2);
  });
});
