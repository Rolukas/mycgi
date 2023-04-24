import axios from 'axios';
import { Box, Center, FlatList, Spinner } from 'native-base';
import React, { useEffect, useState } from 'react';
import either from '../../functions/either';
import { APIResponse } from '../../types/response';
import BasicInfoCard, { BasicInfoCardItems } from '../Common/BasicInfoCard';
import CustomInput from '../Common/CustomInput';
import ScreenWrapper from '../Common/ScreenWrapper';
interface StudentResponse extends APIResponse {
  items: StudentCard[];
}
interface StudentCard {
  id: number;
  code: string;
  name: string;
  fatherlastname: string;
  group: string;
}

const Students = () => {
  const [searchStudent, setSearchStudent] = useState<string>('');
  const [allStudents, setAllStudents] = useState<StudentCard[]>([]);
  const [currentStudents, setCurrentStudents] = useState<StudentCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getStudents = async () => {
    try {
      setIsLoading(true);
      const request = await axios.get('/Student');
      const response: StudentResponse = await request.data;

      if (response) {
        setAllStudents(response.items);
        setCurrentStudents(response.items);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchStudent === '') {
      setCurrentStudents(allStudents);
    } else {
      const filteredStudents = allStudents.filter(
        student =>
          student.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
          student.name.toLowerCase().startsWith(searchStudent.toLowerCase()) ||
          student.fatherlastname.toLowerCase().includes(searchStudent.toLowerCase()) ||
          student.fatherlastname.toLowerCase().startsWith(searchStudent.toLowerCase()) ||
          student.group.toLowerCase().includes(searchStudent.toLowerCase()) ||
          student.group.toLowerCase().startsWith(searchStudent.toLowerCase()),
      );
      setCurrentStudents(filteredStudents);
    }
  }, [searchStudent]);

  useEffect(() => {
    getStudents();
  }, []);

  const renderItem = ({ item }: { item: StudentCard }) => {
    const onStudentPress = () => {
      console.log(item.id);
    };

    const items: BasicInfoCardItems[] = [
      {
        fieldName: 'Grupo',
        fieldValue: item.group,
        icon: 'account-box',
      },
      {
        fieldName: 'Materias',
        fieldValue: '0',
        icon: 'view-list',
      },
    ];

    return (
      <BasicInfoCard
        key={item.id}
        title={`${item.name} ${item.fatherlastname}`}
        items={items}
        onPress={onStudentPress}
      />
    );
  };

  return (
    <ScreenWrapper screenTitle={'Alumnos'}>
      <CustomInput placeholderText="Buscar Alumno" value={searchStudent} onChangeText={setSearchStudent} />
      <Box mt="2">
        {either(
          isLoading,
          <Center>
            <Spinner size="lg" mt="10" />
          </Center>,
          <FlatList data={currentStudents} renderItem={renderItem} />,
        )}
      </Box>
    </ScreenWrapper>
  );
};

export default Students;
