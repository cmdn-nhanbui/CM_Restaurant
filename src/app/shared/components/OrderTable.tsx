import { Tooltip } from 'antd';
import { useState } from 'react';

import { TableSkeleton } from './TableSkeleton';
import { TableStatus } from './TableStatus';
import { Icon } from './Icons';

import { formatVND } from '@/core/helpers/currencyHelper';
import type { Table } from '@/core/constants/types';
import { formatTimestamp } from '@/core/helpers/timeHelper';
import { CheckoutAdminDrawer } from './Drawers/CheckoutAdminDrawer';

export interface OrderTableProps {
  data: Table[];
  loading: boolean;
  onRefetch?: () => void;
}

export const OrderTable = ({ data = [], loading, onRefetch }: OrderTableProps) => {
  const [isShowCheckoutPayment, setIsShowCheckoutPayment] = useState<any>(null);

  //TODO Change list order-item list when admin remove order-item in checkout drawer
  const handleRemoveOrderItem = (removedId: string) => {
    setIsShowCheckoutPayment((prev: any) => {
      const newState = { ...prev };
      newState.order_items = newState.order_items.filter((item: any) => item.order_item_uuid !== removedId);
      return newState;
    });
  };

  return (
    <>
      <table className='w-full table-auto text-center text-white'>
        <thead>
          <tr className='border-b border-gray-700'>
            <th className='py-4 text-left pl-4'>Table ID</th>
            <th className='py-4 text-left pl-4'>Table</th>
            <th className='py-4 text-left'>Checkin At</th>
            <th className='py-4 text-center'>Order Items</th>
            <th className='py-4 text-right'>Total Payment</th>
            <th className='py-4'>Status</th>
            <th className='py-4'></th>
          </tr>
        </thead>
        <tbody className='overflow-y-auto h-full'>
          {loading && <TableSkeleton cols={4} />}
          {data?.map((table, idx) => (
            <tr key={idx} className='border-b border-gray-800 hover:bg-[#2a2a3a] transition'>
              <td className='py-4 text-left pl-4'>{table.id}</td>
              <td className='py-4 text-left pl-4'>{table.name}</td>
              <td className='py-4 text-left'>{formatTimestamp(table?.order?.created_at)}</td>
              <td className='py-4 text-center'>{table.orderItemQuantity}</td>
              <td className='py-4 text-right'>{formatVND(table.totalPayment)}</td>
              <td className='py-4'>
                <TableStatus onUpdated={onRefetch} status={table.status} tableId={table?.id} />
              </td>
              <td className='py-4'>
                {table?.order && (
                  <Tooltip title='Checkout'>
                    <button onClick={() => setIsShowCheckoutPayment(table?.order)} className='cursor-pointer'>
                      <Icon icon='credit-card' color='white' />
                    </button>
                  </Tooltip>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CheckoutAdminDrawer
        isOpen={isShowCheckoutPayment !== null}
        onClose={() => setIsShowCheckoutPayment(null)}
        orderData={isShowCheckoutPayment}
        onDelete={handleRemoveOrderItem}
      />
    </>
  );
};
