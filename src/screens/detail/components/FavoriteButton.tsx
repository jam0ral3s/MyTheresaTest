import React from 'react';
import styled from 'styled-components/native';
import {useFavorites} from '../../../hooks/useFavorites.ts';
import {Movie} from '../../../types/tmdbType.ts';

interface FavoriteButtonProps {
  item: Movie;
  color?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  item,
  color = '#8c1025',
}) => {
  const {isFavorite, addFavorite, removeFavorite} = useFavorites();

  const handlePress = () => {
    if (isFavorite(item)) {
      removeFavorite(item);
    } else {
      addFavorite(item);
    }
  };

  return (
    <Container>
      <Button onPress={handlePress} color={color}>
        <ButtonText>
          {isFavorite(item) ? 'Remove from Favorites' : 'Add to Favorites'}
        </ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  flex: 1;
  align-items: center;
  margin-top: 20px;
`;

const Button = styled.TouchableOpacity<{color: string}>`
  background-color: ${({color}) => color};
  padding: 15px 40px;
  align-self: center;
  border-radius: 24px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;
