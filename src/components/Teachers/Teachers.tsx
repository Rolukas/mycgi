import axios from 'axios';
import { Box, Center, FlatList, Spinner } from 'native-base';
import React, { useEffect, useState } from 'react';
import either from '../../functions/either';
import { APIResponse } from '../../types/response';
import BasicInfoCard, { BasicInfoCardItems } from '../Common/BasicInfoCard';
import CustomInput from '../Common/CustomInput';
import ScreenWrapper from '../Common/ScreenWrapper';

interface StudentResponse extends APIResponse {
  items: TeacherCard[];
}
interface TeacherCard {
  id: number;
  name: string;
  fatherlastname: string;
}

const Teachers = () => {
  const [searchTeacher, setSearchTeacher] = useState<string>('');
  const [allTeachers, setAllTeachers] = useState<TeacherCard[]>([]);
  const [currentTeachers, setCurrentTeachers] = useState<TeacherCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchTeacher === '') {
      setCurrentTeachers(allTeachers);
    } else {
      const filteredTeachers = allTeachers.filter(
        teacher =>
          teacher.name.toLowerCase().includes(searchTeacher.toLowerCase()) ||
          teacher.name.toLowerCase().startsWith(searchTeacher.toLowerCase()) ||
          teacher.fatherlastname.toLowerCase().includes(searchTeacher.toLowerCase()) ||
          teacher.fatherlastname.toLowerCase().startsWith(searchTeacher.toLowerCase()),
      );
      setCurrentTeachers(filteredTeachers);
    }
  }, [searchTeacher]);

  const getTeachers = async () => {
    try {
      setIsLoading(true);
      const request = await axios.get('/Teacher');
      const response: StudentResponse = await request.data;

      if (response) {
        setCurrentTeachers(response.items);
        setAllTeachers(response.items);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  const renderItem = ({ item }: { item: TeacherCard }) => {
    const onTeacherPress = () => {
      console.log(item.id);
    };

    const items: BasicInfoCardItems[] = [
      {
        fieldName: 'Clases',
        fieldValue: '3',
        icon: 'account-box',
      },
      {
        fieldName: 'Materias',
        fieldValue: '0',
        icon: 'view-list',
      },
    ];

    return <BasicInfoCard title={`${item.name} ${item.fatherlastname}`} items={items} onPress={onTeacherPress} />;
  };

  return (
    <ScreenWrapper screenTitle={'Maestros'}>
      <CustomInput placeholderText="Buscar Maestro" value={searchTeacher} onChangeText={setSearchTeacher} />
      <Box mt="2">
        {either(
          isLoading,
          <Center>
            <Spinner size="lg" mt="10" />
          </Center>,
          <FlatList data={currentTeachers} renderItem={renderItem} />,
        )}
      </Box>
    </ScreenWrapper>
  );
};

export default Teachers;
