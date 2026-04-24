import { apiClient } from '../clients';

export const getOneWorkSheet = async (wsId: number) => {
  const response = await apiClient.get(`/worksheets/${wsId}`, {
    _authRequired: true,
  } as any);
  return response.data;
};
