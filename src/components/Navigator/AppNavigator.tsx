import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppScreens } from '../../types/screens';
import AddClass from '../AddClass/AddClass';
import AddGroup from '../AddGroup/AddGroup';
import AddStudent from '../AddStudent/AddStudent';
import AddSubject from '../AddSubject/AddSubject';
import AddTeacher from '../AddTeacher/AddTeacher';
import Class from '../Class/Class';
import Groups from '../Groups/Groups';
import Home from '../Home/Home';
import MyClasses from '../MyClasses/MyClasses';
import ClassDetail from '../MyClasses_Student/ClassDetail';
import MyClasses_Student from '../MyClasses_Student/MyClasses';
import RegisterGrades_WEEKS from '../RegisterGrades/GradesWeek';
import RegisterGrades_HOME from '../RegisterGrades/Home';
import RegisterGrades from '../RegisterGrades/RegisterGrades';
import Students from '../Students/Students';
import Subjects from '../Subjects/Subjects';
import TakeAttendance_HOME from '../TakeAttendance/Home';
import TakeAttendance from '../TakeAttendance/TakeAttendance';
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
      <Stack.Screen name={AppScreens.Subjects} component={Subjects} />
      <Stack.Screen name={AppScreens.AddSubject} component={AddSubject} />
      <Stack.Screen name={AppScreens.Classes} component={Class} />
      <Stack.Screen name={AppScreens.AddClass} component={AddClass} />
      {/* TEACHER MODULES */}
      <Stack.Screen name={AppScreens.TakeAttendance_HOME} component={TakeAttendance_HOME} />
      <Stack.Screen name={AppScreens.TakeAttendance} component={TakeAttendance} />
      <Stack.Screen name={AppScreens.MyClasses_Teacher} component={MyClasses} />
      <Stack.Screen name={AppScreens.RegisterGrades_HOME} component={RegisterGrades_HOME} />
      <Stack.Screen name={AppScreens.RegisterGrades_WEEKS} component={RegisterGrades_WEEKS} />
      <Stack.Screen name={AppScreens.RegisterGrades} component={RegisterGrades} />
      {/* STUDENT MODULES */}
      <Stack.Screen name={AppScreens.MyClasses_Student} component={MyClasses_Student} />
      <Stack.Screen name={AppScreens.StudentClassDetail} component={ClassDetail} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
