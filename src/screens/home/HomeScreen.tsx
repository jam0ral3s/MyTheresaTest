import {CustomButton} from '../../components/Button';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

export const HomeScreen = ({
  navigate,
}: {
  navigate: (screen: Screen) => void;
}): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <CustomButton
            title="Go To Detail"
            onPress={() => navigate('Detail')}
          />
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
