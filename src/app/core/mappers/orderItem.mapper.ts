import type { OrderItem, OrderItemRow } from '../constants/types';
import { mapProductData } from './product.mapper';

export const mapOrderItem = (data: any): OrderItem => {
  return {
    id: data?.uuid,
    notes: data?.notes,
    quantity: data?.quantity,
    price: data?.price,
    status: data?.status,
    createdAt: data?.created_at,
    updatedAt: data?.updated_at,
    product: mapProductData(data?.product),
  };
};

export const mapOrderItemRow = (data: any): OrderItemRow => {
  return {
    uuid: data.uuid,
    table: data.table,
    name: data.name,
    quantity: data.quantity,
    price: data.price,
    total: data.total_payment,
    status: data.status,
    notes: data.notes,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    imageUrl: data?.image_url,
  };
};
