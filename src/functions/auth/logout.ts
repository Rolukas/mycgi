import { logOutAction } from '../../store/actions';
import { store } from '../../store/store';

const logOut = () => {
  store.dispatch(logOutAction());
};

export default logOut;
