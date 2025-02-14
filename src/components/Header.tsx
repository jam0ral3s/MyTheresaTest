import React from 'react';
import styled from 'styled-components/native';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({title, subtitle}) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderTitle>{title}</HeaderTitle>
        {subtitle ? <HeaderSubtitle>{subtitle}</HeaderSubtitle> : null}
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  margin-top: 4px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const HeaderContent = styled.View`
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.color.basic.text};
`;

const HeaderSubtitle = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-top: 8px;
  color: ${props => props.theme.color.basic.text};
`;
