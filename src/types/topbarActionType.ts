import {ImageSourcePropType} from 'react-native';

export type TopbarAction = {
  icon?: ImageSourcePropType;
  text?: string;
  onPress: () => void;
};
