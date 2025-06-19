import request from './api.service';

export const getTablesData = async (page: number, perPage: number) => {
  const response = await request.get('/tables', {
    params: {
      page,
      per_page: perPage,
    },
  });
  return response?.data;
};

export const updateStatusTable = async (id: string, status: string) => {
  const response = await request.put(`/tables/${id}`, {
    status,
  });
  return response?.data;
};
