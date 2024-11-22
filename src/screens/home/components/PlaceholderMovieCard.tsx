import React from 'react';
import styled from 'styled-components/native';

export const PlaceholderMovieCard: React.FC = () => {
  return (
    <CardContainer>
      <MoviePosterPlaceholder />
      <MovieDetails>
        <MovieTitlePlaceholder />
        <MovieRatingPlaceholder />
      </MovieDetails>
    </CardContainer>
  );
};

const CardContainer = styled.View`
  margin: 0 8px;
  align-items: center;
  justify-content: space-between;
  width: 120px;
`;

const MoviePosterPlaceholder = styled.View`
  width: 120px;
  height: 180px;
  border-radius: 8px;
  background-color: #ccc;
`;

const MovieDetails = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 2px;
`;

const MovieTitlePlaceholder = styled.View`
  margin-top: 8px;
  width: 100px;
  height: 14px;
  border-radius: 4px;
  background-color: #ccc;
`;

const MovieRatingPlaceholder = styled.View`
  margin-top: 4px;
  width: 50px;
  height: 12px;
  border-radius: 4px;
  background-color: #ccc;
`;
