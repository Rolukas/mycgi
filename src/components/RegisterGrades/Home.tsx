import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Box, Button, ScrollView, Text, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import API from '../../functions/api/API';
import { AppScreens } from '../../types/screens';
import ScreenWrapper from '../Common/ScreenWrapper';
import { ClassByTeacher, ClassByTeacherResponse } from '../TakeAttendance/Home';

export default function RegisterGrades_HOME() {
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
        setClasses(response.items);
        return;
      }

      onGetClassesError();
    } catch (e) {
      console.error(e);
      onGetClassesError();
    }
  };

  const goToWeeksScreen = (classId: number, subjectName: string) => {
    navigation.navigate(AppScreens.RegisterGrades_WEEKS, { classId, subjectName });
  };

  return (
    <ScreenWrapper screenTitle="Registrar calificaciones">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        backgroundColor="#333333"
        paddingX="5"
        paddingY="3"
        mt="2"
        borderRadius="md"
      >
        {classes.map((classInfo, index) => (
          <Box key={`class-${index}-${classInfo.id}`}>
            <Button
              onPress={() => goToWeeksScreen(classInfo.id, classInfo.subjectName)}
              backgroundColor="#359DFD"
              borderRadius="xl"
              mt="2"
              mb="2"
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
