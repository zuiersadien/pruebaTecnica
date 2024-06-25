
import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
