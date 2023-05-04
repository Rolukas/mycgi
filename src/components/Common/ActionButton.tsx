import { Button, Text } from 'native-base';
import React from 'react';

interface ActionButtonProps {
  onPress: () => void;
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onPress, text }) => {
  const handlePress = () => {
    if (onPress) onPress();
  };

  return (
    <Button mt="5" borderRadius="xl" backgroundColor="#0BA162" onPress={handlePress}>
      <Text color="white" fontSize="md" fontWeight="bold">
        {text}
      </Text>
    </Button>
  );
};

export default ActionButton;
