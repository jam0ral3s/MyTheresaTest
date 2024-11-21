import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

interface MovieCardProps {
  movie: {
    id: number;
    name: string;
    poster_path: string;
    vote_average: number;
  };
  onPress?: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({movie, onPress}) => {
  return (
    <CardContainer>
      <TouchableOpacity onPress={onPress} accessible accessibilityRole="button">
        <MoviePoster
          accessibilityRole="image"
          accessible
          source={{
            uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
          }}
        />
        <MovieTitle>{movie.name}</MovieTitle>
        <MovieRating>{`⭐ ${movie.vote_average}`}</MovieRating>
      </TouchableOpacity>
    </CardContainer>
  );
};

const CardContainer = styled.View`
  margin: 0 8px;
`;

const MoviePoster = styled.Image`
  width: 120px;
  height: 180px;
  border-radius: 8px;
`;

const MovieTitle = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

const MovieRating = styled.Text`
  font-size: 12px;
  color: #888;
  text-align: center;
`;
