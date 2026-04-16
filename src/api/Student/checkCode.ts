import { apiClient } from '../clients';
type requestData = {
  access_code: string;
  password: string;
};
export const checkCodeAndPassword = async (codeAndPassword: requestData) => {
  try {
    const response = await apiClient.post('/verify-access', codeAndPassword);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
