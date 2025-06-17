import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  UPDATE_QUANTITY_ITEM,
  UPDATE_QUANTITY_CART_ITEM,
  CLEAR_CART_DATA,
} from '../types';
import type { CartItem } from '../../app/core/constants/types';

export const addCartItem = (cartItem: CartItem) => ({ type: ADD_CART_ITEM, payload: cartItem });

export const removeCartItem = (id: number) => ({ type: REMOVE_CART_ITEM, payload: id });

export const updateCartQuantity = (id: number, quantity: number) => ({
  type: UPDATE_QUANTITY_CART_ITEM,
  payload: {
    id,
    quantity,
  },
});

export const updateQuantityItem = (data: CartItem) => ({
  type: UPDATE_QUANTITY_ITEM,
  payload: data,
});

export const clearCartData = () => ({ type: CLEAR_CART_DATA, payload: undefined });
