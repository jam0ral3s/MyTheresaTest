import React from 'react';
import styled from 'styled-components/native';
import {useFavorites} from '../../../hooks/useFavorites.ts';
import {Movie} from '@/types/tmdb.ts';

interface FavoriteButtonProps {
  item: Movie;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({item}) => {
  const {isFavorite, addFavorite, removeFavorite} = useFavorites();

  const handlePress = () => {
    if (isFavorite(item)) {
      removeFavorite(item);
    } else {
      addFavorite(item);
    }
  };

  return (
    <Button onPress={handlePress}>
      <ButtonText>
        {isFavorite(item) ? 'Remove from Favorites' : 'Add to Favorites'}
      </ButtonText>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 10px 20px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
`;
