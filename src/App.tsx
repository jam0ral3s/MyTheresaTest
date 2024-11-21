import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {ThemeProvider} from 'styled-components/native';
import {BAISC_THEME} from './styles/theme';
import {HomeScreen} from './screens/home/HomeScreen';
import {DetailScreen} from './screens/detail/DetailScreen';
import {StackNavigator} from './screens/navigation/StackNavigator';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  return (
    <ThemeProvider theme={BAISC_THEME}>
      <SafeAreaView style={[styles.safeAreaView, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <StackNavigator
          screens={{
            Home: HomeScreen,
            Detail: DetailScreen,
          }}
          initialRoute="Home"
        />
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export default App;
