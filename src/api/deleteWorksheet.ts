import { apiClient } from './clients';

export const deleteWorksheet = async (worksheet_id: number) => {
  try {
    const response = await apiClient.delete(`/worksheets/${worksheet_id}`, {
      _authRequired: true,
    } as any);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
