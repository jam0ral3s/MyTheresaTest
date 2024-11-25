import React, {useEffect, useRef, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';
import {useGetGenres} from '../../hooks/useGetGenres.ts';
import {CategorySection} from './components/CategorySection';
import {Header} from '../../components/Header';
import {Navigate} from '../navigation/navigationTypes.ts';
import {Genre} from '../../types/tmdbType.ts';
import {usePersistentState} from '../../hooks/usePersistentState.ts';
import {HomeTopBar} from './components/HomeTopBar';
import {DetailStyle} from '../detail/detailScreenType.ts';

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
        <HomeTopBar />
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

  const enumStyles = Object.keys(DetailStyle).filter(v => isNaN(Number(v)));
  return (
    <View>
      <HomeTopBar navigate={navigate} />
      <FlatList
        style={{backgroundColor: '#ECECEC'}}
        ref={flatListRef}
        data={genres}
        keyExtractor={item => `${item.id}`}
        renderItem={({item, index}) => {
          const styleString = enumStyles[
            index % enumStyles.length
          ] as keyof typeof DetailStyle;
          return (
            <CategorySection
              genre={item}
              onClickItem={movie =>
                navigate?.('Detail', {
                  movie: movie,
                  style: DetailStyle[styleString],
                })
              }
              isVisible={visibleGenreIds.includes(item.id)}
            />
          );
        }}
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
    </View>
  );
};
