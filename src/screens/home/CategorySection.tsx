import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {MovieCard} from './MovieCard';

interface CategorySectionProps {
  genre: string;
  movies: Array<{
    id: number;
    name: string;
    poster_path: string;
    vote_average: number;
  }>;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  genre,
  movies,
}) => {
  return (
    <Container>
      <Title>{genre}</Title>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  margin: 16px 0;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-left: 16px;
  margin-bottom: 8px;
`;
