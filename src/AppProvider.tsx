import React, {ReactNode} from 'react';
import {DarkModeProvider} from './service/DarkModeProvider';
import {GenreProvider} from './service/GenreProvider';
import {ScrollPositionProvider} from './service/ScrollPositionProvider';

const providers = {
  DarkModeProvider,
  GenreProvider,
  ScrollPositionProvider,
};

type ProviderProps = {
  providers: Array<keyof typeof providers>;
  children: ReactNode;
};

const AppProvider = ({
  providers: selectedProviders,
  children,
}: ProviderProps): React.JSX.Element => {
  return selectedProviders.reduceRight((acc, providerName) => {
    const Provider = providers[providerName];
    return <Provider>{acc}</Provider>;
  }, children as React.ReactElement);
};

export default AppProvider;
