import { Module } from '../types/module';
import { LOG_OUT, SIGN_IN } from './types';

export interface MainReducerState {
  allowedModules: Module[];
  profileId: number | null;
  profileName: string;
  authToken: string;
  isLoggedIn: boolean;
}

// Initial State
const initialState: MainReducerState = {
  allowedModules: [],
  profileId: null,
  profileName: '',
  authToken: '',
  isLoggedIn: false,
};

// Reducers (Modifies The State And Returns A New State)
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        isLoggedIn: true,
        authToken: action.payload.authToken,
        profileId: action.payload.profileId,
        profileName: action.payload.profileName,
        allowedModules: action.payload.allowedModules,
      };
    }
    case LOG_OUT: {
      return {
        ...initialState,
      };
    }
    // Default
    default:
      return state;
  }
};
// Exports
export default mainReducer;
