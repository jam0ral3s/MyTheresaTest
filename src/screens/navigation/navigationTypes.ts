import {Movie} from '@/types/tmdb';

export type Screen = 'Home' | 'Detail';
export type NavigateActions = 'back';
export type NavigateRoutes = Screen | NavigateActions;

export type RouteParams = {
  Home: undefined;
  Detail: {movie: Movie};
  back: undefined;
};

export type Navigate = <T extends NavigateRoutes>(
  route: T,
  params?: RouteParams[T],
) => void;

export type paramsType =
  | RouteParams['Home']
  | RouteParams['Detail']
  | RouteParams['back'];
