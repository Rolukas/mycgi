import { Button, Text } from 'native-base';
import React from 'react';

interface ActionButtonProps {
  onPress: () => void;
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onPress, text }) => {
  return (
    <Button mt="10" borderRadius="xl" backgroundColor="#0BA162">
      <Text color="white" fontSize="xl" fontWeight="bold">
        {text}
      </Text>
    </Button>
  );
};

export default ActionButton;
