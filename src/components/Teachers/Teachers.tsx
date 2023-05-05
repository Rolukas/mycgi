import { Box, Center, FlatList, Spinner } from 'native-base';
import React, { useEffect, useState } from 'react';
import getTeachers, { TeacherResponse } from '../../api/Teacher/getTeachers';
import either from '../../functions/either';
import { APIResponse } from '../../types/response';
import { Teacher } from '../../types/teacher';
import BasicInfoCard, { BasicInfoCardItems } from '../Common/BasicInfoCard';
import CustomInput from '../Common/CustomInput';
import ScreenWrapper from '../Common/ScreenWrapper';

interface StudentResponse extends APIResponse {
  items: Teacher[];
}

const Teachers = () => {
  const [searchTeacher, setSearchTeacher] = useState<string>('');
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [currentTeachers, setCurrentTeachers] = useState<Teacher[]>([]);
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

  const getAllTeachers = async () => {
    try {
      setIsLoading(true);
      const teachersResponse: TeacherResponse = await getTeachers();

      if (teachersResponse.success) {
        setCurrentTeachers(teachersResponse.items);
        setAllTeachers(teachersResponse.items);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  const renderItem = ({ item }: { item: Teacher }) => {
    const items: BasicInfoCardItems[] = [
      {
        fieldName: 'No. de clases',
        fieldValue: item.numberOfClasses.toString(),
        icon: 'account-box',
      },
    ];

    return <BasicInfoCard key={item.id} title={`${item.name} ${item.fatherlastname}`} items={items} />;
  };

  return (
    <ScreenWrapper screenTitle={'Maestros'}>
      <CustomInput placeholderText="Buscar Maestro" value={searchTeacher} onChangeText={setSearchTeacher} />
      <Box mt="2" flex="1">
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
