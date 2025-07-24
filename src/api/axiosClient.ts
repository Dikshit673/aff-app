import axios from 'axios';

const axiosClient = axios.create({
  baseURL: String(import.meta.env.VITE_API_URL),
});

// Add token from Redux store/localStorage
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
