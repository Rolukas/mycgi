import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UIModulesList from '../constants/modules';
import { selectAllowedModules } from '../store/selectors';
import { Module, UIModule } from '../types/module';

const useBuildModules = () => {
  const allowedModules: Module[] = useSelector(selectAllowedModules);
  const [modules, setModules] = useState<UIModule[]>([]);

  useEffect(() => {
    const filteredModules: UIModule[] = [];
    UIModulesList.forEach(module => {
      const searchModule = allowedModules.find(allowedModule => allowedModule.id === module.id);
      if (searchModule) {
        filteredModules.push(module);
      }
    });
    setModules(filteredModules);
  }, [allowedModules]);

  return modules;
};

export default useBuildModules;
