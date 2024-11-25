import {act, renderHook} from '@testing-library/react';
import {Genre} from '../../types/tmdbType';
import {useGetGenres} from '../useGetGenres';

jest.mock('../../service/api/tmdbClient', () => ({
  fetchGenres: jest.fn(),
}));

jest.mock('../usePersistentState', () => ({
  usePersistentState: jest.fn(),
}));

const {fetchGenres} = require('../../service/api/tmdbClient');
const {usePersistentState} = require('../usePersistentState');

const mockGenres: Genre[] = [
  {id: 1, name: 'Action'},
  {id: 2, name: 'Comedy'},
];

describe('useGetGenres Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch genres when not loaded', async () => {
    (fetchGenres as jest.Mock).mockResolvedValue(mockGenres);

    let currentGenres: Genre[] = [];
    let mockSetGenres = jest.fn(newGenres => {
      currentGenres = newGenres;
    });

    (usePersistentState as jest.Mock).mockImplementation(() => [
      currentGenres,
      mockSetGenres,
    ]);
    const {result} = renderHook<ReturnType<typeof useGetGenres>, undefined>(
      () => useGetGenres(),
    );

    await act(async () => {
      jest.useFakeTimers();
    });

    expect(fetchGenres).toHaveBeenCalled();
    expect(mockSetGenres).toHaveBeenCalledWith(mockGenres);
    expect(result.current.genres).toEqual(mockGenres);
    expect(result.current.loadingGenres).toBe(false);
  });

  it('should not fetch genres when already loaded', async () => {
    (usePersistentState as jest.Mock).mockImplementation(() => [
      mockGenres,
      jest.fn(),
    ]);

    const {result} = renderHook<ReturnType<typeof useGetGenres>, undefined>(
      () => useGetGenres(),
    );

    await act(async () => {
      jest.useFakeTimers();
    });

    expect(fetchGenres).not.toHaveBeenCalled();
    expect(result.current.genres).toEqual(mockGenres);
    expect(result.current.loadingGenres).toBe(false);
  });
});
