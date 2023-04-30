import { useNavigation } from '@react-navigation/native';
import { Box, Button, Center, Text } from 'native-base';
import React from 'react';
import { Platform } from 'react-native';
import BackBtn from '../../assets/images/back_btn.svg';
import LogoWhite from '../../assets/images/logo_white.svg';

interface ScreenWrapperProps {
  children: React.ReactNode;
  screenTitle: string;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, screenTitle }) => {
  const navigation = useNavigation();

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <Box backgroundColor="black" h="100%" paddingX="5">
      <Center pt="5" mb="5" flexDirection="row">
        {Platform.OS === 'ios' && (
          <Button backgroundColor="transparent" position="absolute" left="0" top="8" onPress={onBack}>
            <BackBtn />
          </Button>
        )}

        <LogoWhite width={'100%'} />
      </Center>
      <Text color="white" fontSize="xl" mt="5" fontWeight="bold">
        {screenTitle}
      </Text>
      {children}
    </Box>
  );
};

export default ScreenWrapper;
