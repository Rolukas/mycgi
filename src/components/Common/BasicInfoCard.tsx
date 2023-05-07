import { Box, Button, Icon, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NextBtn from '../../assets/images/next_btn.svg';

export interface BasicInfoCardItems {
  icon: string;
  fieldName: string;
  fieldValue: string;
  highlight?: boolean;
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
    <TouchableOpacity key={key} onPress={handlePress} style={{ flex: 1 }}>
      <Box backgroundColor={'#333333'} borderRadius="lg" paddingX="5" paddingY="2" mt="3">
        <Text color="white" fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        <Box flexDir="row">
          <Box w="80%">
            {items?.map(item => {
              return (
                <Box flexDir="row">
                  <Box pt="3.5" pr="2">
                    <Icon name={item.icon} color="white" size={15} as={MaterialCommunityIcons} />
                  </Box>
                  <Text color="white" mt="2" fontSize="md" fontWeight={item?.highlight ? 'bold' : 'normal'}>
                    {`${item.fieldName}: ${item.fieldValue}`}
                  </Text>
                </Box>
              );
            })}
          </Box>
          <Box w="20%" justifyContent="center" ml="5">
            {onPress && (
              <Button backgroundColor="transparent" onPress={handlePress}>
                <NextBtn />
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default BasicInfoCard;
