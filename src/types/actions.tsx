import { Module } from './module';

export default interface SignInActionPayload {
  allowedModules: Module[];
  profileId: number | null;
  profileName: string;
  authToken: string;
  isLoggedIn: boolean;
}
