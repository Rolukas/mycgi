import { UIModule } from '../types/module';
import { AppScreens } from '../types/screens';

enum ModuleCategory {
  Students = 'Alumnos',
  Teachers = 'Maestros',
  Groups = 'Grupos',
  Subjects = 'Materias',
  Classes = 'Clases',
  Teacher = 'Maestro',
  Student = 'Alumno',
}

const AdministratorModules: UIModule[] = [
  {
    id: 1,
    name: 'Alumnos',
    icon: 'account-multiple',
    route: AppScreens.Students,
    backgroundColor: '#359DFD',
    category: ModuleCategory.Students,
  },
  {
    id: 2,
    name: 'Agregar Alumno',
    icon: 'plus-circle-outline',
    route: AppScreens.AddStudent,
    backgroundColor: '#FD3589',
    category: ModuleCategory.Students,
  },
  {
    id: 3,
    name: 'Maestros',
    icon: 'account-multiple',
    route: AppScreens.Teachers,
    backgroundColor: '#359DFD',
    category: ModuleCategory.Teachers,
  },
  {
    id: 4,
    name: 'Agregar Maestro',
    icon: 'plus-circle-outline',
    route: AppScreens.AddTeacher,
    backgroundColor: '#FD3589',
    category: ModuleCategory.Teachers,
  },
  {
    id: 5,
    name: 'Grupos',
    icon: 'account-multiple',
    route: AppScreens.Groups,
    backgroundColor: '#359DFD',
    category: ModuleCategory.Groups,
  },
  {
    id: 6,
    name: 'Agregar Grupo',
    icon: 'plus-circle-outline',
    route: AppScreens.AddGroup,
    backgroundColor: '#FD3589',
    category: ModuleCategory.Groups,
  },
  {
    id: 7,
    name: 'Materias',
    icon: 'book-open-outline',
    route: AppScreens.Subjects,
    backgroundColor: '#359DFD',
    category: ModuleCategory.Subjects,
  },
  {
    id: 8,
    name: 'Agregar Materia',
    icon: 'book-plus-multiple',
    route: AppScreens.AddSubject,
    backgroundColor: '#FD3589',
    category: ModuleCategory.Subjects,
  },
  {
    id: 9,
    name: 'Clases',
    icon: 'clipboard-account',
    route: AppScreens.Classes,
    backgroundColor: '#359DFD',
    category: ModuleCategory.Classes,
  },
  {
    id: 10,
    name: 'Agregar Clase',
    icon: 'human-male-board',
    route: AppScreens.AddClass,
    backgroundColor: '#FD3589',
    category: ModuleCategory.Classes,
  },
];

const TeacherModules: UIModule[] = [
  {
    id: 11,
    name: 'Tomar asistencia',
    icon: 'book-outline',
    route: AppScreens.TakeAttendance_HOME,
    backgroundColor: '#359DFD',
    category: ModuleCategory.Teacher,
  },
  {
    id: 12,
    name: 'Registrar calificaciones',
    icon: 'view-list',
    route: AppScreens.RegisterGrades_HOME,
    backgroundColor: '#0BA162',
    category: ModuleCategory.Teacher,
  },
  {
    id: 13,
    name: 'Mis clases',
    icon: 'account-multiple',
    route: AppScreens.MyClasses_Teacher,
    backgroundColor: '#FD9535',
    category: ModuleCategory.Teacher,
  },
];

const StudentModules: UIModule[] = [
  {
    id: 14,
    name: 'Mis clases',
    icon: 'book-outline',
    route: AppScreens.MyClasses_Student,
    backgroundColor: '#0BA162',
    category: ModuleCategory.Student,
  },
];

const UIModulesList: UIModule[] = [...AdministratorModules, ...TeacherModules, ...StudentModules];

export default UIModulesList;
