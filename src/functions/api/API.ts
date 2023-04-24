import axios from 'axios';

export const baseURL: string = 'http://localhost:3002/api';

const API = axios.create({
  baseURL: `${baseURL}`,
});

export default API;
