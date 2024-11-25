import {Movie} from '@/types/tmdbType';

export type Screen = 'Home' | 'Detail' | 'Favorite';
export type NavigateActions = 'back';
export type NavigateRoutes = Screen | NavigateActions;

export type RouteParams = {
  Home: undefined;
  Detail: {movie: Movie};
  Favorite: undefined;
  back: undefined;
};

export type Navigate = <T extends NavigateRoutes>(
  route: T,
  params?: RouteParams[T],
) => void;

export type paramsType =
  | RouteParams['Home']
  | RouteParams['Detail']
  | RouteParams['Favorite']
  | RouteParams['back'];
