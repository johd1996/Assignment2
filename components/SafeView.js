import React from 'react';
import { View, StyleSheet, SafeAreaView,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default function SafeView({ children, style }) {
  return (
    <SafeAreaView style={[styles.safeAreaContainer, style]}>
      <KeyboardAwareScrollView contentContainerStyle={[styles.container, style]} keyboardShouldPersistTaps='handled'>
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  container: {
    flex: 1
  }
});
