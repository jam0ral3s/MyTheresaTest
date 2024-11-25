export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
};

export type MovieData = {
  movies: Movie[];
  total_pages: number;
};
