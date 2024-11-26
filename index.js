/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppProvider from './src/AppProvider';
import App from './src/App';

const selectedProviders = ['DarkModeProvider', 'GenreProvider', 'ScrollPositionProvider'];

const RootApp = () => {
  return (
    <AppProvider providers={selectedProviders}>
      <App />
    </AppProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppProvider({children: <RootApp/>}));
