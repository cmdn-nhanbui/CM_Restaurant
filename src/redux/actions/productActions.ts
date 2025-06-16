import request from '../../app/core/services/api.service';
import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_REQUEST } from '../types';

const PRODUCTS_DATA_URL = '/data/products.json';

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductSuccess = (products: any[]) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductFail = (error: string) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchProducts = () => {
  return (dispatch: any) => {
    dispatch(fetchProductsRequest());
    request
      .get(PRODUCTS_DATA_URL)
      .then((response) => {
        dispatch(fetchProductSuccess(response?.data?.products));
      })
      .catch((error) => {
        dispatch(fetchProductFail(error.message));
      });
  };
};
