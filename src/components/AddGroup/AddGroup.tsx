import { Center, Text, useToast } from 'native-base';
import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { APIResponse } from 'src/types/response';
import API from '../../functions/api/API';
import ActionButton from '../Common/ActionButton';
import CustomInput from '../Common/CustomInput';
import ScreenWrapper from '../Common/ScreenWrapper';

interface GroupInput {
  level: string;
  letter: string;
}

export default function AddGroup() {
  const [groupNumber, setGroupNumber] = useState<string>('');
  const [groupLetter, setGroupLetter] = useState<string>('');
  const toast = useToast();

  const onCreateGroupError = () => {
    toast.show({
      description: 'Ocurrió un error al agregar el grupo',
    });
  };

  const onSaveGroup = async () => {
    try {
      Keyboard.dismiss();
      const groupNumberInt = parseInt(groupNumber) || NaN;

      // Validate fields
      if (!groupLetter.toLowerCase().match(/[a-z]/i)) {
        toast.show({
          description: 'La letra del grupo debe ser una letra',
        });
        return;
      }

      if (isNaN(groupNumberInt)) {
        toast.show({
          description: 'El número del grupo debe ser un número',
        });
        return;
      }

      const payload: GroupInput = {
        level: groupNumber,
        letter: groupLetter,
      };

      const request: APIResponse = await API.post('/Group', payload);

      if (request.data.success) {
        toast.show({
          description: 'Grupo agregado correctamente',
        });
        setGroupLetter('');
        setGroupNumber('');
        return;
      }

      // Group already created
      if (request.data.message === 'group already created') {
        toast.show({
          description: 'El grupo ya existe',
        });
        return;
      }

      // Fails
      onCreateGroupError();
    } catch (error) {
      onCreateGroupError();
      console.log(error);
    }
  };

  return (
    <ScreenWrapper screenTitle={'Agregar Grupo'}>
      <CustomInput
        placeholderText="Nivel de grupo Ej. (1,2,3)"
        value={groupNumber}
        onChangeText={setGroupNumber}
        maxLength={1}
        keyboardType="numeric"
      />
      <CustomInput
        placeholderText="Letra de grupo Ej. (A,B,C)"
        value={groupLetter}
        onChangeText={setGroupLetter}
        maxLength={1}
      />
      <Center>
        <Text fontSize="2xl" fontWeight="bold" mt="5" color="white">{`Grupo: ${groupNumber}${groupLetter}`}</Text>
      </Center>
      <ActionButton text="Guardar" onPress={onSaveGroup} />
    </ScreenWrapper>
  );
}
