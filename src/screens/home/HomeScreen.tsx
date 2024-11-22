import React, {useEffect, useRef, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';
import {useGetGenres} from '../../hooks/movies/useGetGenres.ts';
import {CategorySection} from './components/CategorySection.tsx';
import {Header} from '../../components/Header.tsx';
import {Navigate} from '../navigation/navigationTypes.ts';
import {Genre} from '../../types/tmdb.ts';
import {usePersistentState} from '../../hooks/usePersistentState.ts';

export const HomeScreen = ({
  navigate,
}: {
  navigate?: Navigate;
}): React.JSX.Element => {
  const flatListRef = useRef<FlatList>(null);
  const [scrollPosition, setScrollPosition] = usePersistentState<number>(
    'HomeScrollPosition',
    0,
  );
  const [flatListRendered, setFlatListRendered] = useState<boolean>(false);

  const {loadingGenres, genres} = useGetGenres();
  const [visibleGenreIds, setVisibleGenreIds] = useState<number[]>([]);

  useEffect(() => {
    if (
      !loadingGenres &&
      genres.length > 0 &&
      scrollPosition > 0 &&
      flatListRendered
    ) {
      flatListRef.current?.scrollToOffset({
        offset: scrollPosition,
        animated: false,
      });
    }
  }, [loadingGenres, genres, flatListRendered]);

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<{item: Genre}>}) => {
      const ids = viewableItems.map(({item}) => item.id);
      setVisibleGenreIds(ids);
    },
  ).current;

  if (loadingGenres) {
    return (
      <View>
        <Header
          title="Welcome to Movie App"
          subtitle="Find your favorite movies here!"
        />
        <ActivityIndicator
          size="large"
          color="#0000ff"
          testID="loading-indicator"
        />
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={genres}
      keyExtractor={item => `${item.id}`}
      renderItem={({item}) => (
        <CategorySection
          genre={item}
          onClickItem={movie => navigate?.('Detail', {movie})}
          isVisible={visibleGenreIds.includes(item.id)}
        />
      )}
      onScrollEndDrag={event => {
        setScrollPosition(event.nativeEvent.contentOffset.y);
      }}
      scrollEventThrottle={20}
      contentContainerStyle={{paddingBottom: 16}}
      onLayout={() => setFlatListRendered(true)}
      ListHeaderComponent={
        <Header
          title="Welcome to Movie App"
          subtitle="Find your favorite movies here!"
        />
      }
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{itemVisiblePercentThreshold: 50}}
    />
  );
};
