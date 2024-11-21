import React from 'react';
import {render} from '@testing-library/react-native';
import {CategorySection} from '../CategorySection';
import {Movie} from '@/types/tmdb';

describe('CategorySection', () => {
  const mockMovies: Movie[] = [
    {
      id: 1,
      title: 'Movie 1',
      poster_path: '/mock1.jpg',
      vote_average: 8.0,
      overview: '',
      release_date: '',
    },
    {
      id: 2,
      title: 'Movie 2',
      poster_path: '/mock2.jpg',
      vote_average: 7.5,
      overview: '',
      release_date: '',
    },
  ];

  it('correctly renders title and movies', () => {
    const {getByText} = render(
      <CategorySection genre="Action" movies={mockMovies} isLoading={false} />,
    );
    expect(getByText('Action')).toBeTruthy();

    expect(getByText('Movie 1')).toBeTruthy();
    expect(getByText('Movie 2')).toBeTruthy();
  });
});
