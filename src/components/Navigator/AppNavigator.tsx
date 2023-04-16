import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppScreens } from '../../types/screens';
import AddStudent from '../AddStudent/AddStudent';
import Home from '../Home/Home';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AppScreens.Home}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AppScreens.Home} component={Home} />
      <Stack.Screen name={AppScreens.AddStudent} component={AddStudent} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
