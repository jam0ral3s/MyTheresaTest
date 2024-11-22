import React from 'react';
import {ScrollView} from 'react-native';

import styled from 'styled-components/native';
import {Header} from '../../components/Header/Header';
import {Movie} from '@/types/tmdb';
import {Navigate} from '../navigation/navigationTypes';
import {CustomButton} from '../../components/Button/Button';

export const DetailScreen = ({
  navigate,
  params,
}: {
  navigate: Navigate;
  params?: {movie: Movie};
}): React.JSX.Element => {
  if (params == null) {
    params;
  }

  const {movie} = params!!;

  return (
    <ScrollView style={{width: '100%'}}>
      <Container>
        <Header title={movie.title} />
        <MainContent>
          <ImageArea>
            <Poster
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
            />
          </ImageArea>
          <DescriptionArea>
            <Overview>{movie.overview || 'No description available.'}</Overview>
          </DescriptionArea>
        </MainContent>

        <AdditionalInfo>
          <InfoText>{`⭐ Rating: ${movie.vote_average}`}</InfoText>
          <InfoText>{`Release Date: ${movie.release_date}`}</InfoText>
        </AdditionalInfo>
        <CustomButton
          title="Go To Home"
          onPress={() => {
            navigate('Home');
          }}
        />
      </Container>
    </ScrollView>
  );
};

const Container = styled.View`
  padding: 16px;
  flex: 1;
  width: 100%;
  background-color: #f0f020;
`;

const MainContent = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const ImageArea = styled.View`
  flex: 1;
  max-width: 40%;
  margin-bottom: 16px;
`;

const Poster = styled.Image`
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 3;
  border-radius: 8px;
`;

const DescriptionArea = styled.View`
  flex: 2;
  max-width: 60%;
  margin-left: 16px;
  margin-bottom: 16px;
`;

const Overview = styled.Text`
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 20px;
`;

const AdditionalInfo = styled.View`
  margin-top: 16px;
`;

const InfoText = styled.Text`
  font-size: 14px;
  margin-bottom: 4px;
`;
