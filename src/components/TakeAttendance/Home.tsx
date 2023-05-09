import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Box, Button, Center, Icon, ScrollView, Text, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../../functions/api/API';
import getCurrentFriendlyDate from '../../functions/getCurrentFriendlyDate';
import { APIResponseBody } from '../../types/response';
import { AppScreens } from '../../types/screens';
import ScreenWrapper from '../Common/ScreenWrapper';

export interface ClassByTeacher {
  id: number;
  subjectName: string;
  numberOfStudents: number;
  days: string;
  startHour: string;
  endHour: string;
  isToday: boolean;
  isCurrent: boolean;
  isBlocked: boolean;
}

export interface ClassByTeacherResponse extends APIResponseBody {
  items: ClassByTeacher[];
}

export default function TakeAttendance_HOME() {
  const toast = useToast();
  const [classes, setClasses] = useState<ClassByTeacher[]>([]);
  const navigation = useNavigation();
  const screenIsFocused = useIsFocused();

  useEffect(() => {
    if (screenIsFocused) {
      getClassesByTeacher();
    }
  }, [screenIsFocused]);

  const getClassesByTeacher = async () => {
    const onGetClassesError = () => {
      toast.show({
        description: 'Error al obtener clases',
      });
    };

    try {
      const request = await API.get('/ClassesByTeacher');
      const response: ClassByTeacherResponse = await request.data;

      if (response.items.length === 0) {
        toast.show({
          description: 'No hay clases disponibles',
        });
        return;
      }

      if (response.success === true) {
        setClasses(response.items.filter(c => c.isToday));
        return;
      }

      onGetClassesError();
    } catch (e) {
      console.error(e);
      onGetClassesError();
    }
  };

  const goToTakeAttendanceScreen = (classId: number, subjectName: string, isBlocked: boolean) => {
    if (isBlocked) {
      toast.show({
        description: 'Ya ha tomado asistencia para esta clase el día de hoy',
      });
      return;
    }

    navigation.navigate(AppScreens.TakeAttendance, { classId, subjectName });
  };

  return (
    <ScreenWrapper screenTitle="Tomar asistencia">
      <Center>
        <Text mt="3" fontSize="lg" mb="2" color="white">
          {getCurrentFriendlyDate()}
        </Text>
      </Center>
      <ScrollView
        _contentContainerStyle={{
          paddingBottom: 20,
        }}
        backgroundColor="#333333"
        paddingX="5"
        paddingY="3"
        mt="2"
        borderRadius="md"
        flex="1"
      >
        {classes
          .filter(c => c.isCurrent)
          .map((classInfo, index) => (
            <Box key={`class-${index}-${classInfo.id}`} mb="5">
              <Text color="white" fontSize="lg" fontWeight="bold">
                Clase Actual
              </Text>
              <Button
                onPress={() => goToTakeAttendanceScreen(classInfo.id, classInfo.subjectName, classInfo.isBlocked)}
                backgroundColor="#FD3535"
                borderRadius="xl"
                mt="2"
                mb="2"
                leftIcon={
                  classInfo.isBlocked ? (
                    <Icon name="lock" color="white" size={15} as={MaterialCommunityIcons} />
                  ) : undefined
                }
              >
                <Text color="white" fontWeight="bold" fontSize="lg">
                  {classInfo.subjectName}
                </Text>
              </Button>
            </Box>
          ))}
        <Text color="white" fontSize="lg" fontWeight="bold">
          Clases
        </Text>
        {classes
          .filter(c => !c.isCurrent)
          .map((classInfo, index) => (
            <Box key={`class-${index}-${classInfo.id}`}>
              <Button
                onPress={() => goToTakeAttendanceScreen(classInfo.id, classInfo.subjectName, classInfo.isBlocked)}
                backgroundColor="#359DFD"
                borderRadius="xl"
                mt="2"
                mb="2"
                leftIcon={
                  classInfo.isBlocked ? (
                    <Icon name="lock" color="white" size={15} as={MaterialCommunityIcons} />
                  ) : undefined
                }
              >
                <Text color="white" fontWeight="bold" fontSize="lg">
                  {classInfo.subjectName}
                </Text>
              </Button>
            </Box>
          ))}
      </ScrollView>
    </ScreenWrapper>
  );
}
