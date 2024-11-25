import React, {useState} from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components/native';
import {Header} from '../../components/Header';
import {Movie} from '@/types/tmdbType.ts';
import {Navigate} from '../navigation/navigationTypes';

import {FavoriteButton} from './components/FavoriteButton';
import {BackTopBar} from './../../components/BackTopBar';

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
  const screenHeight = Dimensions.get('window').height;
  const [isScrollable, setIsScrollable] = useState(false);
  const handleContentSizeChange = (_: number, contentHeight: number) => {
    setIsScrollable(contentHeight > screenHeight);
  };

  return (
    <ScreenContainer>
      <BackTopBar onBackPress={() => navigate?.('back')} />
      <ScrollView
        scrollEnabled={isScrollable}
        onContentSizeChange={handleContentSizeChange}>
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
              <Overview>
                {movie.overview || 'No description available.'}
              </Overview>
            </DescriptionArea>
          </MainContent>
          <AdditionalInfo>
            <InfoText>{`⭐ Rating: ${movie.vote_average}`}</InfoText>
            <InfoText>{`Release Date: ${movie.release_date}`}</InfoText>
          </AdditionalInfo>
          <FavoriteButton item={movie} />
        </Container>
      </ScrollView>
    </ScreenContainer>
  );
};

const ScreenContainer = styled.View`
  width: 100%;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
  padding: 20px;
`;

const Container = styled.View`
  padding-start: 16px;
  padding-end: 16px;
  flex: 1;
  width: 100%;
  justify-content: center;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 80px;
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
