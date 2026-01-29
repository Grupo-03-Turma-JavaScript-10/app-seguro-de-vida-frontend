import axios from 'axios';

const api = axios.create({
  baseURL: 'https://segura-vida.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
