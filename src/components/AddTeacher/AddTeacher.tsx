import axios from 'axios';
import { ScrollView, Spinner, useToast } from 'native-base';
import React, { useState } from 'react';
import either from '../../functions/either';
import { APIResponseBody } from '../../types/response';
import ActionButton from '../Common/ActionButton';
import CustomInput from '../Common/CustomInput';
import ScreenWrapper from '../Common/ScreenWrapper';

interface TeacherInput {
  name: string;
  fatherLastName: string;
  motherLastName: string;
  email: string;
  phone: string;
}

const AddTeacher: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [fatherLastName, setFatherLastName] = useState<string>('');
  const [motherLastName, setMotherLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const onSaveTeacherError = () => {
    toast.show({
      description: 'Ocurrió un error al agregar al maestro',
    });
  };

  const onSaveTeacher = async () => {
    try {
      if (allFieldsAreValidated()) {
        setIsLoading(true);
        const payload: TeacherInput = {
          name,
          fatherLastName,
          motherLastName,
          email,
          phone,
        };

        const request = await axios.post('/Teacher', payload);
        const response: APIResponseBody = await request.data;

        if (response.message === 'teacher already created') {
          toast.show({
            description: 'El maestro ya ha sido creado',
          });
          return;
        }

        if (response.success) {
          toast.show({
            description: 'Maestro agregado correctamente',
          });
          setName('');
          setFatherLastName('');
          setMotherLastName('');
          setEmail('');
          setPhone('');
          return;
        }

        onSaveTeacherError();
      }
    } catch (error) {
      onSaveTeacherError();
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const allFieldsAreValidated = () => {
    if (!name) {
      toast.show({
        description: 'El nombre es requerido',
      });
      return false;
    }
    if (!fatherLastName) {
      toast.show({
        description: 'El apellido paterno es requerido',
      });
      return false;
    }
    if (!motherLastName) {
      toast.show({
        description: 'El apellido materno es requerido',
      });
      return false;
    }
    if (!email) {
      toast.show({
        description: 'El correo electrónico es requerido',
      });
      return false;
    }
    if (!phone) {
      toast.show({
        description: 'El teléfono es requerido',
      });
      return false;
    }

    return true;
  };

  return (
    <ScreenWrapper screenTitle={'Agregar Maestro'}>
      <ScrollView>
        <CustomInput placeholderText="Nombre(s)" value={name} onChangeText={setName} />
        <CustomInput placeholderText="Apellido Paterno" value={fatherLastName} onChangeText={setFatherLastName} />
        <CustomInput placeholderText="Apellido Materno" value={motherLastName} onChangeText={setMotherLastName} />
        <CustomInput placeholderText="Correo Electrónico (Institucional)" value={email} onChangeText={setEmail} />
        <CustomInput placeholderText="Teléfono" value={phone} onChangeText={setPhone} />
        {either(isLoading, <Spinner />, <ActionButton text={'Guardar'} onPress={() => onSaveTeacher()} />)}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AddTeacher;
