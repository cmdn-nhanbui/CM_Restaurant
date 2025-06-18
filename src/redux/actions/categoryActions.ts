import { getCategories } from '@/core/services/category.service';
import { FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_REQUEST } from '../types';
import type { Category } from '@/core/constants/types';

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (categories: Category[]) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFail = (error: string) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const fetchCategories = () => {
  return (dispatch: any) => {
    dispatch(fetchCategoriesRequest());
    getCategories()
      .then((response) => {
        const categories = response?.data?.docs;
        const payloadData: Category[] = categories?.map((category: any) => ({
          id: category?.id,
          name: category?.name,
        }));
        dispatch(fetchCategoriesSuccess(payloadData));
      })
      .catch((error) => {
        dispatch(fetchCategoriesFail(error.message));
      });
  };
};
