import React from 'react';
import {render} from '@testing-library/react-native';
import {CategorySection} from '../CategorySection';

describe('CategorySection', () => {
  const mockMovies = [
    {id: 1, name: 'Movie 1', poster_path: '/mock1.jpg', vote_average: 8.0},
    {id: 2, name: 'Movie 2', poster_path: '/mock2.jpg', vote_average: 7.5},
  ];

  it('correctly renders title and movies', () => {
    const {getByText} = render(
      <CategorySection genre="Action" movies={mockMovies} />,
    );
    expect(getByText('Action')).toBeTruthy();

    expect(getByText('Movie 1')).toBeTruthy();
    expect(getByText('Movie 2')).toBeTruthy();
  });
});
