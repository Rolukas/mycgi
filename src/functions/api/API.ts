import axios from 'axios';

export const baseURL: string = 'http://192.168.1.69:3002/api';

const API = axios.create({
  baseURL: `${baseURL}`,
});

export default API;
