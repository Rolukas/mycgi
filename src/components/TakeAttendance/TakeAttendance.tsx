import { Box, Button, Center, Text, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import API from '../../functions/api/API';
import { APIResponseBody } from '../../types/response';
import ScreenWrapper from '../Common/ScreenWrapper';

interface ClassByTeacher {
  id: number;
  subjectName: string;
  numberOfStudents: number;
  days: string;
  startHour: string;
  endHour: string;
}

export interface ClassByTeacherResponse extends APIResponseBody {
  items: ClassByTeacher[];
}

// Returs a date with format 'Viernes, 12 de Marzo'
const getCurrentDate = (): string => {
  const date = new Date();
  const day = date.getDate();
  const getMonthName = (month: number): string => {
    switch (month) {
      case 0:
        return 'Enero';
      case 1:
        return 'Febrero';
      case 2:
        return 'Marzo';
      case 3:
        return 'Abril';
      case 4:
        return 'Mayo';
      case 5:
        return 'Junio';
      case 6:
        return 'Julio';
      case 7:
        return 'Agosto';
      case 8:
        return 'Septiembre';
      case 9:
        return 'Octubre';
      case 10:
        return 'Noviembre';
      case 11:
        return 'Diciembre';
      default:
        return '';
    }
  };
  const month = getMonthName(date.getMonth());
  const year = date.getFullYear();

  return `${day} de ${month} de ${year}`;
};

export default function TakeAttendance() {
  const toast = useToast();
  const [classes, setClasses] = useState<ClassByTeacher[]>([]);

  useEffect(() => {
    getClassesByTeacher();
  }, []);

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

  return (
    <ScreenWrapper screenTitle="Tomar asistencia">
      <Center>
        <Text mt="3" fontSize="lg" mb="2" color="white">
          {getCurrentDate()}
        </Text>
      </Center>
      <Box backgroundColor="#333333" paddingX="10" paddingY="3" mt="2" borderRadius="md">
        {classes.map((classInfo, index) => (
          <Button key={`class-${index}`} backgroundColor="#359DFD" borderRadius="xl" mt="2" mb="2">
            <Text color="white" fontWeight="bold" fontSize="lg">
              {classInfo.subjectName}
            </Text>
          </Button>
        ))}
      </Box>
    </ScreenWrapper>
  );
}
