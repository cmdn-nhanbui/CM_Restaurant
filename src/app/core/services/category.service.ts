import request from './api.service';

export const getCategories = async () => {
  const response = await request.get('/categories');
  return response?.data;
};
