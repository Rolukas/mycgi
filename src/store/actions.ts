import SignInActionPayload from 'src/types/actions';
import { LOG_OUT, SIGN_IN } from './types';

export const signInAction = (payload: SignInActionPayload) => {
  return {
    type: SIGN_IN,
    payload,
  };
};

export const logOutAction = () => {
  return {
    type: LOG_OUT,
  };
};
