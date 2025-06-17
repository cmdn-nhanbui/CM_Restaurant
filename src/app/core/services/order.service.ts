import type { CreateOrderPayload } from '../constants/types';
import request from './api.service';

export const createOrder = async (data: CreateOrderPayload) => {
  const response = await request.post('/orders', {
    table_uuid: data.tableId,
    order_items: data.orderItems,
  });

  return response?.data;
};
