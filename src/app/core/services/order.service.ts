import type { CreateOrderPayload } from '../constants/types';
import request from './api.service';

export const createOrder = async (data: CreateOrderPayload) => {
  const response = await request.post('/orders', {
    table_uuid: data.tableId,
    order_items: data.orderItems,
  });

  return response?.data;
};

export const getOrders = async (page: number, perPage: number, filter: string) => {
  const response = await request.get('/orders', {
    params: {
      page,
      per_page: perPage,
      filter,
    },
  });
  return response?.data;
};

export const getOrderByTableId = async (id: string) => {
  const response = await request.get(`/orders/table/${id}`);
  return response?.data;
};
