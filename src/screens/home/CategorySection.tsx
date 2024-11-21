import React from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {MovieCard} from './MovieCard';
import {Movie} from '@/types/tmdb';

interface CategorySectionProps {
  genre: string;
  movies: Array<Movie>;
  isLoading: boolean;
  loadMore?: () => Promise<void>;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  genre,
  movies,
  isLoading,
  loadMore,
}) => {
  return (
    <Container>
      <Title>{genre}</Title>
      <FlatList
        testID={`flatlist-category-${genre}`}
        horizontal
        data={movies}
        keyExtractor={(item, index) => `${index} - ${item.id}`}
        renderItem={({item}) => <MovieCard movie={item} />}
        showsHorizontalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        ListFooterComponent={
          isLoading ? (
            <FooterContainer>
              <ActivityIndicator size="large" color="#0000ff" />
            </FooterContainer>
          ) : null
        }
      />
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

const FooterContainer = styled.View`
  padding: 16px;
  justify-content: center;
  align-items: center;
`;
