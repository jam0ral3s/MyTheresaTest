import {act, renderHook} from '@testing-library/react';
import {useFavorites} from '../../hooks/useFavorites';
import {Movie} from '../../types/tmdbType';

jest.mock('../../storage/favoritesStorage.ts', () => ({
  getFavorites: jest.fn(() => Promise.resolve([])),
  saveFavorites: jest.fn(() => Promise.resolve()),
}));

const {getFavorites, saveFavorites} = require('../../storage/favoritesStorage');

const mockMovie: Movie = {
  id: 1,
  title: 'Mock Movie',
  overview: 'This is a mock movie.',
  poster_path: '/path/to/poster.jpg',
  vote_average: 8.5,
  release_date: '2021-01-01',
};

describe('useFavorites Hook', () => {
  beforeEach(() => {
    (getFavorites as jest.Mock).mockResolvedValue([]);
    (saveFavorites as jest.Mock).mockResolvedValue(undefined);
  });

  it('should load favorites on mount', async () => {
    (getFavorites as jest.Mock).mockResolvedValue([mockMovie]);

    const {result} = renderHook<ReturnType<typeof useFavorites>, undefined>(
      () => useFavorites(),
    );

    await act(async () => {
      jest.useFakeTimers();
    });

    expect(result.current.favorites).toEqual([mockMovie]);
    expect(result.current.isLoading).toBe(false);
  });

  it('should add a favorite movie', async () => {
    const {result} = renderHook<ReturnType<typeof useFavorites>, undefined>(
      () => useFavorites(),
    );

    await act(async () => {
      jest.useFakeTimers();
    });

    await act(async () => {
      await result.current.addFavorite(mockMovie);
    });

    expect(result.current.favorites).toEqual([mockMovie]);
    expect(saveFavorites).toHaveBeenCalledWith([mockMovie]);
  });

  it('should remove a favorite movie', async () => {
    (getFavorites as jest.Mock).mockResolvedValue([mockMovie]);

    const {result} = renderHook<ReturnType<typeof useFavorites>, undefined>(
      () => useFavorites(),
    );

    await act(async () => {
      jest.useFakeTimers();
    });

    await act(async () => {
      await result.current.removeFavorite(mockMovie);
    });

    expect(result.current.favorites).toEqual([]);
    expect(saveFavorites).toHaveBeenCalledWith([]);
  });

  it('should check if a movie is favorite', async () => {
    (getFavorites as jest.Mock).mockResolvedValue([mockMovie]);

    const {result} = renderHook<ReturnType<typeof useFavorites>, undefined>(
      () => useFavorites(),
    );

    await act(async () => {
      jest.useFakeTimers();
    });

    expect(result.current.isFavorite(mockMovie)).toBe(true);
    expect(result.current.isFavorite({...mockMovie, id: 2})).toBe(false);
  });
});
