import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import axios from 'axios';
import { Button, Select, Text, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
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
  const toast = useToast();

  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    const onGetSubjectsError = () => {
      toast.show({
        description: 'Ocurrió un error al obtener las materias',
      });
    };

    try {
      setIsLoading(true);

      const request = await axios.get('/Subject');
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

  const setDate = (event: DateTimePickerEvent, date: Date | undefined) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;
    if (date) setStartHour(date);
  };

  return (
    <ScreenWrapper screenTitle="Añadir Clase">
      <Select mt="5" size="lg" placeholder="Materia" fontSize="xl" onValueChange={setSubjectId} color="white">
        {subjects.map(subject => {
          return <Select.Item key={`group-${subject.id}`} label={subject.name} value={subject.id.toString()} />;
        })}
      </Select>
      <Text color="white" fontSize="lg" mt="5" mb="2">
        Hora de entrada
      </Text>
      <Button
        background="black"
        borderColor="gray.400"
        borderWidth="1"
        onPress={() => setShowStartHourPicker(prevValue => !prevValue)}
      >
        <Text color="white" textAlign="left" fontSize="xl">
          {startHour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Button>
      {showStartHourPicker && <RNDateTimePicker is24Hour={true} mode="time" value={startHour} onChange={setDate} />}
    </ScreenWrapper>
  );
}
