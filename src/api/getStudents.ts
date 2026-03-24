import { apiClient } from './clients';

export const getStudents = async (classroomId:number) => {
  const response = await apiClient.get(`/classrooms/${classroomId}`, { 
    _authRequired: true 
  } as any); 
  return response.data;
};