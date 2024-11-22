import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {MovieCard} from './MovieCard';
import {Genre, Movie} from '@/types/tmdb';
import {PlaceholderMovieCard} from './PlaceholderMovieCard';
import {useMoviesByGenre} from '../../../hooks/movies/useGetMoviesByGenre';

interface CategorySectionProps {
  genre: Genre;
  onClickItem?: (movie: Movie) => void;
  isVisible: boolean;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  genre,
  onClickItem,
  isVisible,
}) => {
  const {movies, loading, loadMoreMovies, fetchMovies} = useMoviesByGenre(
    genre.id,
  );

  useEffect(() => {
    if (isVisible && movies === null && !loading) {
      fetchMovies(1);
    }
  }, [isVisible]);

  const renderItem = ({item}: {item: Movie | null}) => {
    if (item) {
      return <MovieCard movie={item} onPress={onClickItem} />;
    } else {
      return <PlaceholderMovieCard />;
    }
  };

  const data =
    movies !== null && movies.length > 0 ? movies : [null, null, null];

  return (
    <Container>
      <Title>{genre.name}</Title>
      <FlatList
        testID={`flatlist-category-${genre.name}`}
        horizontal
        data={data}
        keyExtractor={(item, index) =>
          `${index} - ${item?.id || 'placeholder'}`
        }
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onEndReached={() => {
          if (!loading && movies !== null && movies.length > 0) {
            loadMoreMovies();
          }
        }}
        onEndReachedThreshold={0.5}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        ListFooterComponent={
          loading ? (
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
