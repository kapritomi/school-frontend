import { apiClient } from '../clients';

export const uploadMedia = async (formData: FormData) => {
  try {
    const response = await apiClient.post('/media-upload', formData, {
      _authRequired: true,
    } as any);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
