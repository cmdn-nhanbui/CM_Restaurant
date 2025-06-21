import { QUERY_KEYS } from '@/core/constants/queryKeys';
import { getOrderItemData } from '@/core/services/orderItem.service';
import { useQuery } from '@tanstack/react-query';

interface QueryParams {
  page: number;
  perPage: number;
}

export const useOrderItemData = ({ page, perPage }: QueryParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ORDER_ITEM_DATA, page, perPage],
    queryFn: async () => {
      const response = await getOrderItemData(page, perPage);
      return response?.data;
    },
    staleTime: 1000 * 20,
    refetchOnWindowFocus: false,
  });
};
