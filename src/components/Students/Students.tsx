import { Box, Button, Center, FlatList, Icon, Spinner, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NextBtn from '../../assets/images/next_btn.svg';
import API from '../../functions/api/API';
import either from '../../functions/either';
import { APIResponse } from '../../types/response';
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
  const [currentStudents, setCurrentStudents] = useState<StudentCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getStudents = async () => {
    try {
      setIsLoading(true);
      const request = await API.get('/Student');
      const response: StudentResponse = await request.data;
      console.log(response);
      if (response) {
        setCurrentStudents(response.items);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const renderItem = ({ item }: { item: StudentCard }) => {
    return (
      <Box key={item.id} backgroundColor={'#333333'} borderRadius="lg" paddingX="5" paddingY="2" mt="3">
        <Text color="white" fontSize="xl" fontWeight="bold">
          {`${item.name} ${item.fatherlastname}`}
        </Text>
        <Box>
          <Box flexDir="row">
            <Box pt="2.5" pr="2">
              <Icon name="view-list" color="white" size={15} as={MaterialCommunityIcons} />
            </Box>
            <Text color="white" mt="2" fontSize="md">
              {`Grupo: ${item.group}`}
            </Text>
          </Box>
          <Box flexDir="row">
            <Box pt="2.5" pr="2">
              <Icon name="account-box" color="white" size={15} as={MaterialCommunityIcons} />
            </Box>
            <Text color="white" mt="2" fontSize="md">
              {`Materias:`}
            </Text>
          </Box>
        </Box>
        <Box>
          <Button>
            <NextBtn />
          </Button>
        </Box>
      </Box>
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
