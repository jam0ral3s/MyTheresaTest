import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

export type Screen = 'Home' | 'Detail';

interface StackNavigatorProps {
  screens: {
    [key in Screen]: React.ComponentType<{navigate: (screen: Screen) => void}>;
  };
  initialRoute: Screen;
}

export const StackNavigator: React.FC<StackNavigatorProps> = ({
  screens,
  initialRoute,
}) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(initialRoute);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const ScreenComponent = screens[currentScreen];

  return (
    <View style={styles.container}>
      <ScreenComponent navigate={navigate} />
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
