import axios from 'axios';

const baseURL: string = 'http://localhost:3002/api';

const API = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
