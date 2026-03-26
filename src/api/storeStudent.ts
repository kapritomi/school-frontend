import type { studentObject } from '../pages/ClassView/useClassEdit';
import { apiClient } from './clients';

export const storeStudent = async (student: studentObject) => {
  try {
    const response = await apiClient.post('/students/upload', student, {
      _authRequired: true,
    } as any);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
