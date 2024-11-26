import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import {MovieCard} from '../components/MovieCard';
import {Movie} from '../../../types/tmdbType';
import {testRender} from '../../../utils/testUtils';

describe('MovieCard', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Mock Movie',
    poster_path: '/mock.jpg',
    vote_average: 8.5,
    overview: '',
    release_date: '',
  };

  it('show all data correctly', () => {
    const {getByText, getByRole} = testRender(<MovieCard movie={mockMovie} />);

    expect(getByText('Mock Movie')).toBeTruthy();
    expect(getByText('⭐ 8.5')).toBeTruthy();

    const image = getByRole('image');
    expect(image.props.source.uri).toContain('/mock.jpg');
  });

  it('check if interaction of movieCard is correct', () => {
    const onPressMock = jest.fn();

    const {getByRole} = testRender(
      <MovieCard movie={mockMovie} onPress={onPressMock} />,
    );

    const touchable = getByRole('button');
    fireEvent.press(touchable);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
