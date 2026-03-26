import { apiClient } from './clients';
type updateStudent = {
  name: string;
};
export const updateStudent = async (
  data: updateStudent,
  student_id: number,
) => {
  try {
    const response = await apiClient.post(
      `/students/update/${student_id}`,
      data,
      {
        _authRequired: true,
      } as any,
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
