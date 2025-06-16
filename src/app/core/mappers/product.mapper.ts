import type { Product } from '../constants/types';

export const mapProductData = (data: any): Product => {
  return {
    id: data?.id,
    category: data?.category,
    imageUrl: data?.image_url,
    name: data?.name,
    price: data?.price,
    orderQuantity: data?.order_quantity,
    quantity: data?.quantity,
  };
};
