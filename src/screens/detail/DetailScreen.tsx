import React, {useState} from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components/native';
import {Header} from '../../components/Header';
import {Navigate} from '../navigation/navigationTypes';

import {FavoriteButton} from './components/FavoriteButton';
import {BackTopBar} from './../../components/BackTopBar';
import {DetailScreenParams, DetailStyle} from './detailScreenType';
import {BASIC_FONTS, FontDetails, FontTheme} from '../../styles/font';

export const DetailScreen = ({
  navigate,
  params,
}: {
  navigate: Navigate;
  params?: DetailScreenParams;
}): React.JSX.Element => {
  if (params == null) {
    params;
  }

  const {movie, style} = params!!;
  const screenHeight = Dimensions.get('window').height;
  const [isScrollable, setIsScrollable] = useState(false);
  const handleContentSizeChange = (_: number, contentHeight: number) => {
    setIsScrollable(contentHeight > screenHeight);
  };

  const formattedRating =
    typeof movie.vote_average === 'number'
      ? `⭐ ${movie.vote_average.toFixed(1)}`
      : null;

  return (
    <ScreenContainer>
      <BackTopBar onBackPress={() => navigate?.('back')} />
      <ScrollView
        scrollEnabled={isScrollable}
        onContentSizeChange={handleContentSizeChange}>
        <Header title={movie.title} />
        <Container>
          <MainContent>
            <ImageArea>
              <Poster
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
              />
            </ImageArea>
            <DescriptionArea>
              <Overview style={style || DetailStyle.FIRST}>
                {movie.overview || 'No description available.'}
              </Overview>
            </DescriptionArea>
          </MainContent>
          <AdditionalInfo>
            <InfoText>{`${formattedRating}`}</InfoText>
            <InfoText>{`Release Date: ${movie.release_date}`}</InfoText>
          </AdditionalInfo>
          <FavoriteButton item={movie} color={getFavoriteColor(style)} />
        </Container>
      </ScrollView>
    </ScreenContainer>
  );
};

const getFavoriteColor = (style: DetailStyle = DetailStyle.FIRST): string => {
  let color = '#8c1025';
  if (style == DetailStyle.SECOND) {
    color = '#10258c';
  } else if (style == DetailStyle.THIRD) {
    color = '#ffc107';
  }

  return color;
};

const getFontFamily = (style: DetailStyle = DetailStyle.FIRST): FontDetails => {
  let font = BASIC_FONTS.regular16;
  if (style == DetailStyle.SECOND) {
    font = BASIC_FONTS.serif18;
  } else if (style == DetailStyle.THIRD) {
    font = BASIC_FONTS.monospace16;
  }

  return font;
};

const ScreenContainer = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
  padding-start: ${props => props.theme.size.spacing.l}px;
  padding-end: ${props => props.theme.size.spacing.l}px;
  background-color: ${props => props.theme.color.basic.background};
`;

const Container = styled.View`
  padding: ${props => props.theme.size.spacing.l}px;
  background-color: ${props => props.theme.color.basic.foreground};
  border-radius: 8px;
  margin-bottom: 80px;
`;

const Overview = styled.Text<{style: DetailStyle}>`
  line-height: ${props => props.theme.font.regular16.lineHeight}px;
  color: ${props => props.theme.color.basic.text};
  font-family: ${({style}) => getFontFamily(style).fontFamily};
  font-size: ${({style}) => {
    return getFontFamily(style).fontSize;
  }}px;
`;

const InfoText = styled.Text`
  font-size: ${props => props.theme.font.regular16.fontSize}px;
  margin-bottom: 4px;
  color: ${props => props.theme.color.basic.text};
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

const AdditionalInfo = styled.View`
  margin-top: 16px;
`;
