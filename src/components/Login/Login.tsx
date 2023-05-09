import { Buffer } from '@craftzdog/react-native-buffer';
import { Box, Button, Center, Input, KeyboardAvoidingView, Spinner, Text, useToast } from 'native-base';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CGIName from '../../assets/images/cgi_name.svg';
import LogoWhite from '../../assets/images/logo_white.svg';
import API, { baseURL } from '../../functions/api/API';
import { signInAction } from '../../store/actions';
import SignInActionPayload from '../../types/actions';
import { Module } from '../../types/module';
import { APIResponse } from '../../types/response';

interface UserConfiguration {
  profileId: number;
  modules: [Module];
  profileName: string;
}

interface LoginResponse extends APIResponse {
  items: [UserConfiguration];
}

const Login = () => {
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      setIsLoading(true);

      const usernamePasswordBuffer = Buffer.from(user + ':' + password);
      const base64data = usernamePasswordBuffer.toString('base64');

      const request = await API.get(baseURL + '/Login', {
        headers: {
          Authorization: `Basic ${base64data}`,
          'Content-Type': 'application/json',
        },
      });

      const response: LoginResponse = await request.data;

      if (response) {
        const data = response.items[0];
        const payload: SignInActionPayload = {
          allowedModules: data.modules,
          profileId: data.profileId,
          profileName: data.profileName,
          isLoggedIn: true,
          authToken: base64data,
        };
        dispatch(signInAction(payload));
        API.defaults.headers.common['Authorization'] = `Basic ${base64data}`;
      }
    } catch (e) {
      console.error(e.message);
      toast.show({
        description: 'Credenciales inválidas',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView enabled behavior={'position'}>
      <Box pb="10" backgroundColor="black">
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
            secureTextEntry={true}
          />
          <Text textAlign="center" color="white" fontSize="sm" mt="10">
            Si olvídaste tu contraseña, contacta a tu coordinador
          </Text>
        </Center>
        {isLoading ? (
          <Spinner size="lg" mt="10" />
        ) : (
          <Button mt="10" marginX="10" background="#359DFD" borderRadius="2xl" onPress={onLogin}>
            <Text color="white" fontSize="lg" fontWeight="bold">
              Ingresar
            </Text>
          </Button>
        )}
      </Box>
    </KeyboardAvoidingView>
  );
};

export default Login;
