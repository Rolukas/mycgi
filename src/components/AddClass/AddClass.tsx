import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Button, Center, Checkbox, ScrollView, Select, Text, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import getStudents, { StudentResponse } from '../../api/Student/getStudents';
import getTeachers, { TeacherResponse } from '../../api/Teacher/getTeachers';
import API from '../../functions/api/API';
import { Student } from '../../types/student';
import { Teacher } from '../../types/teacher';
import ActionButton from '../Common/ActionButton';
import ScreenWrapper from '../Common/ScreenWrapper';
import { Subject, SubjectsOutput } from '../Subjects/Subjects';

export default function AddClass() {
  const today = new Date();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectId, setSubjectId] = useState<string>('');
  const [startHour, setStartHour] = useState<Date>(today);
  const [endHour, setEndHour] = useState<Date>(today);
  const [showStartHourPicker, setShowStartHourPicker] = useState<boolean>(false);
  const [showEndHourPicker, setShowEndHourPicker] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [teacherId, setTeacherId] = useState<string>('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const toast = useToast();

  useEffect(() => {
    getSubjects();
    getAllTeachers();
    getAllStudents();
  }, []);

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
        setSubjects(response.items);
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

  const getAllTeachers = async () => {
    try {
      setIsLoading(true);
      const teachersResponse: TeacherResponse = await getTeachers();

      if (teachersResponse.success) {
        setTeachers(teachersResponse.items);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllStudents = async () => {
    try {
      setIsLoading(true);
      const studentResponse: StudentResponse = await getStudents();

      if (studentResponse.success) {
        setStudents(studentResponse.items);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeStartHour = (event: DateTimePickerEvent, date: Date | undefined) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;
    if (date) setStartHour(date);
    setShowStartHourPicker(false);
  };

  const changeEndHour = (event: DateTimePickerEvent, date: Date | undefined) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;
    if (date) setEndHour(date);
    setShowEndHourPicker(false);
  };

  const onSelectStudent = (studentId: string) => {
    const index = selectedStudents.findIndex(student => student === studentId);
    if (index !== -1) {
      setSelectedStudents(prevValue => prevValue.filter(student => student !== studentId));
      return;
    }
    setSelectedStudents(prevValue => [...prevValue, studentId]);
  };

  return (
    <ScreenWrapper screenTitle="Añadir Clase">
      <ScrollView pinchGestureEnabled>
        <Center>
          <Text color="white" mt="5" fontSize="lg" fontWeight="bold">
            ACADEMIA
          </Text>
        </Center>
        {/* Subject */}
        <Text color="white" mt="2" fontSize="md">
          Materia
        </Text>
        <Select mt="1" size="lg" placeholder="Materia" fontSize="xl" onValueChange={setSubjectId} color="white">
          {subjects.map(subject => {
            return <Select.Item key={`group-${subject.id}`} label={subject.name} value={subject.id.toString()} />;
          })}
        </Select>
        {/* Teacher */}
        <Text color="white" mt="4" fontSize="md">
          Maestro
        </Text>
        <Select mt="1" size="lg" placeholder="Maestro" fontSize="xl" onValueChange={setTeacherId} color="white">
          {teachers.map(teacher => {
            return (
              <Select.Item
                key={`teacher-${teacher.id}`}
                label={`${teacher.name} ${teacher.fatherlastname}`}
                value={teacher.id.toString()}
              />
            );
          })}
        </Select>
        <Center>
          <Text color="white" mt="5" fontSize="lg" fontWeight="bold">
            HORARIO
          </Text>
        </Center>
        {/* Start Hour */}
        <Text color="white" fontSize="md" mt="2" mb="2">
          Hora de inicio
        </Text>
        <Button
          background="black"
          borderColor="gray.400"
          borderWidth="1"
          onPress={() => setShowStartHourPicker(prevValue => !prevValue)}
        >
          <Text color="white" textAlign="left" fontSize="xl">
            {startHour.toLocaleTimeString()}
          </Text>
        </Button>
        {showStartHourPicker && (
          <RNDateTimePicker
            is24Hour={true}
            mode="time"
            value={startHour}
            onChange={changeStartHour}
            display="spinner"
          />
        )}
        {/* End Hour */}
        <Text color="white" fontSize="md" mt="4" mb="2">
          Hora de fin
        </Text>
        <Button
          background="black"
          borderColor="gray.400"
          borderWidth="1"
          onPress={() => setShowEndHourPicker(prevValue => !prevValue)}
        >
          <Text color="white" textAlign="left" fontSize="xl">
            {endHour.toLocaleTimeString()}
          </Text>
        </Button>
        {showEndHourPicker && (
          <RNDateTimePicker is24Hour={true} mode="time" value={endHour} onChange={changeEndHour} display="spinner" />
        )}
        <Center>
          <Text color="white" mt="5" fontSize="lg" fontWeight="bold">
            ALUMNOS
          </Text>
        </Center>
        {/* Students */}
        <Checkbox.Group onChange={onSelectStudent} value={selectedStudents} accessibilityLabel="choose numbers">
          {students.map(student => {
            return (
              <Checkbox
                value={student.id.toString()}
                my={2}
                _text={{
                  color: 'white',
                }}
              >
                {`${student.name} ${student.fatherlastname}`}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
        <ActionButton text="GUARDAR" onPress={() => {}} />
      </ScrollView>
    </ScreenWrapper>
  );
}
