import { useNavigation } from '@react-navigation/native';
import { Box, Button, Icon, ScrollView, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UIModule } from 'src/types/module';

interface ModulesProps {
  modules: UIModule[];
}

interface ModulesByCategory {
  category: string;
  modules: UIModule[];
}

const Modules: React.FC<ModulesProps> = ({ modules }) => {
  const [modulesByCategory, setModulesByCategory] = useState<ModulesByCategory[]>([]);
  const navigation = useNavigation();

  const navigateToModule = (screen: string) => {
    navigation.navigate(screen);
  };

  /* Build modules by category */
  useEffect(() => {
    const modulesByCategory: ModulesByCategory[] = [];
    modules.forEach(module => {
      const searchCategory = modulesByCategory.find(
        category => category.category.toLowerCase() === module.category.toLowerCase(),
      );
      if (searchCategory) {
        searchCategory.modules.push(module);
      } else {
        modulesByCategory.push({
          category: module.category,
          modules: [module],
        });
      }
    });
    setModulesByCategory(modulesByCategory);
  }, [modules]);

  return (
    <ScrollView>
      {modulesByCategory.map((category, index) => {
        return (
          <Box key={`module-category-${index}`} paddingX="2" mt="5">
            <Text color="white" fontSize="xl" fontWeight="bold">
              {category.category}
            </Text>
            <Box backgroundColor="#333333" paddingX="10" paddingY="3" mt="2" borderRadius="xl">
              {category.modules.map((module, index) => {
                return (
                  <Button
                    key={`module-${index}`}
                    leftIcon={<Icon color="white" size={25} name={module.icon} as={MaterialCommunityIcons} />}
                    backgroundColor={module.backgroundColor}
                    borderRadius="xl"
                    mt="2"
                    mb="2"
                    onPress={() => navigateToModule(module.route)}
                  >
                    <Text color="white" fontWeight="bold" fontSize="lg">
                      {module.name}
                    </Text>
                  </Button>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </ScrollView>
  );
};

export default Modules;
