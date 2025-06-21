import { formatVND } from '@/core/helpers/currencyHelper';
import { Badge, type BadColor } from './Badge';
import { useState } from 'react';
import { OrderItemModal } from './Modals/OrderItemModal';
import type { OrderItemRow } from '@/core/constants/types';
import { Image } from './Image';
import { TableSkeleton } from './TableSkeleton';
import { DeleteOutlined } from '@ant-design/icons';
import { ConfirmModal } from './Modals/ConfirmModal';
import { message } from 'antd';
import { cancleOrderItem } from '@/core/services/orderItem.service';
import { useQueryClient } from '@tanstack/react-query';

type OrderStatus = 'pending' | 'preparing' | 'completed';

const colorMapping: Record<OrderStatus, string> = {
  pending: 'orange',
  preparing: 'blue',
  completed: 'green',
};

interface OrderTableProps {
  sort?: OrderStatus | 'all';
  data: OrderItemRow[];
  onReload: () => void;
  isLoading?: boolean;
}

export const OrderItemTable = ({ data, onReload, isLoading }: OrderTableProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItemRow | null>(null);
  const [deleteOrderItemId, setDeleteOrderItemId] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;

  const handleUpdated = () => {
    setSelectedOrderItem(null);
    return onReload();
  };

  const handleDeleteOrderItem = () => {
    const cancleRequest = async () => {
      const key = 'updatable';

      messageApi.open({
        key,
        type: 'loading',
        content: 'Deleting...',
      });

      try {
        await cancleOrderItem(deleteOrderItemId as string);
        messageApi.open({
          key,
          type: 'success',
          content: 'Cancle order item successfully',
          duration: 2,
        });
        setDeleteOrderItemId(null);

        // queryClient.setQueryData<any>([QUERY_KEYS.GET_ORDER_ITEM_DATA, page, 15], (oldData: any) => {
        //   const newState = { ...oldData };
        //   console.log(newState);
        //   // newState.order_items = newState?.order_items?.filter((orderItem: any) => orderItem.uuid !== id);
        //   return newState;
        // });
        return onReload();
      } catch (error) {
        console.log(error);
        messageApi.open({
          key,
          type: 'error',
          content: 'Cancle order item unsuccessfully',
          duration: 2,
        });
      }
    };
    cancleRequest();
  };

  return (
    <>
      {contextHolder}
      <table className='w-full table-auto text-center text-white'>
        <thead>
          <tr className='border-b border-gray-700'>
            <th className='py-4 text-left'></th>
            <th className='py-4 text-left'>Order Item Id</th>
            <th className='py-4 text-left'>Table</th>
            <th className='py-4 text-left'>Name</th>
            <th className='py-4 text-left'>Quantity</th>
            <th className='py-4 text-right'>Price</th>
            <th className='py-4 text-right'>Total Payment</th>
            <th className='py-4'>Status</th>
            <th className='py-4'></th>
          </tr>
        </thead>
        <tbody className='overflow-y-auto h-full'>
          {isLoading && <TableSkeleton cols={8} />}
          {data?.map((order, index) => (
            <tr
              onClick={() => setSelectedOrderItem(order)}
              key={index}
              className='border-b border-gray-800 hover:bg-[#2a2a3a] transition'
            >
              <td className='pl-4'>
                <Image className={`w-10 h-10 rounded-full`} alt='' src={order?.imageUrl} />
              </td>
              <td className='py-4'>
                <div className='flex items-center justify-start gap-3'>{order?.uuid}</div>
              </td>
              <td className='py-4 text-left'>{order.table}</td>
              <td className='py-4 text-left'>{order.name}</td>
              <td className='py-4 text-left'>{order.quantity}</td>
              <td className='py-4 text-right'>{formatVND(order.price)}</td>
              <td className='py-4 text-right'>{formatVND(order.total)}</td>
              <td className='py-4'>
                <Badge color={colorMapping[order.status] as BadColor}>{order.status}</Badge>
              </td>
              <td className='py-4'>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteOrderItemId(order.uuid);
                  }}
                  className='cursor-pointer px-3'
                >
                  <DeleteOutlined />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <OrderItemModal
        onCancel={() => setSelectedOrderItem(null)}
        onOk={handleUpdated}
        isModalOpen={selectedOrderItem !== null}
        data={selectedOrderItem}
      />

      <ConfirmModal
        onOk={handleDeleteOrderItem}
        onCancel={() => setDeleteOrderItemId(null)}
        isModalOpen={deleteOrderItemId !== null}
        title='Delete this order item'
        description='Do you really want to delete this records? This process cannot be undone.'
      />
    </>
  );
};
