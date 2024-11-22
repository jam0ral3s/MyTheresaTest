import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Screen,
  Navigate,
  paramsType,
  NavigateRoutes,
  RouteParams,
} from './navigationTypes';

interface StackNavigatorProps {
  screens: {
    [key in Screen]: React.ComponentType<{
      navigate: Navigate;
      params?: paramsType;
    }>;
  };
  initialRoute: NavigateRoutes;
  initialParams: paramsType;
}

type StackNavigation = {
  route: NavigateRoutes;
  params: RouteParams[Screen];
};

export const StackNavigator: React.FC<StackNavigatorProps> = ({
  screens,
  initialRoute,
  initialParams,
}) => {
  const [navigationStack, setNavigationStack] = useState<StackNavigation[]>([
    {route: initialRoute, params: initialParams},
  ]);

  const navigate: Navigate = (route, params = undefined) => {
    if (route === 'back') {
      if (navigationStack.length > 1) {
        setNavigationStack(prevStack => prevStack.slice(0, -1));
      }
    } else {
      setNavigationStack(prevStack => [...prevStack, {route, params}]);
    }
  };
  const CurrentScreenStack = navigationStack[navigationStack.length - 1];
  const CurrentScreen = screens[CurrentScreenStack.route as Screen];

  return (
    <View style={{flex: 1}}>
      <CurrentScreen navigate={navigate} params={CurrentScreenStack.params} />
    </View>
  );
};
