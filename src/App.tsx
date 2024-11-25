import React from 'react';
import styled from 'styled-components/native';
import {StatusBar} from 'react-native';

import {ThemeProvider} from 'styled-components/native';
import {LIGHT_THEME, DARK_THEME, CustomTheme} from './styles/theme';
import {HomeScreen} from './screens/home/HomeScreen';
import {DetailScreen} from './screens/detail/DetailScreen';
import {StackNavigator} from './screens/navigation/StackNavigator';
import {FavoriteScreen} from './screens/favorite/FavoriteScreen';
import {DarkModeProvider, useDarkMode} from './service/DarkModeProvider';

const App = (): React.JSX.Element => {
  const {isDarkMode} = useDarkMode();
  const theme = isDarkMode ? LIGHT_THEME : DARK_THEME;

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <StatusBar
          barStyle={theme === DARK_THEME ? 'light-content' : 'dark-content'}
          backgroundColor={theme.color.basic.background}
        />
        <StackNavigator
          screens={{
            Home: HomeScreen,
            Detail: DetailScreen,
            Favorite: FavoriteScreen,
          }}
          initialRoute="Home"
        />
      </SafeAreaView>
    </ThemeProvider>
  );
};

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.color.basic.background};
`;

export default App;
