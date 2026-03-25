// api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER}`,
});
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.config?._authRequired) {
      sessionStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
