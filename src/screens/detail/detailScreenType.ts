import {Movie} from '../../types/tmdbType';

export enum DetailStyle {
  FIRST,
  SECOND,
  THIRD,
}

export type DetailScreenType = {
  movie: Movie;
  style: DetailStyle;
};
