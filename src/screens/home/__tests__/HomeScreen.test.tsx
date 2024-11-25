import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {HomeScreen} from '../HomeScreen';

jest.mock('../../../hooks/movies/useGetGenres.ts', () => ({
  useGetGenres: jest.fn(),
}));

const {useGetGenres} = require('../../../hooks/movies/useGetGenres.ts');

describe('HomeScreen', () => {
  it('muestra el indicador de carga al inicio', () => {
    useGetGenres.mockReturnValue({
      loadingGenres: true,
      genres: [],
    });

    render(<HomeScreen />);
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renderiza las categorías después de cargar los datos', () => {
    useGetGenres.mockReturnValue({
      loadingGenres: false,
      genres: [{id: 1, name: 'Action'}],
    });

    render(<HomeScreen />);

    expect(screen.getByText('Action')).toBeTruthy();
  });
});
