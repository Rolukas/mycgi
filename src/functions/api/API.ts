import { BASE_URL } from '@env';
import axios from 'axios';

export const baseURL: string = BASE_URL;

const API = axios.create({
  baseURL: `${baseURL}`,
});

export default API;
