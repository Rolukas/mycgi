import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const baseURL: string = 'http://localhost:3002/api';

const token: string | null = await AsyncStorage.getItem('authToken');

const API = axios.create({
  baseURL: `${baseURL}`,
});

export default API;
