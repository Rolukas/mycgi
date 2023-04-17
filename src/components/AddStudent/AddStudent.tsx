import { ScrollView, Select, Spinner, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { APIResponse, APIResponseBody } from 'src/types/response';
import API from '../../functions/api/API';
import either from '../../functions/either';
import ActionButton from '../Common/ActionButton';
import CustomInput from '../Common/CustomInput';
import ScreenWrapper from '../Common/ScreenWrapper';

interface GroupsResponse extends APIResponse {
  items: BasicGroup[];
}

interface StudentInput {
  name: string;
  fatherLastName: string;
  motherLastName: string;
  email: string;
  phone: string;
  address: string;
  groupId: number;
}

export default function AddStudent() {
  const [name, setName] = useState<string>('');
  const [fatherLastName, setFatherLastName] = useState<string>('');
  const [motherLastName, setMotherLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [group, setGroup] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<BasicGroup[]>([]);
  const toast = useToast();

  const getAvailableGroups = async () => {
    try {
      // TODO: Get available groups
      setIsLoading(true);
      const request = await API.get('/Group');
      const response: GroupsResponse = await request.data;

      if (response) {
        setGroups(response.items);
      }
    } catch (error) {
      toast.show({
        description: 'Ocurrió un error al obtener los grupos',
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAvailableGroups();
  }, []);

  const onSaveStudentError = () => {
    toast.show({
      description: 'Ocurrió un error al agregar el alumno',
    });
  };

  const onSaveStudent = async () => {
    try {
      if (allFieldsAreValidated()) {
        setIsLoading(true);
        const payload: StudentInput = {
          name,
          fatherLastName,
          motherLastName,
          email,
          phone,
          address,
          groupId: parseInt(group),
        };

        const request = await API.post('/Student', payload);
        const response: APIResponseBody = await request.data;

        if (response.message === 'student already created') {
          toast.show({
            description: 'El alumno ya ha sido creado',
          });
          return;
        }

        if (response.success) {
          toast.show({
            description: 'Alumno agregado correctamente',
          });
          setName('');
          setFatherLastName('');
          setMotherLastName('');
          setEmail('');
          setPhone('');
          setAddress('');
          setGroup('');
          return;
        }

        onSaveStudentError();
      }
    } catch (error) {
      onSaveStudentError();
      console.log(error);
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
    if (!address) {
      toast.show({
        description: 'La dirección es requerida',
      });
      return false;
    }
    if (!group) {
      toast.show({
        description: 'El grupo es requerido',
      });
      return false;
    }

    return true;
  };

  return (
    <ScreenWrapper screenTitle={'Agregar Alumno'}>
      <ScrollView>
        <CustomInput placeholderText="Nombre(s)" value={name} onChangeText={setName} />
        <CustomInput placeholderText="Apellido Paterno" value={fatherLastName} onChangeText={setFatherLastName} />
        <CustomInput placeholderText="Apellido Materno" value={motherLastName} onChangeText={setMotherLastName} />
        <CustomInput placeholderText="Correo Electrónico (Institucional)" value={email} onChangeText={setEmail} />
        <CustomInput placeholderText="Teléfono" value={phone} onChangeText={setPhone} />
        <CustomInput placeholderText="Dirección" value={address} onChangeText={setAddress} />
        <Select mt="5" size="lg" placeholder="Grupo" fontSize="xl" onValueChange={setGroup} color="white">
          {groups.map(group => {
            return <Select.Item label={group.fullname} value={group.id.toString()} />;
          })}
        </Select>
        {either(isLoading, <Spinner />, <ActionButton text={'Guardar'} onPress={() => onSaveStudent()} />)}
      </ScrollView>
    </ScreenWrapper>
  );
}
