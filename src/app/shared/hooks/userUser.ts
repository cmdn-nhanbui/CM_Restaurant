import { QUERY_KEYS } from '@/core/constants/queryKeys';
import { getUsersData } from '@/core/services/user.service';
import { useQuery } from '@tanstack/react-query';

interface UseUserDataParams {
  page: number;
  perPage: number;
}

export const useUserData = ({ page, perPage }: UseUserDataParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_DATA, page, perPage],
    queryFn: async () => {
      const response = await getUsersData(page, perPage);
      return response?.data;
    },
    staleTime: 1000 * 60,
  });
};
