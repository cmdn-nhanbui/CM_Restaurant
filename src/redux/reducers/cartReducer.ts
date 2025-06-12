import type { CartItem } from '../../app/core/constants/types';
import { ADD_CART_ITEM, UPDATE_QUANTITY_CART_ITEM, REMOVE_CART_ITEM, UPDATE_QUANTITY_ITEM } from '../types';

interface CartState {
  data: CartItem[];
}

// const saveCartToLocalStorage = (cartData: CartItem[]): void => {
//   const cartJSON = JSON.stringify(cartData);
//   setLS(KEYS.CART, cartJSON);
// };

const initialState: CartState = {
  data: [
    {
      id: 2,
      imageUrl:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Noodles-with-chilli-oil-eggs-6ec34e9.jpg',
      name: 'Noodles with crispy chilli oil eggs',
      price: 15.0,
      quantity: 2,
      note: '',
    },
  ],
};

const cartReducer = (state = initialState, action: any): CartState => {
  const newCartData = [...state.data];
  const cartItem = action.payload;

  switch (action.type) {
    case ADD_CART_ITEM: {
      const isCartExisted = newCartData?.find((item) => item?.id === cartItem?.id);

      if (!isCartExisted) {
        newCartData.push(cartItem);
      } else {
        isCartExisted.quantity += 1;
      }

      return {
        ...state,
        data: newCartData,
      };
    }

    case UPDATE_QUANTITY_CART_ITEM: {
      const updateItem = newCartData?.find((cartItem) => cartItem?.id === action?.payload?.id);
      if (updateItem) {
        updateItem.quantity = action?.payload?.quantity;
      }
      return { ...state, data: newCartData };
    }
    case REMOVE_CART_ITEM: {
      const id = action.payload;
      const removedArray = state.data?.filter((item) => item?.id !== id);

      return { ...state, data: removedArray };
    }

    case UPDATE_QUANTITY_ITEM: {
      const data = action.payload;
      const updateItem = newCartData?.find((cartItem) => cartItem?.id === action?.payload?.id);
      if (updateItem) {
        updateItem.note = data.note;
        updateItem.price = data.price || updateItem;
      }
      return { ...state, data: newCartData };
    }

    default:
      return state;
  }
};

export default cartReducer;
