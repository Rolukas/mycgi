/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { IconComponentProvider } from '@react-native-material/core';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './src/components/Navigator/AppNavigator';
import AuthNavigator from './src/components/Navigator/AuthNavigator';
import useIsLoggedIn from './src/hooks/useIsLoggedIn';
import { persistor, store } from './src/store/store';

const Main = () => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <SafeAreaView style={{ height: '100%', backgroundColor: 'black' }}>
              <NavigationContainer>{!isLoggedIn ? <AuthNavigator /> : <AppNavigator />}</NavigationContainer>
            </SafeAreaView>
          </IconComponentProvider>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
