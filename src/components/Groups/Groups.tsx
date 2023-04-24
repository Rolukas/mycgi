import axios from 'axios';
import { Box, Center, FlatList, Spinner, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import either from '../../functions/either';
import { BasicGroup } from '../../types/groups';
import { APIResponseBody } from '../../types/response';
import BasicInfoCard, { BasicInfoCardItems } from '../Common/BasicInfoCard';
import CustomInput from '../Common/CustomInput';
import ScreenWrapper from '../Common/ScreenWrapper';

interface GroupOutput extends APIResponseBody {
  items: BasicGroup[];
}

const Groups: React.FC = () => {
  const [currentGroups, setCurrentGroups] = useState<BasicGroup[]>([]);
  const [searchGroup, setSearchGroup] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allGroups, setAllGroups] = useState<BasicGroup[]>([]);
  const toast = useToast();

  const onGetGroupsError = () => {
    toast.show({
      title: 'Error al obtener los grupos',
    });
  };

  const getGroups = async () => {
    try {
      const request = await axios.get('/Group');
      const response: GroupOutput = await request.data;

      if (response.success === true) {
        setCurrentGroups(response.items);
        setAllGroups(response.items);
        return;
      }

      onGetGroupsError();
    } catch (error) {
      onGetGroupsError();
      console.error(error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (searchGroup === '') {
      setCurrentGroups(allGroups);
    } else {
      const filteredGroups = currentGroups.filter(
        group =>
          group.fullname.toLowerCase().includes(searchGroup.toLowerCase()) ||
          group.fullname.toLowerCase().startsWith(searchGroup.toLowerCase()),
      );
      setCurrentGroups(filteredGroups);
    }
  }, [searchGroup]);

  const onGroupPress = () => {};

  const renderItem = ({ item }: { item: BasicGroup }) => {
    const items: BasicInfoCardItems[] = [
      {
        fieldName: 'Número de alumnos',
        fieldValue: '3',
        icon: 'account-box',
      },
    ];

    return <BasicInfoCard key={item.id} title={`${item.fullname}`} items={items} onPress={onGroupPress} />;
  };

  return (
    <ScreenWrapper screenTitle="Grupos">
      <CustomInput placeholderText="Buscar Grupo" value={searchGroup} onChangeText={setSearchGroup} />
      <Box mt="2">
        {either(
          isLoading,
          <Center>
            <Spinner size="lg" mt="10" />
          </Center>,
          <FlatList data={currentGroups} renderItem={renderItem} paddingBottom="30px" />,
        )}
      </Box>
    </ScreenWrapper>
  );
};

export default Groups;