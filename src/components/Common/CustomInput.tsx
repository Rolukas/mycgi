import { Input } from 'native-base';
import React from 'react';

interface CustomInputProps {
  placeholderText?: string;
  value: string;
  onChangeText: (text: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholderText = '', value, onChangeText }) => {
  return (
    <Input
      mt="5"
      placeholder={placeholderText}
      placeholderTextColor="gray.400"
      fontSize="xl"
      borderRadius="lg"
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default CustomInput;
