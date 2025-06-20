import request from './api.service';

// Get table kem theo du lieu order
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

// Get list talbe (name,id)
export const getListTable = async (page: number, perPage: number) => {
  const response = await request.get('/tables/all', {
    params: {
      page,
      per_page: perPage,
    },
  });
  return response?.data;
};
