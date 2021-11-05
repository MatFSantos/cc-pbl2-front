import axios from 'axios';

const url = 'http://26.90.73.25:5000';

export const ApiService = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
