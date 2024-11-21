export const fetchGenres = async () => {
  return [
    {id: 28, name: 'Action'},
    {id: 12, name: 'Adventure'},
    {id: 16, name: 'Animation'},
    {id: 35, name: 'Comedy'},
  ];
};

export const fetchMoviesByGenre = async (genreId: number) => {
  return [
    {
      id: genreId + 1,
      name: 'Mock Movie 1',
      poster_path: '/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
      vote_average: 8.4,
    },
    {
      id: genreId + 2,
      name: 'Mock Movie 2',
      poster_path: '/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
      vote_average: 7.2,
    },
  ];
};
