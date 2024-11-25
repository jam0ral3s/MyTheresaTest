import {Movie} from '../../types/tmdbType';

export enum DetailStyle {
  FIRST,
  SECOND,
  THIRD,
}

export type DetailScreenParams = {
  movie: Movie;
  style?: DetailStyle;
};
