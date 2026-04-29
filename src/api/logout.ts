import { apiClient } from './clients';

export const logout = async () => {
  const response = await apiClient.get('/logout', {
    _authRequired: true,
  } as any);
  return response.data;
};
