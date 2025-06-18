import { QUERY_KEYS } from '@/core/constants/queryKeys';
import type { User } from '@/core/constants/types';
import { getMyProfile } from '@/core/services/auth.service';
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

export const useGetProfile = (userData: User | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PROFILE],
    queryFn: async () => {
      if (userData) return userData; // Dùng cache trước nếu có
      const data = await getMyProfile();
      return data?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Giữ cache trong 5 phút
  });
};
