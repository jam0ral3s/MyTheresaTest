import {Movie} from '@/types/tmdb';

export type Screen = 'Home' | 'Detail';

export type ScreenParams = {
  Home: undefined;
  Detail: {movie: Movie};
};

export type Navigate = <T extends Screen>(
  screen: T,
  params?: ScreenParams[T],
) => void;
