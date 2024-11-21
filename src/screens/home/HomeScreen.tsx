import React from 'react';
import {ScrollView, ActivityIndicator, View} from 'react-native';
import styled from 'styled-components/native';
import {CategorySection} from './CategorySection';
import {useMoviesData} from '../../hooks/movies/useMoviesByCategories.ts';
import {Header} from '../../components/Header/Header.tsx';

export const HomeScreen = (): React.ReactElement => {
  const {loading, categories} = useMoviesData();

  if (loading) {
    return (
      <View>
        <Header title="Movie App" subtitle="Find your favorite movies!" />
        <LoadingContainer testID="loading-indicator">
          <ActivityIndicator size="large" color="#0000ff" />
        </LoadingContainer>
      </View>
    );
  }

  return (
    <ScrollView>
      <Header title="Movie App" subtitle="Find your favorite movies!" />
      {categories.map(category => (
        <CategorySection
          key={category.id}
          genre={category.name}
          movies={category.movies}
        />
      ))}
    </ScrollView>
  );
};

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
