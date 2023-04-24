import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppScreens } from '../../types/screens';
import AddGroup from '../AddGroup/AddGroup';
import AddStudent from '../AddStudent/AddStudent';
import AddTeacher from '../AddTeacher/AddTeacher';
import Groups from '../Groups/Groups';
import Home from '../Home/Home';
import Students from '../Students/Students';
import Teachers from '../Teachers/Teachers';

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
      <Stack.Screen name={AppScreens.Groups} component={Groups} />
      <Stack.Screen name={AppScreens.AddTeacher} component={AddTeacher} />
      <Stack.Screen name={AppScreens.Teachers} component={Teachers} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
