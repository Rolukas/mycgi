import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
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
  days: string[];
}

interface Day {
  name: string;
  order: number;
}

const days: Day[] = [
  {
    name: 'L',
    order: 1,
  },
  {
    name: 'M',
    order: 2,
  },
  {
    name: 'Mi',
    order: 3,
  },
  {
    name: 'J',
    order: 4,
  },
  {
    name: 'V',
    order: 5,
  },
  {
    name: 'S',
    order: 6,
  },
];

export default function AddClass() {
  const today = new Date();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectId, setSubjectId] = useState<string | undefined>(undefined);
  const [startHour, setStartHour] = useState<Date | null>(null);
  const [endHour, setEndHour] = useState<Date | null>(null);
  const [showStartHourPicker, setShowStartHourPicker] = useState<boolean>(false);
  const [showEndHourPicker, setShowEndHourPicker] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [currentStudents, setCurrentStudents] = useState<Student[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [teacherId, setTeacherId] = useState<string | undefined>(undefined);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchStudent, setSearchStudent] = useState<string>('');
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);
  const toast = useToast();
  const navigation = useNavigation();

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
    if (!subjectId) {
      toast.show({
        description: 'Selecciona una materia',
      });
      return false;
    }
    if (!teacherId) {
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
    if (selectedDays.length === 0) {
      toast.show({
        description: 'Selecciona al menos un día',
      });
      return false;
    }
    if (!startHour || !endHour) {
      toast.show({
        description: 'Selecciona una hora de inicio y fin',
      });
      return false;
    }
    if (startHour && endHour && startHour.getTime() >= endHour.getTime()) {
      toast.show({
        description: 'La hora de inicio debe ser menor a la hora de fin',
      });
      return false;
    }
    if (startHour && startHour.getHours() < 7) {
      toast.show({
        description: 'La hora de inicio debe ser mayor a las 7:00',
      });
      return false;
    }
    if (endHour && endHour.getHours() > 21) {
      toast.show({
        description: 'La hora de fin debe ser menor a las 21:00',
      });
      return false;
    }
    return true;
  };

  const parseHour = (hour: Date) => {
    const checkIfMinuteIsLessThanTen = (minute: number) => {
      if (minute < 10) {
        return `0${minute}`;
      }
      return minute;
    };
    return `${hour.getHours()}:${checkIfMinuteIsLessThanTen(hour.getMinutes())}`;
  };

  // Receives an array of days and returns an array with the names sorted by the order.
  const parseSelectedDays = (selectedDays: Day[]): string[] => {
    const sortedDays = selectedDays.sort((a, b) => a.order - b.order);
    return sortedDays.map(day => day.name);
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
        subjectId: parseInt(subjectId!),
        teacherId: parseInt(teacherId!),
        startHour: parseHour(startHour as Date),
        endHour: parseHour(endHour as Date),
        students: selectedStudents,
        days: parseSelectedDays(selectedDays),
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

        navigation.goBack();
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
    if (event.type === 'dismissed') return setShowStartHourPicker(false);
    if (date) setStartHour(date);
    setShowStartHourPicker(false);
  };

  const changeEndHour = (event: DateTimePickerEvent, date: Date | undefined) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;
    if (event.type === 'dismissed') return setShowEndHourPicker(false);
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

  const onDayPress = (day: Day) => {
    const index = selectedDays.findIndex(selectedDay => selectedDay.name.toLowerCase() === day.name.toLowerCase());
    if (index !== -1) {
      setSelectedDays(prevValue => prevValue.filter(selectedDay => selectedDay.name !== day.name));
    } else {
      setSelectedDays(prevValue => [...prevValue, day]);
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
        <Select
          selectedValue={subjectId?.toString() || undefined}
          mt="1"
          size="lg"
          placeholder="Materia"
          fontSize="xl"
          onValueChange={setSubjectId}
          color="white"
        >
          {subjects.map(subject => {
            return <Select.Item key={`group-${subject.id}`} label={subject.name} value={subject.id.toString()} />;
          })}
        </Select>
        {/* Teacher */}
        <Text color="white" mt="4" fontSize="md">
          Maestro
        </Text>
        <Select
          selectedValue={teacherId?.toString() || undefined}
          mt="1"
          size="lg"
          placeholder="Maestro"
          fontSize="xl"
          onValueChange={setTeacherId}
          color="white"
        >
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
          <Text color="white" textAlign="left" fontSize="lg">
            {startHour != null ? parseHour(startHour) : 'Selecciona una hora'}
          </Text>
        </Button>
        {showStartHourPicker && (
          <RNDateTimePicker
            is24Hour={true}
            mode="time"
            value={startHour || today}
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
          <Text color="white" textAlign="left" fontSize="lg">
            {endHour != null ? parseHour(endHour) : 'Selecciona una hora'}
          </Text>
        </Button>
        {showEndHourPicker && (
          <RNDateTimePicker
            is24Hour={true}
            mode="time"
            value={endHour || today}
            onChange={changeEndHour}
            display="spinner"
          />
        )}
        <Text color="white" fontSize="md" mt="5">
          Días
        </Text>
        <Center mt="4" flex="1" flexDirection="row">
          {days.map(day => {
            return (
              <Button
                onPress={() => onDayPress(day)}
                backgroundColor={selectedDays.includes(day) ? '#0BA162' : '#359DFD'}
                width="10"
                height="10"
                borderRadius="20"
                mr="3"
              >
                <Text color="white" fontWeight="bold">
                  {day.name}
                </Text>
              </Button>
            );
          })}
        </Center>
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
