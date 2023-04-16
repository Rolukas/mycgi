import { UIModule } from 'src/types/module';

enum ModuleCategory {
  Students = 'Alumnos',
  Teachers = 'Maestros',
}

const UIModulesList: UIModule[] = [
  {
    name: 'Alumnos',
    icon: 'account-multiple',
    route: 'Students',
    backgroundColor: '#359DFD',
    category: ModuleCategory.Students,
  },
  {
    name: 'Agregar Alumno',
    icon: 'plus-circle-outline',
    route: 'AddStudent',
    backgroundColor: '#FD3589',
    category: ModuleCategory.Students,
  },
  {
    name: 'Maestros',
    icon: 'account-multiple',
    route: 'Teachers',
    backgroundColor: '#359DFD',
    category: ModuleCategory.Teachers,
  },
  {
    name: 'Agregar Maestro',
    icon: 'plus-circle-outline',
    route: 'AddTeacher',
    backgroundColor: '#FD3589',
    category: ModuleCategory.Teachers,
  },
];

export default UIModulesList;
