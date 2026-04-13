
import { apiClient } from './clients';
type classroomObject ={
    name : string
}
export const createClassroom = async (classroomData: classroomObject) => {
  try {
    const response = await apiClient.post('/classrooms', classroomData, {
      _authRequired: true,
    } as any);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
