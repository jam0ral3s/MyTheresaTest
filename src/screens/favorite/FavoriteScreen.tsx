import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {getFavorites} from '../../storage/favoritesStorage';
import {Movie} from '../../types/tmdbType';
import {Navigate} from '../navigation/navigationTypes';
import {BackTopBar} from './../../components/BackTopBar';
import {Header} from './../../components/Header';

export const FavoriteScreen = ({
  navigate,
}: {
  navigate: Navigate;
}): React.JSX.Element => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favs = await getFavorites();
      setFavorites(favs);
    };
    fetchFavorites();
  }, []);

  const renderItem = ({item}: {item: Movie}) => (
    <TouchableContent onPress={() => navigate('Detail', {movie: item})}>
      <CardContainer>
        <Poster
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
        />
        <InfoContainer>
          <Title>{item.title}</Title>
          <Rating>{`⭐ ${item.vote_average}`}</Rating>
        </InfoContainer>
      </CardContainer>
    </TouchableContent>
  );

  return (
    <Container>
      <BackTopBar onBackPress={() => navigate?.('back')} />
      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyText>No favorite movies.</EmptyText>}
        ListHeaderComponent={<Header title="Your Favorites Movies" />}
      />
    </Container>
  );
};

const TouchableContent = styled.TouchableOpacity`
  padding: 6px;
`;
const Container = styled.View`
  flex: 1;
`;

const CardContainer = styled.View`
  flex-direction: row;
  padding: 10px 10px;
  align-items: center;

  background-color: white;

  border-radius: 8px;
`;

const Poster = styled.Image`
  width: 80px;
  height: 120px;
  aspect-ratio: 2 / 3;
  border-radius: 8px;
`;

const InfoContainer = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Rating = styled.Text`
  font-size: 16px;
  color: #757575;
`;

const EmptyText = styled.Text`
  text-align: center;
  margin-top: 50%;
  font-size: 22px;
  color: #757575;
`;
