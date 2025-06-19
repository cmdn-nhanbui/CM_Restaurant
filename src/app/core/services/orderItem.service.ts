import type { OrderItemStatus } from '../constants/types';
import request from './api.service';

export const cancleOrderItem = async (orderItemId: string) => {
  const response = await request.delete(`/order-items/${orderItemId}`);
  return response?.data;
};

export const getOrderItemData = async (page: number, perPage: number) => {
  const response = await request.get('/order-items', {
    params: {
      page,
      per_page: perPage,
    },
  });
  return response?.data;
};

interface UpdateOrderItemPayload {
  id: string;
  notes: string;
  quantity: number;
  status: OrderItemStatus;
}

export const updateOrderItem = async (data: UpdateOrderItemPayload) => {
  const response = await request.put(`/order-items/${data?.id}`, {
    notes: data?.notes,
    quantity: data?.quantity,
    status: data?.status,
  });
  return response?.data;
};
