import { apiClient } from '../clients';
type requestData = {
  student_id: string;
  worksheet_id: string;
};
export const startSolving = async (data: requestData) => {
  try {
    const response = await apiClient.post('/start-solving', data);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
