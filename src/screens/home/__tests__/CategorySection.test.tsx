import React from 'react';
import {fireEvent, waitFor} from '@testing-library/react-native';
import {CategorySection} from '../components/CategorySection';
import {Genre} from '../../../types/tmdbType';
import {testRender} from '../../../utils/testUtils';

jest.mock('../../../hooks/useGetMoviesByGenre.ts', () => ({
  useMoviesByGenre: jest.fn(),
}));

const {useMoviesByGenre} = require('../../../hooks/useGetMoviesByGenre.ts');

describe('CategorySection', () => {
  it('correctly renders title and movies', () => {
    const mockGenre: Genre = {
      id: 1,
      name: 'Action',
    };

    useMoviesByGenre.mockReturnValue({
      movies: [
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
      loading: false,
      loadMoreMovies: jest.fn(),
      fetchMovies: jest.fn(),
    });

    const {getByText} = testRender(
      <CategorySection genre={mockGenre} isVisible={true} />,
    );
    expect(getByText('Action')).toBeTruthy();
    expect(getByText('Movie 1')).toBeTruthy();
    expect(getByText('Movie 2')).toBeTruthy();
  });

  it('loadMoreMovies when reach end of the list', async () => {
    const mockLoadMoreMovies = jest.fn();
    const mockGenre: Genre = {
      id: 1,
      name: 'Action',
    };

    useMoviesByGenre.mockReturnValue({
      movies: [
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
      loading: false,
      loadMoreMovies: mockLoadMoreMovies,
      fetchMovies: jest.fn(),
    });

    const {getByTestId} = testRender(
      <CategorySection genre={mockGenre} isVisible={true} />,
    );
    const flatList = getByTestId('flatlist-category-Action');

    fireEvent(flatList, 'onEndReached');
    await waitFor(() => expect(mockLoadMoreMovies).toHaveBeenCalledTimes(1));
  });
});
