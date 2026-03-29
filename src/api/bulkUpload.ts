import { apiClient } from './clients';

export const bulkUpload = async (file: File, classroom_id: string) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('classroom_id', String(classroom_id));
  try {
    const response = await apiClient.post('/students/bulk-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      _authRequired: true,
    } as any);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
