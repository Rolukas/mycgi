import { Box, Center, FlatList, Spinner } from 'native-base';
import React, { useEffect, useState } from 'react';
import getStudents from '../../api/Student/getStudents';
import either from '../../functions/either';
import { APIResponseBody } from '../../types/response';
import BasicInfoCard, { BasicInfoCardItems } from '../Common/BasicInfoCard';
import CustomInput from '../Common/CustomInput';
import ScreenWrapper from '../Common/ScreenWrapper';
interface StudentResponse extends APIResponseBody {
  items: StudentCard[];
}
interface StudentCard {
  id: number;
  code: string;
  name: string;
  fatherlastname: string;
  group: string;
  numberOfClasses: number;
}

const Students = () => {
  const [searchStudent, setSearchStudent] = useState<string>('');
  const [allStudents, setAllStudents] = useState<StudentCard[]>([]);
  const [currentStudents, setCurrentStudents] = useState<StudentCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllStudents = async () => {
    try {
      setIsLoading(true);
      const request: StudentResponse = await getStudents();

      if (request.success) {
        setAllStudents(request.items);
        setCurrentStudents(request.items);
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
    getAllStudents();
  }, []);

  const renderItem = ({ item }: { item: StudentCard }) => {
    const items: BasicInfoCardItems[] = [
      {
        fieldName: 'Grupo',
        fieldValue: item.group,
        icon: 'account-box',
      },
      {
        fieldName: 'Clases',
        fieldValue: item.numberOfClasses.toString(),
        icon: 'view-list',
      },
    ];

    return <BasicInfoCard key={item.id} title={`${item.name} ${item.fatherlastname}`} items={items} />;
  };

  return (
    <ScreenWrapper screenTitle={'Alumnos'}>
      <CustomInput placeholderText="Buscar Alumno" value={searchStudent} onChangeText={setSearchStudent} />
      <Box mt="2" flex="1">
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
