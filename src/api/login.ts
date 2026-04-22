import { type Logincredentials } from '../pages/Login/UseLogin';
import { apiClient } from './clients';

export const loginUser = async (credentials: Logincredentials) => {
  try {
    await apiClient.get('../sanctum/csrf-cookie');

    const response = await apiClient.post('/login', credentials);

    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Szerver hiba történt';
    console.error('Belépési hiba:', message);
    throw new Error(message);
  }
};
