import { QUERY_KEYS } from '@/core/constants/queryKeys';
import { getInvoiceData, getTotalDay, getTotalMonth, getTotalWeek } from '@/core/services/invoice.service';
import { useQuery } from '@tanstack/react-query';

export const useGetInvoiceData = (page: number, perPage: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_INVOICE_DATA],
    queryFn: async () => {
      const data = await getInvoiceData(page, perPage);
      return data?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetRevenueInDay = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_DAY_REVENUE],
    queryFn: async () => {
      const data = await getTotalDay();
      return data?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetRevenueInWeek = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_WEEK_REVENUE],
    queryFn: async () => {
      const data = await getTotalWeek();
      return data?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetRevenueInMonth = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MONTH_REVENUE],
    queryFn: async () => {
      const data = await getTotalMonth();
      return data?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
