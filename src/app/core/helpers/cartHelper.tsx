import type { CartItem } from '../constants/types';

export const checkCartQuantity = (cartItems: CartItem[]) => {
  return !cartItems?.some((item) => item?.quantity <= 0);
};
