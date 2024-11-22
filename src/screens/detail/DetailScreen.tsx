import React from 'react';
import {ScrollView, View} from 'react-native';

import styled from 'styled-components/native';
import {Header} from '../../components/Header';
import {Movie} from '@/types/tmdb';
import {Navigate} from '../navigation/navigationTypes';
import {CustomButton} from '../../components/Button';
import {TopBar} from '../../components/TopBar';

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
    <View style={{width: '100%'}}>
      <TopBar showBackButton={true} onBackPress={() => navigate?.('back')} />
      <ScrollView style={{width: '100%'}}>
        <Container style={{marginBottom: 80}}>
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
              <Overview>
                {movie.overview || 'No description available.'}
              </Overview>
            </DescriptionArea>
          </MainContent>

          <AdditionalInfo>
            <InfoText>{`⭐ Rating: ${movie.vote_average}`}</InfoText>
            <InfoText>{`Release Date: ${movie.release_date}`}</InfoText>
          </AdditionalInfo>
          <CustomButton
            title="Add to favorites"
            onPress={() => {
              navigate('Home');
            }}
          />
        </Container>
      </ScrollView>
    </View>
  );
};

const Container = styled.View`
  padding-start: 16px;
  padding-end: 16px;
  flex: 1;
  width: 100%;
`;

const MainContent = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
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
