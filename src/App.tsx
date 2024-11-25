import React from 'react';
import styled from 'styled-components/native';
import {StatusBar, useColorScheme} from 'react-native';

import {ThemeProvider} from 'styled-components/native';
import {BAISC_THEME} from './styles/theme';
import {HomeScreen} from './screens/home/HomeScreen';
import {DetailScreen} from './screens/detail/DetailScreen';
import {StackNavigator} from './screens/navigation/StackNavigator';
import {PersistentStateProvider} from './service/PersistentStateContext';
import {FavoriteScreen} from './screens/favorite/FavoriteScreen';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#ececec' : '#ececec',
  };

  return (
    <PersistentStateProvider>
      <ThemeProvider theme={BAISC_THEME}>
        <SafeAreaView
          style={{backgroundColor: backgroundStyle.backgroundColor}}>
          <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
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
    </PersistentStateProvider>
  );
};

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export default App;
