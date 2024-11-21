import {CustomButton} from '../../components/Button/Button';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Screen} from '../navigation/StackNavigator';

export const DetailScreen = ({
  navigate,
}: {
  navigate: (screen: Screen) => void;
}): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <CustomButton title="Go To Home" onPress={() => navigate('Home')} />
        </View>
      </ScrollView>
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
