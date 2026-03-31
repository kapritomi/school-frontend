import { apiClient } from './clients';

export const getWorksheets = async () => {
  const response = await apiClient.get('/worksheets', {
    _authRequired: true,
  } as any);
  return response.data;
};
