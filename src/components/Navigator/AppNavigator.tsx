import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppScreens } from '../../types/screens';
import AddGroup from '../AddGroup/AddGroup';
import AddStudent from '../AddStudent/AddStudent';
import Home from '../Home/Home';
import Students from '../Students/Students';

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
      <Stack.Screen name={AppScreens.Students} component={Students} />
      <Stack.Screen name={AppScreens.AddGroup} component={AddGroup} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
