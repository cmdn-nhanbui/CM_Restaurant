import type { Table } from '../constants/types';

export const mapTableData = (data: any): Table => {
  return {
    id: data?.id,
    name: data?.name,
    status: data?.status,
    totalPayment: data?.order?.total || 0,
    orderItemQuantity: data?.order?.order_items?.length,
    order: data?.order,
  };
};
