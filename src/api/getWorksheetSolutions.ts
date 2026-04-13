import { apiClient } from './clients';

export const getWorksheetSolutions = async (worksheet_id:string) => {
  const response = await apiClient.get(`/worksheetUserSolutions/${worksheet_id}`, {
    _authRequired: true,
  } as any);
  return response.data;
};
