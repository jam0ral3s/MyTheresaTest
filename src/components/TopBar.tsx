import React, {useState} from 'react';
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
  const [backImageStatusError, setBackImageStatusError] = useState(false);
  const [imageStatus, setImageStatus] = useState(
    topbarActions.map(() => ({loading: true, error: false})),
  );

  const handleImageLoad = (index: number) => {
    setImageStatus(prev =>
      prev.map((status, i) =>
        i === index ? {...status, loading: false} : status,
      ),
    );
  };

  const handleImageError = (index: number) => {
    setImageStatus(prev =>
      prev.map((status, i) =>
        i === index ? {loading: false, error: true} : status,
      ),
    );
  };

  return (
    <Container>
      {showBackButton ? (
        <BackButton onPress={onBackPress}>
          {backImageStatusError ? (
            <Text>Back</Text>
          ) : (
            <StyledImage
              source={Images.back}
              onError={() => setBackImageStatusError(true)}
              accessibilityLabel={'Back'}
              resizeMode="contain"
            />
          )}
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
                <>
                  {imageStatus[index].error ? (
                    <Text>{item.text}</Text>
                  ) : (
                    <StyledImage
                      source={item.icon}
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageError(index)}
                      accessibilityLabel={item.text}
                      resizeMode="contain"
                    />
                  )}
                </>
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

const Text = styled.Text`
  color: ${props => props.theme.color.basic.text};
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
