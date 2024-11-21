import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import styled from 'styled-components/native';
import {CategorySection} from './CategorySection';
import {useMoviesData} from '../../hooks/movies/useMoviesByCategories.ts';
import {Header} from '../../components/Header/Header.tsx';

export const HomeScreen: React.FC = () => {
  const {
    loadingGenres,
    genres,
    moviesByGenre,
    loadMoreMoviesByGenre,
    loadingByGenre,
  } = useMoviesData();

  if (loadingGenres) {
    return (
      <View>
        <Header
          title="Welcome to Movie App"
          subtitle="Find your favorite movies here!"
        />
        <LoadingContainer>
          <ActivityIndicator
            testID="loading-indicator"
            size="large"
            color="#0000ff"
          />
        </LoadingContainer>
      </View>
    );
  }

  return (
    <FlatList
      data={genres}
      keyExtractor={item => `${item.id}`}
      renderItem={({item}) => (
        <CategorySection
          genre={item.name}
          movies={moviesByGenre[item.id] || []}
          isLoading={loadingByGenre[item.id]}
          loadMore={() => loadMoreMoviesByGenre(item.id)}
        />
      )}
      contentContainerStyle={{paddingBottom: 16}}
      ListHeaderComponent={
        <Header
          title="Welcome to Movie App"
          subtitle="Find your favorite movies here!"
        />
      }
      ListFooterComponentStyle={
        loadingGenres && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{marginVertical: 16}}
          />
        )
      }
    />
  );
};

// Estilos
const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
