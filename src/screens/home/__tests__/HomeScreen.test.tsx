import React from 'react';
import {render, screen} from '@testing-library/react-native';
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
      loading: true,
      categories: [],
    });

    render(<HomeScreen />);
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renderiza las categorías después de cargar los datos', () => {
    useMoviesData.mockReturnValue({
      loading: false,
      categories: [
        {
          id: 1,
          name: 'Action',
          movies: [
            {
              id: 1,
              name: 'Movie 1',
              poster_path: '/mock1.jpg',
              vote_average: 8.0,
            },
            {
              id: 2,
              name: 'Movie 2',
              poster_path: '/mock2.jpg',
              vote_average: 7.5,
            },
          ],
        },
      ],
    });

    render(<HomeScreen />);

    expect(screen.getByText('Action')).toBeTruthy();
    expect(screen.getByText('Movie 1')).toBeTruthy();
    expect(screen.getByText('Movie 2')).toBeTruthy();
  });
});
