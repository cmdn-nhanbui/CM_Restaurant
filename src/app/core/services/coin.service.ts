import request from './api.service';

export const getCoinsData = async ({ page, perPage }: { page: number; perPage: number }) => {
  const response = await request.get(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}`,
  );
  return response?.data;
};

export const getCoinById = async (id: string) => {
  const response = await request.get(`/coins/${id}`);
  return response?.data;
};
