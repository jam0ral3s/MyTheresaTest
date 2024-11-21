import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ThemeProvider} from 'styled-components/native';
import {BAISC_THEME} from './styles/theme';
import {HomeScreen} from './screens/home/HomeScreen';
import {DetailScreen} from './screens/detail/DetailScreen';
import {StackNavigator} from './screens/navigation/StackNavigator';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ThemeProvider theme={BAISC_THEME}>
      <SafeAreaView style={(styles.safeAreaView, backgroundStyle)}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View style={styles.container}>
            <StackNavigator
              screens={{
                Home: HomeScreen,
                Detail: DetailScreen,
              }}
              initialRoute="Home"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  safeAreaView: {
    flex: 1,
  },
});

export default App;
