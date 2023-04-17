import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthScreens } from '../../types/screens';
import Login from '../Login';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AuthScreens.Login}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AuthScreens.Login} component={Login} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
