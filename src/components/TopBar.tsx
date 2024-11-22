import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export const TopBar = ({
  showBackButton,
  onBackPress,
}: {
  showBackButton: boolean;
  onBackPress?: () => void;
}) => {
  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAE9',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});
