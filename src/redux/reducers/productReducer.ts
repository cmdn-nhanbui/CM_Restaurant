import type { Product } from '../../app/core/constants/types';
import { FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from '../types';

interface ProductState {
  data: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action: any): ProductState => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
