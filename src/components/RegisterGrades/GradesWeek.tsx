import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Box, Button, Center, FlatList, Icon, Spinner, Text, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../../functions/api/API';
import either from '../../functions/either';
import { APIResponseBody } from '../../types/response';
import { Week } from '../../types/week';
import ScreenWrapper from '../Common/ScreenWrapper';

interface WeekResponse extends APIResponseBody {
  items: Week[];
}

const RegisterGrades = ({ route }) => {
  const { classId, subjectName } = route.params;
  const toast = useToast();
  const [weeks, setWeeks] = useState<Week[]>([]);
  const navigation = useNavigation();
  const screenIsFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (screenIsFocused) {
      getWeeksByClass();
    }
  }, [screenIsFocused]);

  const getWeeksByClass = async () => {
    const onGetWeeksError = () => {
      toast.show({
        description: 'Error al obtener las semanas',
      });
    };

    try {
      setIsLoading(true);
      const request = await API.get(`WeeksByClass/${classId}`);
      const response: WeekResponse = await request.data;
      console.log(response.items);
      if (response.success === true) {
        setWeeks(response.items);
        return;
      }

      onGetWeeksError();
    } catch (e) {
      console.error(e);
      onGetWeeksError();
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegisterGradesScreen = (weekId: number, isLocked: boolean) => {
    // TODO: Add navigation to TakeAttendance screen
    if (isLocked) {
      toast.show({
        description: 'Ya has tomado calificaciones de esta semana',
      });
      return;
    }
  };

  const renderItem = ({ item }: { item: Week }) => {
    return (
      <Box key={`week-${item.id}`}>
        <Button
          onPress={() => goToRegisterGradesScreen(item.id, item.isLocked)}
          backgroundColor={item.isLocked ? '#FD3535' : '#359DFD'}
          borderRadius="xl"
          mt="2"
          mb="2"
          leftIcon={
            item.isLocked ? <Icon name="lock" color="white" size={15} as={MaterialCommunityIcons} /> : undefined
          }
        >
          <Text color="white" fontWeight="bold" fontSize="lg">
            {`Semana ${item.number}`}
          </Text>
        </Button>
      </Box>
    );
  };

  return (
    <ScreenWrapper screenTitle="Registrar calificaciones">
      <Center my="2">
        <Box borderColor="white" borderWidth="1" borderRadius="lg" mt="3">
          <Text fontSize="xl" mx="5" my="1" color="white">
            {subjectName}
          </Text>
        </Box>
      </Center>
      <Box backgroundColor="#333333" paddingX="5" paddingY="3" mt="2" borderRadius="md" flex="1">
        {either(
          isLoading,
          <Center>
            <Spinner size="lg" mt="10" />
          </Center>,
          <FlatList
            data={weeks}
            renderItem={renderItem}
            contentContainerStyle={{
              marginBottom: 20,
            }}
          />,
        )}
      </Box>
    </ScreenWrapper>
  );
};

export default RegisterGrades;
