import { Box, Center, FlatList, Spinner, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import API from '../../functions/api/API';
import either from '../../functions/either';
import { APIResponseBody } from '../../types/response';
import BasicInfoCard, { BasicInfoCardItems } from '../Common/BasicInfoCard';
import CustomInput from '../Common/CustomInput';
import ScreenWrapper from '../Common/ScreenWrapper';

export interface Subject {
  id: number;
  code: string;
  name: string;
  numberOfClasses: number;
}

export interface SubjectsOutput extends APIResponseBody {
  items: Subject[];
}

export default function Subjects() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentSubjects, setCurrentSubjects] = useState<Subject[]>([]);
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [searchSubject, setSearchSubject] = useState<string>('');
  const toast = useToast();

  const getSubjects = async () => {
    const onGetSubjectsError = () => {
      toast.show({
        description: 'Ocurrió un error al obtener las materias',
      });
    };

    try {
      setIsLoading(true);

      const request = await API.get('/Subject');
      const response: SubjectsOutput = request.data;

      if (response.success) {
        setCurrentSubjects(response.items);
        setAllSubjects(response.items);
        return;
      }

      onGetSubjectsError();
    } catch (error) {
      onGetSubjectsError();
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    if (searchSubject === '') {
      setCurrentSubjects(allSubjects);
      return;
    }

    const filteredSubjects = allSubjects.filter(
      subject =>
        subject.name.toLowerCase().includes(searchSubject.toLowerCase()) ||
        subject.name.toLowerCase().startsWith(searchSubject.toLowerCase()),
    );
    setCurrentSubjects(filteredSubjects);
  }, [searchSubject]);

  const renderItem = ({ item }: { item: Subject }) => {
    const items: BasicInfoCardItems[] = [
      {
        fieldName: 'No. de alumnos',
        fieldValue: item.numberOfClasses.toString(),
        icon: 'account-box',
      },
    ];

    return <BasicInfoCard key={item.id} title={`${item.name}`} items={items} />;
  };

  return (
    <ScreenWrapper screenTitle="Añadir Materia">
      <CustomInput placeholderText="Buscar Materia" value={searchSubject} onChangeText={setSearchSubject} />
      <Box mt="2" flex="1">
        {either(
          isLoading,
          <Center>
            <Spinner size="lg" mt="10" />
          </Center>,
          <FlatList data={currentSubjects} renderItem={renderItem} />,
        )}
      </Box>
    </ScreenWrapper>
  );
}
