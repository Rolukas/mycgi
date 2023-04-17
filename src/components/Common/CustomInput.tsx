import { Input } from 'native-base';
import React from 'react';

interface CustomInputProps {
  placeholderText?: string;
  value: string;
  onChangeText: (text: string) => void;
  maxLength?: number;
  type?: 'text' | 'password';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholderText = '',
  value,
  onChangeText,
  maxLength,
  type,
  keyboardType,
}) => {
  return (
    <Input
      mt="5"
      placeholder={placeholderText}
      placeholderTextColor="gray.400"
      fontSize="xl"
      borderRadius="lg"
      value={value}
      onChangeText={onChangeText}
      maxLength={maxLength}
      type={type ?? 'text'}
      color="white"
      keyboardType={keyboardType ?? 'default'}
      autoCapitalize="none"
    />
  );
};

export default CustomInput;
