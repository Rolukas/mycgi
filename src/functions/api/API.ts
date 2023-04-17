import axios from 'axios';
import { store } from '../../store/store';

const baseURL: string = 'http://localhost:3002/api';

const token = store.getState().authToken;

console.log('=> Running API.ts', token);

const API = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default API;
