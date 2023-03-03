import { Box, Text } from 'native-base';
import React from 'react';
import LogoWhite from '../../assets/images/logo_white.svg';

const Login = () => {
  return (
    <Box flex="1" pb="10">
      <LogoWhite />

      <Text size="xl" color={'black'}>
        Login
      </Text>
    </Box>
  );
};

export default Login;
