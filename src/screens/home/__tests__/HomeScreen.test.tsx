import React from 'react';
import {screen} from '@testing-library/react-native';
import {HomeScreen} from '../HomeScreen';
import AppProvider from '../../../AppProvider';
import {testRender} from '../../../utils/testUtils';

jest.mock('../../../service/GenreProvider.tsx', () => ({
  useGenreContext: jest.fn(),
}));

const {useGenreContext} = require('../../../service/GenreProvider.tsx');

describe('HomeScreen', () => {
  it('muestra el indicador de carga al inicio', () => {
    useGenreContext.mockReturnValue({
      loadingGenres: true,
      genres: [],
    });

    testRender(
      <AppProvider
        providers={['ScrollPositionProvider', 'DarkModeProvider']}
        children={<HomeScreen />}
      />,
    );
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renderiza las categorías después de cargar los datos', () => {
    useGenreContext.mockReturnValue({
      loadingGenres: false,
      genres: [{id: 1, name: 'Action'}],
    });

    testRender(
      <AppProvider
        providers={['ScrollPositionProvider', 'DarkModeProvider']}
        children={<HomeScreen />}
      />,
    );

    expect(screen.getByText('Action')).toBeTruthy();
  });
});
