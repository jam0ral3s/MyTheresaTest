import React from 'react';
import {testRender} from '../../../../utils/testUtils';
import {fireEvent} from '@testing-library/react-native';
import {FavoriteButton} from '../FavoriteButton';
import {Movie} from '../../../../types/tmdbType';

jest.mock('../../../../hooks/useFavorites.ts', () => ({
  useFavorites: jest.fn(),
}));

const {useFavorites} = require('../../../../hooks/useFavorites.ts');

describe('FavoriteButton component', () => {
  it('renders "Add to Favorites" when the item is not a favorite', () => {
    const mockMovie: Movie = {
      id: 1,
      title: 'Title',
      poster_path: '',
      vote_average: 10,
      overview: 'overview',
      release_date: '',
    };

    useFavorites.mockReturnValue({
      favorites: [],
      isLoading: false,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(() => false),
    });

    const {getByText} = testRender(<FavoriteButton item={mockMovie} />);
    expect(getByText('Add to Favorites')).toBeTruthy();
  });
  it('calls addFavorite when the button is pressed and the item is not a favorite', () => {
    const mockMovie: Movie = {
      id: 1,
      title: 'Title',
      poster_path: '',
      vote_average: 10,
      overview: 'overview',
      release_date: '',
    };

    const addToFavorite = jest.fn();
    const removeFromFavorite = jest.fn();

    useFavorites.mockReturnValue({
      favorites: [],
      isLoading: false,
      addFavorite: addToFavorite,
      removeFavorite: removeFromFavorite,
      isFavorite: jest.fn(() => false),
    });

    const {getByRole} = testRender(<FavoriteButton item={mockMovie} />);
    fireEvent.press(getByRole('button'));
    expect(removeFromFavorite).not.toHaveBeenCalled();
    expect(addToFavorite).toHaveBeenCalledTimes(1);
  });
  it('renders "Remove from Favorites" when the item is a favorite', () => {
    const mockMovie: Movie = {
      id: 1,
      title: 'Title',
      poster_path: '',
      vote_average: 10,
      overview: 'overview',
      release_date: '',
    };

    useFavorites.mockReturnValue({
      favorites: [],
      isLoading: false,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(() => true),
    });

    const {getByText} = testRender(<FavoriteButton item={mockMovie} />);
    expect(getByText('Remove from Favorites')).toBeTruthy();
  });

  it('calls removeFavorite when the button is pressed and the item is a favorite', () => {
    const mockMovie: Movie = {
      id: 1,
      title: 'Title',
      poster_path: '',
      vote_average: 10,
      overview: 'overview',
      release_date: '',
    };

    const addToFavorite = jest.fn();
    const removeFromFavorite = jest.fn();

    useFavorites.mockReturnValue({
      favorites: [],
      isLoading: false,
      addFavorite: addToFavorite,
      removeFavorite: removeFromFavorite,
      isFavorite: jest.fn(() => true),
    });

    const {getByRole} = testRender(<FavoriteButton item={mockMovie} />);
    fireEvent.press(getByRole('button'));
    expect(addToFavorite).not.toHaveBeenCalled();
    expect(removeFromFavorite).toHaveBeenCalledTimes(1);
  });

  it('Check the color is setting properly', () => {
    const mockMovie: Movie = {
      id: 1,
      title: 'Title',
      poster_path: '',
      vote_average: 10,
      overview: 'overview',
      release_date: '',
    };

    useFavorites.mockReturnValue({
      favorites: [],
      isLoading: false,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(() => true),
    });

    const {getByRole} = testRender(
      <FavoriteButton item={mockMovie} color="#ffffff" />,
    );
    const element = getByRole('button');
    const style = element.props.style;

    expect(style.color).toBe('#ffffff');
  });
});
