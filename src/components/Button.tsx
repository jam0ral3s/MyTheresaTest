import React from 'react';
import {StyledButton, StyledButtonText} from './Button.styles';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({title, onPress}) => (
  <StyledButton onPress={onPress}>
    <StyledButtonText>{title}</StyledButtonText>
  </StyledButton>
);
