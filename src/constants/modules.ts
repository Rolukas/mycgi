import { UIModule } from '../types/module';
import { AppScreens } from '../types/screens';

enum ModuleCategory {
  Students = 'Alumnos',
  Teachers = 'Maestros',
  Groups = 'Grupos',
  Subjects = 'Materias',
  Classes = 'Clases',
  Teacher = 'Maestro',
}

const AdministratorModules: UIModule[] = [
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
  {
    name: 'Materias',
    icon: 'book-open-outline',
    route: AppScreens.Subjects,
    backgroundColor: '#359DFD',
    category: ModuleCategory.Subjects,
  },
  {
    name: 'Agregar Materia',
    icon: 'book-plus-multiple',
    route: AppScreens.AddSubject,
    backgroundColor: '#FD3589',
    category: ModuleCategory.Subjects,
  },
  {
    name: 'Clases',
    icon: 'clipboard-account',
    route: AppScreens.Classes,
    backgroundColor: '#359DFD',
    category: ModuleCategory.Classes,
  },
  {
    name: 'Agregar Clase',
    icon: 'human-male-board',
    route: AppScreens.AddClass,
    backgroundColor: '#FD3589',
    category: ModuleCategory.Classes,
  },
];

const TeacherModules: UIModule[] = [
  {
    name: 'Tomar asistencia',
    icon: 'book-outline',
    route: AppScreens.TakeAttendance_HOME,
    backgroundColor: '#359DFD',
    category: ModuleCategory.Teacher,
  },
  {
    name: 'Registrar calificaciones',
    icon: 'view-list',
    route: AppScreens.RegisterGrades_HOME,
    backgroundColor: '#0BA162',
    category: ModuleCategory.Teacher,
  },
  {
    name: 'Mis clases',
    icon: 'account-multiple',
    route: AppScreens.MyClasses,
    backgroundColor: '#FD9535',
    category: ModuleCategory.Teacher,
  },
];

const UIModulesList: UIModule[] = [...AdministratorModules, ...TeacherModules];

export default UIModulesList;
