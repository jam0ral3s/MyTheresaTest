import React from 'react';
import styled from 'styled-components/native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({title, onPress}) => (
  <StyledButton onPress={onPress}>
    <StyledButtonText>{title}</StyledButtonText>
  </StyledButton>
);

import {TouchableOpacity, Text} from 'react-native';

export const StyledButton = styled(TouchableOpacity)`
  background-color: #ff0000;
  padding: ${props => props.theme.size.spacing.xs}px;
  border-radius: ${props => props.theme.size.spacing.xs}px;
  align-items: center;
  justify-content: center;
`;

export const StyledButtonText = styled(Text)`
  font-size: ${props => props.theme.font.regular16.fontSize}px;
  color: ${props => props.theme.color.basic.bold};
`;
