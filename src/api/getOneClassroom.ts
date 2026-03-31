import { apiClient } from './clients';

export const getOneClassroom = async (classroomId: number) => {
  const response = await apiClient.get(`/classrooms/${classroomId}`, {
    _authRequired: true,
  } as any);
  return response.data;
};
