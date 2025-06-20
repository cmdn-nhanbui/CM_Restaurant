import request from './api.service';

export const checkoutPayment = async (tableId: string, method: string) => {
  const response = await request.post('/checkout', {
    table_uuid: tableId,
    method_payment: method,
  });
  return response?.data;
};

export const PaymentVerify = async (params: string) => {
  const response = await request.get(`/vnpay/return${params}`);
  return response?.data;
};
