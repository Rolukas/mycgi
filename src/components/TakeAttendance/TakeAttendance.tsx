import { useNavigation } from '@react-navigation/native';
import { Box, Center, Checkbox, ScrollView, Spinner, Text, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import API from '../../functions/api/API';
import either from '../../functions/either';
import getCurrentFriendlyDate from '../../functions/getCurrentFriendlyDate';
import { APIResponseBody } from '../../types/response';
import { Student } from '../../types/student';
import ActionButton from '../Common/ActionButton';
import ScreenWrapper from '../Common/ScreenWrapper';

interface StudentsForAttendanceResponse extends APIResponseBody {
  items: Student[];
}

interface StudentsAttendanceInput {
  classId: number;
  attendances: number[];
}

const TakeAttendance = ({ route }) => {
  const { classId, subjectName } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const toast = useToast();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    getStudentsForAttendance();
  }, []);

  const onSaveAttendance = async () => {
    const onSaveAttendanceError = () => {
      toast.show({
        description: 'Error al guardar asistencia',
      });
    };

    try {
      setIsLoading(true);

      const payload: StudentsAttendanceInput = {
        classId,
        attendances: selectedStudents.map(studentId => parseInt(studentId)),
      };

      const request = await API.post('/Attendance', payload);
      const response: StudentsForAttendanceResponse = await request.data;

      if (response.success === true) {
        toast.show({
          description: 'Asistencia guardada',
        });
        navigation.goBack();
        return;
      }

      onSaveAttendanceError();
    } catch (e) {
      console.error(e);
      onSaveAttendanceError();
    } finally {
      setIsLoading(false);
    }
  };

  const getStudentsForAttendance = async () => {
    const onGetStudentsForAttendanceError = () => {
      toast.show({
        description: 'Error al obtener estudiantes',
      });
    };

    try {
      setIsLoading(true);
      const request = await API.get(`StudentsByClass/${classId}`);
      const response: StudentsForAttendanceResponse = await request.data;

      if (response.success === true) {
        setStudents(response.items);
        return;
      }

      onGetStudentsForAttendanceError();
    } catch (e) {
      console.error(e);
      onGetStudentsForAttendanceError();
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectStudent = (studentId: string) => {
    const index = selectedStudents.findIndex(student => student === studentId);
    if (index !== -1) {
      setSelectedStudents(prevValue => prevValue.filter(student => student !== studentId));
    } else {
      setSelectedStudents(prevValue => [...prevValue, studentId]);
    }
  };

  return (
    <ScreenWrapper screenTitle="Tomar asistencia">
      <Center mt="5">
        <Text color="white" fontSize="xl">
          {getCurrentFriendlyDate()}
        </Text>
        <Box borderColor="white" borderWidth="1" borderRadius="lg" mt="3">
          <Text fontSize="xl" mx="5" my="1" color="white">
            {subjectName}
          </Text>
        </Box>
      </Center>
      <Box backgroundColor="#333333" paddingX="5" paddingY="3" mt="5" borderRadius="md" maxH="40%">
        <ScrollView nestedScrollEnabled={true}>
          {students.map((student, index) => (
            <Checkbox
              key={`${student.id}-${index}`}
              value={student.id.toString()}
              my={2}
              _text={{
                color: 'white',
              }}
              isChecked={selectedStudents.includes(student.id.toString())}
              onChange={() => onSelectStudent(student.id.toString())}
            >
              {`${student.name} ${student.fatherlastname} ${student.motherlastname}`}
            </Checkbox>
          ))}
        </ScrollView>
      </Box>
      {either(isLoading, <Spinner size="lg" mt="2" />, <ActionButton text="GUARDAR" onPress={onSaveAttendance} />)}
    </ScreenWrapper>
  );
};

export default TakeAttendance;
