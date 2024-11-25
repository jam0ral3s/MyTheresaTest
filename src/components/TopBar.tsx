import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {Images} from '../styles/images';
import {FlatList, ImageSourcePropType} from 'react-native';

type TopbarAction = {
  icon?: ImageSourcePropType;
  text?: string;
  onPress: () => void;
};

type TopbarProps = {
  showBackButton: boolean;
  onBackPress?: () => void;
  topbarActions?: TopbarAction[];
};

export const TopBar = ({
  showBackButton,
  onBackPress,
  topbarActions = [],
}: TopbarProps) => {
  return (
    <Container>
      {showBackButton ? (
        <BackButton onPress={onBackPress}>
          <StyledImage
            source={Images.back}
            accessibilityLabel={'Back'}
            resizeMode="contain"
          />
        </BackButton>
      ) : null}
      <Spacer />
      <ActionsContainer>
        <FlatList
          horizontal={true}
          data={topbarActions}
          renderItem={({item, index}) => (
            <ActionButton key={index} onPress={item.onPress}>
              {item.icon ? (
                <StyledImage
                  source={item.icon}
                  accessibilityLabel={item.text}
                  resizeMode="contain"
                />
              ) : null}
            </ActionButton>
          )}
        />
      </ActionsContainer>
    </Container>
  );
};

const Container = styled.View`
  height: 40px;
  flex-direction: row;
  margin-top: ${Platform.OS === 'ios' ? '0px' : '30px'};
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.color.basic.background};
  padding: 0 10px;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Spacer = styled.View`
  flex: 1;
`;

const ActionsContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ActionButton = styled.TouchableOpacity`
  height: 20px;
  flex-direction: row;
  align-items: flex-end;
  margin-left: 10px;
`;

const StyledImage = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
