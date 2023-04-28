import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Button, Center, Checkbox, ScrollView, Select, Spinner, Text, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import getStudents, { StudentResponse } from '../../api/Student/getStudents';
import getTeachers, { TeacherResponse } from '../../api/Teacher/getTeachers';
import API from '../../functions/api/API';
import either from '../../functions/either';
import { APIResponseBody } from '../../types/response';
import { Student } from '../../types/student';
import { Teacher } from '../../types/teacher';
import ActionButton from '../Common/ActionButton';
import CustomInput from '../Common/CustomInput';
import ScreenWrapper from '../Common/ScreenWrapper';
import { Subject, SubjectsOutput } from '../Subjects/Subjects';
interface ClassInput {
  subjectId: number;
  teacherId: number;
  startHour: string;
  endHour: string;
  students: string[];
}

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
  const [currentStudents, setCurrentStudents] = useState<Student[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [teacherId, setTeacherId] = useState<string>('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchStudent, setSearchStudent] = useState<string>('');
  const toast = useToast();

  useEffect(() => {
    getSubjects();
  }, []);

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

  const allFieldsAreFilled = () => {
    if (subjectId === '') {
      toast.show({
        description: 'Selecciona una materia',
      });
      return false;
    }
    if (teacherId === '') {
      toast.show({
        description: 'Selecciona un maestro',
      });
      return false;
    }
    if (selectedStudents.length === 0) {
      toast.show({
        description: 'Selecciona al menos un alumno',
      });
      return false;
    }
    return true;
  };

  const parseHour = (hour: Date) => {
    return `${hour.getHours()}:${hour.getMinutes()}`;
  };

  const onCreateClass = async () => {
    const onCreateClassError = () => {
      toast.show({
        description: 'Ocurrió un error al crear la clase',
      });
    };
    try {
      if (!allFieldsAreFilled()) return;

      setIsLoading(true);
      const payload: ClassInput = {
        subjectId: parseInt(subjectId),
        teacherId: parseInt(teacherId),
        startHour: parseHour(startHour),
        endHour: parseHour(endHour),
        students: selectedStudents,
      };

      const request = await API.post('/Class', payload);
      const response: APIResponseBody = request.data;

      if (response.success) {
        if (response.message === 'class created but some students were not added') {
          toast.show({
            description: 'Clase creada pero algunos alumnos no fueron agregados',
          });
        } else {
          toast.show({
            description: 'Clase creada correctamente',
          });
        }

        setSubjectId('');
        setTeacherId('');
        setStartHour(today);
        setEndHour(today);
        setSelectedStudents([]);
        setCurrentStudents(allStudents);
        setSearchStudent('');
        return;
      }

      onCreateClassError();
    } catch (error) {
      console.error(error);
      onCreateClassError();
    } finally {
      setIsLoading(false);
    }
  };

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
        getAllTeachers();
        return;
      }

      onGetSubjectsError();
    } catch (error) {
      onGetSubjectsError();
      console.error(error);
    }
  };

  const getAllTeachers = async () => {
    try {
      setIsLoading(true);
      const teachersResponse: TeacherResponse = await getTeachers();

      if (teachersResponse.success) {
        setTeachers(teachersResponse.items);
        getAllStudents();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllStudents = async () => {
    try {
      setIsLoading(true);
      const studentResponse: StudentResponse = await getStudents();

      if (studentResponse.success) {
        setCurrentStudents(studentResponse.items);
        setAllStudents(studentResponse.items);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
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
    } else {
      setSelectedStudents(prevValue => [...prevValue, studentId]);
    }
  };

  return (
    <ScreenWrapper screenTitle="Añadir Clase">
      <ScrollView nestedScrollEnabled={true}>
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
            {parseHour(startHour)}
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
            {parseHour(endHour)}
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
        <CustomInput placeholderText="Buscar alumno" onChangeText={setSearchStudent} value={searchStudent} />
        {/* Students */}
        <ScrollView
          borderColor="gray.500"
          borderWidth="1"
          borderRadius="lg"
          maxH="32"
          mt="3"
          paddingX="2"
          nestedScrollEnabled={true}
        >
          {currentStudents.map(student => {
            return (
              <Checkbox
                key={`student-${student.id}`}
                value={student.id.toString()}
                my={2}
                _text={{
                  color: 'white',
                }}
                isChecked={selectedStudents.includes(student.id.toString())}
                onChange={() => onSelectStudent(student.id.toString())}
              >
                {`[${student.group}] - ${student.name} ${student.fatherlastname}`}
              </Checkbox>
            );
          })}
        </ScrollView>
        <Text color="white" mt="3" fontSize="md" fontWeight="bold">
          {`Número de alumnos: ${selectedStudents.length}`}
        </Text>
        {either(isLoading, <Spinner />, <ActionButton text="GUARDAR" onPress={onCreateClass} />)}
      </ScrollView>
    </ScreenWrapper>
  );
}
