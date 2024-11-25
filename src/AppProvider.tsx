import React from 'react';
import App from './App';
import {DarkModeProvider} from './service/DarkModeProvider';
import {GenreProvider} from './service/GenreProvider';
import {ScrollPositionProvider} from './service/ScrollPositionProvider';

const AppProvider = (): React.JSX.Element => {
  return (
    <DarkModeProvider>
      <GenreProvider>
        <ScrollPositionProvider>
          <App />
        </ScrollPositionProvider>
      </GenreProvider>
    </DarkModeProvider>
  );
};

export default AppProvider;
