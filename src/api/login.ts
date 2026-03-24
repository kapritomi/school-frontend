import { type Logincredentials } from '../pages/Login/UseLogin';
import { apiClient } from './clients';

export const loginUser = async (credentials: Logincredentials) => {
  try {
    const response = await apiClient.post('/login', credentials);

    return response.data;
  } catch (error: any) {
    console.error('Belépési hiba:', error.response.data);
    throw error;
  }
};
