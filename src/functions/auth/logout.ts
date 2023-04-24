import AsyncStorage from '@react-native-async-storage/async-storage';
import { logOutAction } from '../../store/actions';
import { store } from '../../store/store';

const logOut = () => {
  AsyncStorage.removeItem('authToken');
  store.dispatch(logOutAction());
};

export default logOut;
