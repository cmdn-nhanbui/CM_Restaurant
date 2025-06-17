import request from './api.service';

export const getUsersData = async (page: number, perPage: number) => {
  const response = await request.get('/users', {
    params: {
      page: page,
      per_page: perPage,
    },
  });
  return response?.data;
};
