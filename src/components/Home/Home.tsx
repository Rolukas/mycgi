import { Icon } from '@react-native-material/core';
import { Box, Center, IconButton, Text } from 'native-base';
import React from 'react';
import LogoWhite from '../../assets/images/logo_white.svg';
import logOut from '../../functions/auth/logout';
import either from '../../functions/either';
import useBuildModules from '../../hooks/useBuildModules';
import Modules from '../Common/Modules';

const Home = () => {
  const modules = useBuildModules();

  return (
    <Box flex="1" pb="10" backgroundColor="black">
      <Center pt="5" mb="5" flexDirection="row" width="100%">
        <LogoWhite />
        <IconButton
          mr="10"
          right="0"
          top="9"
          position="absolute"
          icon={<Icon name="exit-to-app" size={30} color="white" />}
          onPress={() => logOut()}
        />
      </Center>
      {either(
        modules.length > 0,
        <Modules modules={modules} />,
        <Center p="10">
          <Text color="white" textAlign="center" fontSize="xl">
            No tienes módulos asignados, por favor contacta a tu administrador.
          </Text>
        </Center>,
      )}
    </Box>
  );
};

export default Home;
