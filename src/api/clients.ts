import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER}`,
  withCredentials: true, 
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
});


apiClient.interceptors.request.use(
  (config) => {

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {

      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);