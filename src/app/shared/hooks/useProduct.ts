import { QUERY_KEYS } from '@/core/constants/queryKeys';
import { getProducts, getProductsByCategoryId } from '@/core/services/product.service';
import { useQuery } from '@tanstack/react-query';

interface UseProductDataParams {
  page: number;
  perPage: number;
  sort: string;
}

interface UseProductByCategoryParams extends UseProductDataParams {
  categoryId: number;
}

export const useProductData = ({ page, perPage, sort = 'name_asc' }: UseProductDataParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_DATA, page, perPage, sort],
    queryFn: async () => {
      const response = await getProducts({ page, perPage, sort });
      return response?.data;
    },
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useProductByCategory = ({ page, perPage, sort = 'name_asc', categoryId }: UseProductByCategoryParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_BY_CATEGORY, page, perPage, sort, categoryId],
    queryFn: async () => {
      const response = await getProductsByCategoryId({ page, perPage, sort, categoryId });
      return response?.data;
    },
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
