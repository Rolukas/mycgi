/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import type { Node } from 'react';
import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import Login from './src/components/Login';

const Stack = createNativeStackNavigator();

enum HomeScreens {
  Login = 'Login',
}

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ height: '100%', backgroundColor: 'black' }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'Login'}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name={'Login'} component={Login} options={{ title: 'Login' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </NativeBaseProvider>
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
