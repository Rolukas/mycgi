import { Box, Button, Icon, Text } from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NextBtn from '../../assets/images/next_btn.svg';

export interface BasicInfoCardItems {
  icon: string;
  fieldName: string;
  fieldValue: string;
}

export interface BasicInfoCardProps {
  title: string;
  items?: BasicInfoCardItems[];
  onPress?: () => void;
  key?: string | number;
}

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({ title, onPress, items, key }) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Box key={key} backgroundColor={'#333333'} borderRadius="lg" paddingX="5" paddingY="2" mt="3">
      <Text color="white" fontSize="xl" fontWeight="bold">
        {title}
      </Text>
      <Box>
        {items?.map(item => {
          return (
            <Box flexDir="row">
              <Box pt="3.5" pr="2">
                <Icon name={item.icon} color="white" size={15} as={MaterialCommunityIcons} />
              </Box>
              <Text color="white" mt="2" fontSize="md">
                {`${item.fieldName}: ${item.fieldValue}`}
              </Text>
            </Box>
          );
        })}
      </Box>
      {onPress && (
        <Button onPress={handlePress} backgroundColor="transparent" position="absolute" right="0" top="8">
          <NextBtn />
        </Button>
      )}
    </Box>
  );
};

export default BasicInfoCard;
