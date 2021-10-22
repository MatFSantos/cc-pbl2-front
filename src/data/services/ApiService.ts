import axios from 'axios';

const url = 'localhost';

export const ApiService = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});
