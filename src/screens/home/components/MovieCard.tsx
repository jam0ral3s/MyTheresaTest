import {Movie} from '@/types/tmdb';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

interface MovieCardProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({movie, onPress}) => {
  const formattedRating =
    typeof movie.vote_average === 'number'
      ? `⭐ ${movie.vote_average.toFixed(1)}`
      : null;

  return (
    <CardContainer>
      <TouchableOpacity
        onPress={() => onPress?.(movie)}
        accessible
        accessibilityRole="button">
        <MoviePoster
          accessibilityRole="image"
          accessible
          source={{
            uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
          }}
        />
        <MovieDetails>
          <MovieTitle numberOfLines={2} ellipsizeMode="tail">
            {movie.title}
          </MovieTitle>
          {formattedRating && <MovieRating>{formattedRating}</MovieRating>}
        </MovieDetails>
      </TouchableOpacity>
    </CardContainer>
  );
};

const CardContainer = styled.View`
  margin: 0 8px;
  align-items: center;
  justify-content: space-between;
  width: 120px;
`;

const MoviePoster = styled.Image`
  width: 120px;
  height: 180px;
  border-radius: 8px;
`;

const MovieDetails = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 2px;
`;

const MovieTitle = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  line-height: 18px;
  width: 120px;
  font-weight: bold;
  text-align: center;
`;

const MovieRating = styled.Text`
  font-size: 12px;
  color: #888;
  text-align: center;
  margin-top: 4px;
`;
