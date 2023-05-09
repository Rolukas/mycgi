import { Box, Center, FlatList, Spinner, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import API from '../../functions/api/API';
import formatDays from '../../functions/days';
import either from '../../functions/either';
import BasicInfoCard, { BasicInfoCardItems } from '../Common/BasicInfoCard';
import ScreenWrapper from '../Common/ScreenWrapper';
import { ClassByTeacher, ClassByTeacherResponse } from '../TakeAttendance/Home';

export default function MyClasses() {
  const toast = useToast();
  const [classes, setClasses] = useState<ClassByTeacher[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const renderItem = ({ item }: { item: ClassByTeacher }) => {
    const items: BasicInfoCardItems[] = [
      {
        fieldName: 'Número de alumnos',
        fieldValue: item.numberOfStudents.toString(),
        icon: 'account-box',
      },
      {
        fieldName: 'Horario',
        fieldValue: `${item.startHour} a ${item.endHour}`,
        icon: 'clock-outline',
      },
      {
        fieldName: 'Días',
        fieldValue: formatDays(item.days),
        icon: 'calendar-outline',
      },
    ];

    return <BasicInfoCard key={item.id} title={`${item.subjectName}`} items={items} />;
  };

  return (
    <ScreenWrapper screenTitle="Mis clases">
      <Box mt="2" flex="1">
        {either(
          isLoading,
          <Center>
            <Spinner size="lg" mt="10" />
          </Center>,
          <FlatList data={classes} renderItem={renderItem} paddingBottom="30px" />,
        )}
      </Box>
    </ScreenWrapper>
  );
}
