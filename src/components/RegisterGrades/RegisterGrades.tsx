import { useNavigation } from '@react-navigation/native';
import { Box, Center, Divider, ScrollView, Spinner, Text, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import API from '../../functions/api/API';
import either from '../../functions/either';
import { APIResponseBody } from '../../types/response';
import { Student } from '../../types/student';
import ActionButton from '../Common/ActionButton';
import ScreenWrapper from '../Common/ScreenWrapper';
interface Criteria {
  id: number;
  name: string;
  minValue: number;
  maxValue: number;
}

interface RegisterGradesOutput extends APIResponseBody {
  items: {
    students: Student[];
    criteria: Criteria[];
  };
}

interface CriteriaField {
  gradeCriteriaId: number;
  gradeCriteriaName: string;
  score: number;
}

interface GradesByStudent {
  studentId: number;
  studentName: string;
  grades: CriteriaField[];
}

interface GradesInput {
  weekId: number;
  classId: number;
  grades: GradesByStudent[];
}

export default function RegisterGrades({ route }) {
  const { weekId, classId, subjectName, weekNumber } = route.params;
  const [grades, setGrades] = useState<GradesByStudent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [maxValue, setMaxValue] = useState<number>(5);
  const [minValue, setMinValue] = useState<number>(0);
  const navigation = useNavigation();
  const toast = useToast();

  useEffect(() => {
    getStudentsToGrade();
  }, []);

  const getStudentsToGrade = async () => {
    const onGetStudentsError = () => {
      toast.show({
        title: 'Error al obtener los estudiantes',
      });
    };
    try {
      setIsLoading(true);
      const request = await API.get(`/StudentsToGrade/${classId}`);
      const response: RegisterGradesOutput = request.data;
      if (response.success) {
        const students: Student[] = response.items.students;
        const buildRegisterGradesObject: GradesByStudent[] = students.map(student => {
          return {
            studentId: student.id,
            studentName: `${student.name} ${student.fatherlastname} ${student.motherlastname}`,
            grades: response.items.criteria.map(criteria => {
              return {
                gradeCriteriaId: criteria.id,
                gradeCriteriaName: criteria.name,
                score: criteria.minValue,
              };
            }),
          };
        });
        setMaxValue(response.items.criteria[0].maxValue);
        setMinValue(response.items.criteria[0].minValue);
        setGrades(buildRegisterGradesObject);
        return;
      }

      onGetStudentsError();
    } catch (e) {
      console.error(e);
      onGetStudentsError();
    } finally {
      setIsLoading(false);
    }
  };

  const onSaveGrades = async () => {
    const onRegisterGradesError = () => {
      toast.show({
        title: 'Error al registrar las calificaciones',
      });
    };
    try {
      setIsLoading(true);

      const payload: GradesInput = {
        weekId,
        classId,
        grades,
      };

      const request = await API.post(`/Grades`, payload);
      const response: APIResponseBody = request.data;

      if (response.success) {
        toast.show({
          title: 'Calificaciones registradas correctamente',
        });
        navigation.goBack();
        return;
      }

      onRegisterGradesError();
    } catch (e) {
      console.error(e);
      onRegisterGradesError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenWrapper screenTitle="Registrar calificaciones">
      <Center mt="2">
        <Text color="white" fontWeight="bold" fontSize="2xl">{`Semana ${weekNumber}`}</Text>
        <Box borderColor="white" borderWidth="1" borderRadius="lg" mt="3">
          <Text fontSize="xl" mx="5" my="1" color="white">
            {subjectName}
          </Text>
        </Box>
      </Center>
      <Box backgroundColor="#333333" paddingX="5" paddingY="5" mt="2" borderRadius="md" flex="1">
        <ScrollView>
          {grades.map((student, studentIndex) => (
            <Box mt="2" key={`student-${student.studentId}-${student.studentName}`}>
              <Text color="white" fontSize="xl" fontWeight="bold">
                {`${student.studentName}`}
              </Text>
              {student.grades.map((grade, gradeIndex) => (
                <Box mt="2" flexDir="row" w="100%" key={`grade-${student.studentId}-${grade.gradeCriteriaId}`}>
                  <Box w="80%" justifyContent="center">
                    <Text color="white" fontSize="md">
                      {grade.gradeCriteriaName}
                    </Text>
                  </Box>
                  <TextInput
                    style={{
                      width: '20%',
                      height: 40,
                      borderColor: 'gray',
                      borderWidth: 1,
                      color: 'white',
                      textAlign: 'center',
                      borderRadius: 10,
                    }}
                    value={grade.score === 0 ? '' : grade.score.toString()}
                    keyboardType="numeric"
                    maxLength={1}
                    placeholder="0"
                    onChangeText={text => {
                      const value = parseInt(text);
                      if (value > 5) {
                        toast.show({
                          title: `La calificación no puede ser mayor a ${maxValue}`,
                        });
                        return;
                      }
                      if (text === '') text = '0';
                      const newGrades = (grades[studentIndex].grades[gradeIndex].score = parseInt(text));
                      const currentGrades = grades;
                      currentGrades[studentIndex].grades[gradeIndex].score = newGrades;
                      setGrades([...currentGrades]);
                    }}
                  />
                </Box>
              ))}
              <Box mt="5" flexDir="row" w="100%">
                <Box w="80%" justifyContent="center">
                  <Text color="white" fontSize="md" fontWeight="bold">
                    PROMEDIO
                  </Text>
                </Box>
                <Text w="20%" textAlign="center" fontWeight="bold" color="white" fontSize="xl">
                  {student.grades.reduce((acc, curr) => {
                    return acc + curr.score;
                  }, 0) / student.grades.length}
                </Text>
              </Box>
              <Divider mt="3" />
            </Box>
          ))}
        </ScrollView>
      </Box>
      {either(isLoading, <Spinner size="lg" />, <ActionButton onPress={onSaveGrades} text="Guardar calificaciones" />)}
    </ScreenWrapper>
  );
}
