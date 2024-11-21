import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {MovieCard} from '../MovieCard';

describe('MovieCard', () => {
  const mockMovie = {
    id: 1,
    name: 'Mock Movie',
    poster_path: '/mock.jpg',
    vote_average: 8.5,
  };

  it('show all data correctly', () => {
    const {getByText, getByRole} = render(<MovieCard movie={mockMovie} />);

    expect(getByText('Mock Movie')).toBeTruthy();
    expect(getByText('⭐ 8.5')).toBeTruthy();

    const image = getByRole('image');
    expect(image.props.source.uri).toContain('/mock.jpg');
  });

  it('check if interaction of movieCard is correct', () => {
    const onPressMock = jest.fn();

    const {getByRole} = render(
      <MovieCard movie={mockMovie} onPress={onPressMock} />,
    );

    const touchable = getByRole('button');
    fireEvent.press(touchable);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
