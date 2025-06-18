import type { OrderItem } from '../constants/types';
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
