import { createSelector } from 'reselect';
import { MainReducerState } from './mainReducer';

const selectStore = (state: MainReducerState) => state;
export const selectAllowedModules = createSelector(selectStore, state => state.allowedModules);
export const selectIsLoggedIn = createSelector(selectStore, state => state.isLoggedIn);
export const selectAuthToken = createSelector(selectStore, state => state.authToken);
