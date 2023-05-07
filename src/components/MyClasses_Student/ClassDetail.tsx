import { Box, Center, FlatList, Spinner, Text, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import API from '../../functions/api/API';
import either from '../../functions/either';
import { APIResponseBody } from '../../types/response';
import BasicInfoCard, { BasicInfoCardItems } from '../Common/BasicInfoCard';
import ScreenWrapper from '../Common/ScreenWrapper';

interface Grade {
  gradeCriteria: string;
  score: number;
}

interface GradesDetail {
  weekNumber: number;
  grades: Grade[];
}

interface ClassDetailResponse extends APIResponseBody {
  items: GradesDetail[];
}

export default function ClassDetail({ route }) {
  const { classId, subjectName } = route.params;
  const toast = useToast();
  const [grades, setGrades] = useState<GradesDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getClassDetails();
  }, []);

  const getClassDetails = async () => {
    const onGetClassDetailsError = () => {
      toast.show({
        title: 'Error al obtener los detalles de la clase',
      });
    };
    try {
      const request = await API.get(`/ClassDetail/${classId}`);
      const response: ClassDetailResponse = request.data;

      if (response.success === true) {
        setGrades(response.items);
        return;
      }

      onGetClassDetailsError();
    } catch (error) {
      console.error(error);
      onGetClassDetailsError();
    }
  };

  const renderItem = ({ item }: { item: GradesDetail }) => {
    const items: BasicInfoCardItems[] = [];

    item.grades.forEach(grade => {
      items.push({
        fieldName: grade.gradeCriteria,
        fieldValue: grade.score.toString(),
        icon: 'disc',
      });
    });

    const totalScore = item.grades.reduce((acc, curr) => acc + curr.score, 0);
    const averageScore = totalScore / item.grades.length;
    items.push({
      fieldName: 'Promedio',
      fieldValue: averageScore.toString(),
      icon: 'star',
      highlight: true,
    });

    return <BasicInfoCard key={`week-${item.weekNumber}`} title={`Semana ${item.weekNumber}`} items={items} />;
  };

  const renderEmpty = () => {
    return (
      <Center>
        <Text fontWeight="bold" fontSize="xl" color="white">
          No hay calificaciones registradas
        </Text>
      </Center>
    );
  };

  return (
    <ScreenWrapper screenTitle={subjectName || ''}>
      <Box mt="2" flex="1">
        {either(
          isLoading,
          <Center>
            <Spinner size="lg" mt="10" />
          </Center>,
          <FlatList data={grades} renderItem={renderItem} paddingBottom="30px" ListEmptyComponent={renderEmpty} />,
        )}
      </Box>
    </ScreenWrapper>
  );
}
