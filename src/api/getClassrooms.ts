import { apiClient } from './clients';

export const getClassrooms = async () => {
  const response = await apiClient.get('/classrooms', { 
    _authRequired: true 
  } as any); 
  return response.data;
};