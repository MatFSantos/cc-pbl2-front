import axios from 'axios';

const url = 'http://localhost:5000';

export const ApiService = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
