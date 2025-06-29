import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Empty, message, Skeleton } from 'antd';
import { useQueryClient } from '@tanstack/react-query';

import { LinkWithQuery } from '../components/LinkWithQuery';
import { OrderItem } from '../components/OrderItem';
import { Button } from '@/shared/components/Button';
import { PaymentDrawer } from '@/shared/components/Drawers/PaymentDrawer';

import type { Order, OrderItem as OrderItemType } from '@/core/constants/types';
import { useGetOrderByTableId } from '@/shared/hooks/useOrder';
import { cancleOrderItem } from '@/core/services/orderItem.service';
import { QUERY_KEYS } from '@/core/constants/queryKeys';
import { ROUTES } from '@/core/constants/routes';

import { mapOrderItem } from '@/core/mappers/orderItem.mapper';
import { formatVND } from '@/core/helpers/currencyHelper';

const Order = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showCheckoutDrawer, setShowCheckoutDrawer] = useState<boolean>(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tableId = searchParams.get('table_id');

  const { data, isLoading, error } = useGetOrderByTableId(tableId || '');

  const queryClient = useQueryClient();
  const orderItems: OrderItemType[] = data?.order_items?.map(mapOrderItem);

  const total = orderItems?.reduce((prev, curr) => prev + (curr?.product?.price || 0) * curr?.quantity, 0) || 0;

  const handleRemove = (id: string) => {
    const cancleRequest = async () => {
      const key = 'updatable';

      messageApi.open({
        key,
        type: 'loading',
        content: 'Processing...',
      });

      try {
        await cancleOrderItem(id);

        messageApi.open({
          key,
          type: 'success',
          content: 'Cancle order item successfully',
          duration: 2,
        });

        queryClient.setQueryData<any>([QUERY_KEYS.GET_ORDER_BY_TABLE_ID, tableId], (oldData: any) => {
          const newState = { ...oldData };
          newState.order_items = newState?.order_items?.filter((orderItem: any) => orderItem.uuid !== id);
          return newState;
        });
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {contextHolder}

      <div className='flex flex-col h-full justify-between'>
        {/* Header */}
        <div className='sm:py-6 py-4 flex justify-between text-white text-lg font-semibold border-b border-[var(--dark-line)]'>
          <h2 className='text-lg text-white font-semibold'>Your Orders</h2>
          <span>{data?.table?.name}</span>
        </div>

        {/* Scrollable list */}
        {
          <div className='flex-1 overflow-y-auto sm:py-6 py-4 flex flex-col sm:gap-6 gap-4'>
            {error && (
              <Empty
                styles={{ description: { color: 'white', fontSize: 16 } }}
                description='Not found order in table'
              />
            )}

            {isLoading &&
              Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton.Node key={idx} style={{ width: '100%', backgroundColor: 'var(--form-background)' }} />
              ))}

            {orderItems?.map((item, index) => (
              <OrderItem
                key={index}
                id={item.id}
                name={item?.product?.name || ''}
                note={item?.notes}
                quantity={item?.quantity}
                price={item?.product?.price || 0}
                imageUrl={item?.product?.imageUrl || ''}
                status={item?.status}
                total={total}
                onDelete={handleRemove}
              />
            ))}

            {orderItems?.length === 0 && (
              <>
                <Empty styles={{ description: { color: 'white', fontSize: 16 } }} description='Your orders is empty' />
                <LinkWithQuery to={ROUTES.ROOT}>
                  <Button className='w-full' outlined>
                    Order Now
                  </Button>
                </LinkWithQuery>
              </>
            )}
          </div>
        }

        {/* Footer */}
        <div className='flex flex-col'>
          <div className='border-b border-[var(--dark-line)] mb-4'></div>
          <div className='flex items-center justify-between my-4'>
            <span className='text-[var(--text-light)]'>Subtotal</span>
            <span className='text-white'>{formatVND(total)}</span>
          </div>
          {!!orderItems?.length && <Button onClick={() => setShowCheckoutDrawer(true)}>Checkout</Button>}
        </div>
      </div>

      <PaymentDrawer isOpen={showCheckoutDrawer} onClose={() => setShowCheckoutDrawer(false)} />
    </>
  );
};

export default Order;
