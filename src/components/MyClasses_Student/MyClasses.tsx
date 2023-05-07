import { useNavigation } from '@react-navigation/native';
import { Box, Center, FlatList, Spinner, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import API from '../../functions/api/API';
import formatDays from '../../functions/days';
import either from '../../functions/either';
import { APIResponseBody } from '../../types/response';
import { AppScreens } from '../../types/screens';
import BasicInfoCard, { BasicInfoCardItems } from '../Common/BasicInfoCard';
import ScreenWrapper from '../Common/ScreenWrapper';

interface StudentClassBasicInfo {
  classId: number;
  subjectName: string;
  teacherName: string;
  numberOfAbsences: number;
  classDays: string;
  startHour: string;
  endHour: string;
}

interface StudentClassesResponse extends APIResponseBody {
  items: StudentClassBasicInfo[];
}

export default function MyClasses_Student() {
  const [classes, setClasses] = useState<StudentClassBasicInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigation = useNavigation();

  useEffect(() => {
    onGetClasses();
  }, []);

  const onGetClasses = async () => {
    const onGetClassesError = () => {
      toast.show({
        title: 'Error al obtener las clases',
      });
    };
    try {
      setIsLoading(true);
      const request = await API.get('/ClassesByStudent');
      const response: StudentClassesResponse = request.data;

      if (response.success === true) {
        setClasses(response.items);
        return;
      }

      onGetClassesError();
    } catch (error) {
      console.error(error);
      onGetClassesError();
    } finally {
      setIsLoading(false);
    }
  };

  const onClassPress = (classId: number, subjectName: string) => {
    navigation.navigate(AppScreens.StudentClassDetail, { classId, subjectName });
  };

  const renderItem = ({ item }: { item: StudentClassBasicInfo }) => {
    const items: BasicInfoCardItems[] = [
      {
        fieldName: 'Profesor',
        fieldValue: item.teacherName,
        icon: 'account-box',
      },
      {
        fieldName: 'Días de clase',
        fieldValue: formatDays(item.classDays),
        icon: 'calendar',
      },
      {
        fieldName: 'Hora de inicio',
        fieldValue: item.startHour,
        icon: 'clock-start',
      },
      {
        fieldName: 'Hora de fin',
        fieldValue: item.endHour,
        icon: 'clock-end',
      },
      {
        fieldName: 'No. de Faltas',
        fieldValue: item.numberOfAbsences.toString(),
        icon: 'close',
      },
    ];

    return (
      <BasicInfoCard
        key={`classId-${item.classId}`}
        title={`${item.subjectName}`}
        items={items}
        onPress={() => onClassPress(item.classId, item.subjectName)}
      />
    );
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
