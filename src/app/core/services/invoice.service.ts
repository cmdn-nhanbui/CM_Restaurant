import request from './api.service';

export const getInvoiceData = async (page: number, perPage: number) => {
  const response = await request.get('/invoices', {
    params: {
      page,
      per_page: perPage,
    },
  });
  return response?.data;
};

export const getTotalDay = async () => {
  const response = await request.get('/invoices/total-amount-in-day');
  return response?.data;
};

export const getTotalWeek = async () => {
  const response = await request.get('/invoices/total-amount-in-week');
  return response?.data;
};

export const getTotalMonth = async () => {
  const response = await request.get('/invoices/total-amount-in-month');
  return response?.data;
};
