import { UIModule } from '../types/module';
import { AppScreens } from '../types/screens';

enum ModuleCategory {
  Students = 'Alumnos',
  Teachers = 'Maestros',
  Groups = 'Grupos',
}

const UIModulesList: UIModule[] = [
  {
    name: 'Alumnos',
    icon: 'account-multiple',
    route: AppScreens.Students,
    backgroundColor: '#359DFD',
    category: ModuleCategory.Students,
  },
  {
    name: 'Agregar Alumno',
    icon: 'plus-circle-outline',
    route: AppScreens.AddStudent,
    backgroundColor: '#FD3589',
    category: ModuleCategory.Students,
  },
  {
    name: 'Maestros',
    icon: 'account-multiple',
    route: AppScreens.Teachers,
    backgroundColor: '#359DFD',
    category: ModuleCategory.Teachers,
  },
  {
    name: 'Agregar Maestro',
    icon: 'plus-circle-outline',
    route: AppScreens.AddTeacher,
    backgroundColor: '#FD3589',
    category: ModuleCategory.Teachers,
  },
  {
    name: 'Grupos',
    icon: 'account-multiple',
    route: AppScreens.Groups,
    backgroundColor: '#359DFD',
    category: ModuleCategory.Groups,
  },
  {
    name: 'Agregar Grupo',
    icon: 'plus-circle-outline',
    route: AppScreens.AddGroup,
    backgroundColor: '#FD3589',
    category: ModuleCategory.Groups,
  },
];

export default UIModulesList;
