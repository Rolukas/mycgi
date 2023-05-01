import { Spinner, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import API from '../../functions/api/API';
import either from '../../functions/either';
import { APIResponseBody } from '../../types/response';
import ActionButton from '../Common/ActionButton';
import CustomInput from '../Common/CustomInput';
import ScreenWrapper from '../Common/ScreenWrapper';

export default function AddSubject() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subjectName, setSubjectName] = useState<string>('');
  const toast = useToast();

  const getSubjects = () => {
    const onGetSubjectsError = () => {
      toast.show({
        description: 'Ocurrió un error al obtener las materias',
      });
    };

    try {
    } catch (error) {
      onGetSubjectsError();
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  const onSaveSubject = async () => {
    const onSaveSubjectError = () => {
      toast.show({
        description: 'Ocurrió un error al obtener las materias',
      });
    };

    if (!subjectName)
      return toast.show({
        description: 'Debes ingresar un nombre para la materia',
      });

    try {
      Keyboard.dismiss();
      setIsLoading(true);

      const payload = {
        name: subjectName,
      };

      const request = await API.post('/Subject', payload);
      const response: APIResponseBody = request.data;

      if (response.success) {
        toast.show({
          description: 'Materia agregada correctamente',
        });
        setSubjectName('');
        return;
      }

      if (response.message === 'subject already created') {
        toast.show({
          description: 'Ya existe una materia con ese nombre',
        });
        return;
      }

      onSaveSubjectError();
    } catch (error) {
      onSaveSubjectError();
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenWrapper screenTitle="Añadir Materia">
      <CustomInput placeholderText="Nombre de la materia" value={subjectName} onChangeText={setSubjectName} />
      {either(isLoading, <Spinner />, <ActionButton text={'Guardar'} onPress={() => onSaveSubject()} />)}
    </ScreenWrapper>
  );
}
