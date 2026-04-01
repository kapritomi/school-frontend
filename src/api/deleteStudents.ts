import { apiClient } from './clients';
export type deleteStudentsType = {
  student_ids: number[];
  classroom_id: number;
};
export const deleteStudents = async (data: deleteStudentsType) => {
  try {
    const response = await apiClient.post(`/students/delete`, data, {
      _authRequired: true,
    } as any);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
