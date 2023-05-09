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
import React, { useEffect } from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './src/components/Navigator/AppNavigator';
import AuthNavigator from './src/components/Navigator/AuthNavigator';
import API from './src/functions/api/API';
import useIsLoggedIn from './src/hooks/useIsLoggedIn';
import { selectAuthToken } from './src/store/selectors';
import { persistor, store } from './src/store/store';
LogBox.ignoreLogs(['EventEmitter.removeListener']);

const Main = () => {
  const isLoggedIn = useIsLoggedIn();
  const token = useSelector(selectAuthToken);

  useEffect(() => {
    console.log('=> BASE');
    console.log(process.env.BASE_URL);
    API.defaults.baseURL = process.env.BASE_URL;
  }, []);

  useEffect(() => {
    if (token) {
      API.defaults.headers.common['Authorization'] = `Basic ${token}`;
    }
  }, [token]);

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

export default App;
