import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/core/constants/queryKeys';
import { getOrderByTableId } from '@/core/services/order.service';

export const useGetOrderByTableId = (tableId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ORDER_BY_TABLE_ID, tableId],
    queryFn: async () => {
      const response = await getOrderByTableId(tableId);
      return response?.data;
    },
    staleTime: 1000 * 60,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!tableId,
  });
};
