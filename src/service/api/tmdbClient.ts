import axios from 'axios';
import {TMDB_API_KEY, TMDB_BASE_URL} from '@env';

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

import {Genre, Movie} from '../../types/tmdb';

export const fetchGenres = async (): Promise<Genre[]> => {
  const response = await tmdbClient.get('/genre/movie/list');
  return response.data.genres;
};

export const fetchMoviesByGenre = async (
  genreId: number,
  page: number = 1,
): Promise<Movie[]> => {
  const response = await tmdbClient.get('/discover/movie', {
    params: {with_genres: genreId, page: page},
  });
  return response.data.results;
};

export default tmdbClient;
