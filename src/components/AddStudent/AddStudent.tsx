import { ScrollView } from 'native-base';
import React, { useState } from 'react';
import ActionButton from '../Common/ActionButton';
import CustomInput from '../Common/CustomInput';
import ScreenWrapper from '../Common/ScreenWrapper';

export default function AddStudent() {
  const [name, setName] = useState<string>('');
  const [fatherLastName, setFatherLastName] = useState<string>('');
  const [motherLastName, setMotherLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const onSaveStudent = () => {
    try {
      // TODO: Save student
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScreenWrapper screenTitle={'Agregar Alumno'}>
      <ScrollView mt="7">
        <CustomInput placeholderText="Nombre(s)" value={name} onChangeText={setName} />
        <CustomInput placeholderText="Apellido Paterno" value={fatherLastName} onChangeText={setFatherLastName} />
        <CustomInput placeholderText="Apellido Materno" value={motherLastName} onChangeText={setMotherLastName} />
        <CustomInput placeholderText="Correo Electrónico" value={email} onChangeText={setEmail} />
        <CustomInput placeholderText="Teléfono" value={phone} onChangeText={setPhone} />
        <CustomInput placeholderText="Dirección" value={address} onChangeText={setAddress} />
        <ActionButton text={'Guardar'} onPress={onSaveStudent} />
      </ScrollView>
    </ScreenWrapper>
  );
}
