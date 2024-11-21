import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {HomeScreen} from '../HomeScreen';

jest.mock('../../../hooks/movies/useMoviesByCategories.ts', () => ({
  useMoviesData: jest.fn(),
}));

const {
  useMoviesData,
} = require('../../../hooks/movies/useMoviesByCategories.ts');

describe('HomeScreen', () => {
  it('muestra el indicador de carga al inicio', () => {
    useMoviesData.mockReturnValue({
      loadingGenres: true,
      genres: [],
      moviesByGenre: [],
      pagesByGenre: [],
      loadingByGenre: null,
      loadMoreMoviesByGenre: jest.fn(),
    });
    render(<HomeScreen />);
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renderiza las categorías después de cargar los datos', () => {
    useMoviesData.mockReturnValue({
      loadingByGenre: [{1: false}],
      genres: [{id: 1, name: 'Action'}],
      moviesByGenre: {
        1: [
          {
            id: 1,
            title: 'Movie 1',
            poster_path: '',
            vote_average: 8.0,
          },
          {
            id: 2,
            title: 'Movie 2',
            poster_path: '',
            vote_average: 7.5,
          },
        ],
      },
      pagesByGenre: [{1: 1}],
      loadMoreMoviesByGenre: jest.fn(),
    });

    render(<HomeScreen />);

    expect(screen.getByText('Action')).toBeTruthy();
    expect(screen.getByText('Movie 1')).toBeTruthy();
    expect(screen.getByText('Movie 2')).toBeTruthy();
  });

  it('loadMoreMovies when reach end of the list', async () => {
    const mockLoadMoreMovies = jest.fn();
    useMoviesData.mockReturnValue({
      loadingByGenre: [{1: false}],
      genres: [{id: 1, name: 'Action'}],
      moviesByGenre: {
        1: [
          {
            id: 1,
            name: 'Movie 1',
            poster_path: '/mock1.jpg',
            vote_average: 8.0,
          },
        ],
      },
      pagesByGenre: [{1: 1}],
      loadMoreMoviesByGenre: mockLoadMoreMovies,
    });

    const {getByTestId} = render(<HomeScreen />);

    const flatList = getByTestId('flatlist-category-Action');

    fireEvent(flatList, 'onEndReached');

    await waitFor(() => expect(mockLoadMoreMovies).toHaveBeenCalledWith(1));
  });
});
