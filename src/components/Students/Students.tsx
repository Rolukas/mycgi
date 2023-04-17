import { Box, FlatList, Icon, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../../functions/api/API';
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
  group: string;
}

export default function Students() {
  const [searchStudent, setSearchStudent] = useState<string>('');
  const [currentStudents, setCurrentStudents] = useState<StudentCard[]>([]);

  const getStudents = async () => {
    try {
      const request = await API.get('/Student');
      const response: StudentResponse = await request.data;
      console.log(response);
      if (response) {
        setCurrentStudents(response.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const renderItem = ({ item }) => {
    console.log('=> item', item);
    return (
      <Box key={item.id} backgroundColor={'#333333'} borderRadius="lg" paddingX="5" paddingY="2" mt="3">
        <Text color="white" fontSize="xl" fontWeight="bold">
          {item.name}
        </Text>
        <Text>
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
        </Text>
      </Box>
    );
  };

  return (
    <ScreenWrapper screenTitle={'Alumnos'}>
      <CustomInput placeholderText="Buscar Alumno" value={searchStudent} onChangeText={setSearchStudent} />
      <Box mt="2">
        <FlatList data={currentStudents} renderItem={renderItem} />
      </Box>
    </ScreenWrapper>
  );
}
