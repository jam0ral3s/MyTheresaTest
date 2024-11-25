import React from 'react';
import styled from 'styled-components/native';
import {TopbarAction} from '../types/topbarActionType';
import {Images} from '../styles/images';

export const TopBar = ({
  showBackButton,
  onBackPress,
  topbarActions = [],
}: {
  showBackButton: boolean;
  onBackPress?: () => void;
  topbarActions?: TopbarAction[];
}) => {
  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={onBackPress}>
          <StyledImage
            source={Images.back}
            accessibilityLabel={'Back'}
            resizeMode="contain"
          />
        </BackButton>
      )}
      <Spacer />
      <ActionsContainer>
        {topbarActions.map((action, index) => (
          <ActionButton key={index} onPress={action.onPress}>
            {action.icon && (
              <StyledImage
                source={action.icon}
                accessibilityLabel={action.text}
                resizeMode="contain"
              />
            )}
          </ActionButton>
        ))}
      </ActionsContainer>
    </Container>
  );
};

const Container = styled.View`
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ececec;
  padding: 0 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ececec;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Spacer = styled.View`
  flex: 1;
`;

const ActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ActionButton = styled.TouchableOpacity`
  height: 20px;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
`;

const StyledImage = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
