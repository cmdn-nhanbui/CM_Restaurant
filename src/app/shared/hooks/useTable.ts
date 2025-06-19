import { QUERY_KEYS } from '@/core/constants/queryKeys';
import { getTablesData } from '@/core/services/table.service';
import { useQuery } from '@tanstack/react-query';

export const useGetTables = (page: number, perPage: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TABLES],
    queryFn: async () => {
      const data = await getTablesData(page, perPage);
      return data?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Giữ cache trong 5 phút
  });
};
