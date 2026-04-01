import { apiClient } from './clients';

export const deleteClassroom = async (classroom_id: number) => {
  try {
    const response = await apiClient.delete(`/classrooms/${classroom_id}`, {
      _authRequired: true,
    } as any);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
