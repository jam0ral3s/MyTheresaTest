import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Screen, ScreenParams, Navigate} from './navigationTypes';

interface StackNavigatorProps {
  screens: {
    [key in Screen]: React.ComponentType<{
      navigate: Navigate;
      params?: ScreenParams['Home'] | ScreenParams['Detail'];
    }>;
  };
  initialRoute: Screen;
}

export const StackNavigator: React.FC<StackNavigatorProps> = ({
  screens,
  initialRoute,
}) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(initialRoute);
  const [params, setParams] = useState<ScreenParams[Screen]>();

  const navigate: Navigate = (screen, routeParams) => {
    setCurrentScreen(screen);
    setParams(routeParams as ScreenParams[Screen]);
  };

  const ScreenComponent = screens[currentScreen];

  return (
    <View style={styles.container}>
      <ScreenComponent
        navigate={navigate}
        params={params as ScreenParams[typeof currentScreen]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
