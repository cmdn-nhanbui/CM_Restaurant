import { QUERY_KEYS } from '@/core/constants/queryKeys';
import type { TableSelectItem } from '@/core/constants/types';
import { getListTable, getTableById, getTablesData } from '@/core/services/table.service';
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

export const useGetListTable = (authenticated: boolean) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_LIST_TABLE],
    queryFn: async () => {
      const data = await getListTable(1, 10);
      const tableData: TableSelectItem[] = data?.data?.docs?.map((item: any): TableSelectItem => {
        return {
          id: item?.uuid,
          name: item?.name,
          createdAt: item?.created_at,
          updatedAt: item?.updated_at,
          status: item?.status,
        };
      });
      return tableData;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // Giữ cache trong 5 phút
    retry: 1,
    enabled: authenticated,
  });
};

export const useGetTableById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TABLE_BY_ID, id],
    queryFn: async () => {
      const data = await getTableById(id);
      const table = data?.data;
      const tableData: TableSelectItem = {
        id: table?.uuid,
        name: table?.name,
        status: table?.status,
        createdAt: table?.created_at,
        updatedAt: table?.updated_at,
      };
      return tableData;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // Giữ cache trong 5 phút
    retry: 3,
    enabled: !!id,
  });
};
