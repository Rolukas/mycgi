import { Buffer } from '@craftzdog/react-native-buffer';
import axios from 'axios';
import { Box, Button, Center, Input, Text } from 'native-base';
import React, { useState } from 'react';
import CGIName from '../../assets/images/cgi_name.svg';
import LogoWhite from '../../assets/images/logo_white.svg';

const Login = () => {
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onLogin = async () => {
    try {
      const usernamePasswordBuffer = Buffer.from(user + ':' + password);
      const base64data = usernamePasswordBuffer.toString('base64');
      const request = await axios.get('http://localhost:3002/api/Login', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64data}`,
        },
      });

      if (request.data) {
        console.log(request.data);
      }
    } catch (e) {
      console.log('=>>>');
      console.error(e);
    }
  };

  return (
    <Box flex="1" pb="10" backgroundColor="black">
      <Center pt="20">
        <LogoWhite />
      </Center>
      <Center mt="7" mb="50">
        <CGIName />
      </Center>
      <Center paddingX="10">
        <Input
          borderRadius="lg"
          borderColor="gray.500"
          placeholder="Usuario"
          fontSize="lg"
          color="white"
          value={user}
          onChangeText={setUser}
          autoCapitalize="none"
        />
        <Input
          mt="6"
          borderRadius="lg"
          borderColor="gray.500"
          placeholder="Password"
          fontSize="lg"
          color="white"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <Text textAlign="center" color="white" fontSize="sm" mt="10">
          Si olvídaste tu contraseña, contacta a tu coordinador
        </Text>
      </Center>
      <Button mt="10" marginX="10" background="#359DFD" borderRadius="2xl" onPress={onLogin}>
        <Text color="white" fontSize="lg" fontWeight="bold">
          Ingresar
        </Text>
      </Button>
    </Box>
  );
};

export default Login;
