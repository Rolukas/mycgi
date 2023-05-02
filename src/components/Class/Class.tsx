import { Box, Center, FlatList, Spinner, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import API from '../../functions/api/API';
import formatDays from '../../functions/days';
import either from '../../functions/either';
import { BasicClassInfo } from '../../types/class';
import { APIResponseBody } from '../../types/response';
import BasicInfoCard, { BasicInfoCardItems } from '../Common/BasicInfoCard';
import CustomInput from '../Common/CustomInput';
import ScreenWrapper from '../Common/ScreenWrapper';

interface ClassOutput extends APIResponseBody {
  items: BasicClassInfo[];
}

const Groups: React.FC = () => {
  const [currentClasses, setCurrentClasses] = useState<BasicClassInfo[]>([]);
  const [searchClass, setSearchClass] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allClasses, setAllClasses] = useState<BasicClassInfo[]>([]);
  const toast = useToast();

  const onGetClassesError = () => {
    toast.show({
      title: 'Error al obtener las clases',
    });
  };

  useEffect(() => {
    if (searchClass === '') {
      setCurrentClasses(allClasses);
    } else {
      const filteredClasses = currentClasses.filter(
        classInfo =>
          classInfo.teacherName.toLowerCase().includes(searchClass.toLowerCase()) ||
          classInfo.teacherName.toLowerCase().startsWith(searchClass.toLowerCase()) ||
          classInfo.subjectName.toLowerCase().includes(searchClass.toLowerCase()) ||
          classInfo.subjectName.toLowerCase().startsWith(searchClass.toLowerCase()),
      );
      setCurrentClasses(filteredClasses);
    }
  }, [searchClass]);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    try {
      setIsLoading(true);
      const request = await API.get('/Class');
      const response: ClassOutput = await request.data;

      if (response.success === true) {
        setCurrentClasses(response.items);
        setAllClasses(response.items);
        return;
      }

      onGetClassesError();
    } catch (error) {
      onGetClassesError();
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: BasicClassInfo }) => {
    const items: BasicInfoCardItems[] = [
      {
        fieldName: 'Profesor',
        fieldValue: item.teacherName,
        icon: 'account-box',
      },
      {
        fieldName: 'No. de alumnos',
        fieldValue: item.numberOfStudents.toString(),
        icon: 'view-list',
      },
      {
        fieldName: 'Días',
        fieldValue: formatDays(item.days),
        icon: 'calendar',
      },
    ];

    return <BasicInfoCard key={item.id} title={`${item.subjectName}`} items={items} />;
  };

  return (
    <ScreenWrapper screenTitle="Clases">
      <CustomInput placeholderText="Buscar Clase" value={searchClass} onChangeText={setSearchClass} />
      <Box mt="2" flex="1">
        {either(
          isLoading,
          <Center>
            <Spinner size="lg" mt="10" />
          </Center>,
          <FlatList data={currentClasses} renderItem={renderItem} paddingBottom="30px" />,
        )}
      </Box>
    </ScreenWrapper>
  );
};

export default Groups;
