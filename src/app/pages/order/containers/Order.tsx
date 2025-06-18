import { useEffect, useState } from 'react';
import { Empty, Skeleton } from 'antd';

import { OrderItem } from '../components/OrderItem';
import { PaymentDrawer } from '@/shared/components/Drawers/PaymentDrawer';
import { Button } from '@/shared/components/Button';
import { ROUTES } from '@/core/constants/routes';
import { useGetOrderByTableId } from '@/shared/hooks/useOrder';
import { mapOrderItem } from '@/core/mappers/orderItem.mapper';
import type { OrderItem as OrderItemType } from '@/core/constants/types';
import { formatVND } from '@/core/helpers/currencyHelper';
import { getPusher } from '@/shared/hooks/usePusher';
import { PUSHER_CHANEL } from '@/core/constants/pusher';
import { LinkWithQuery } from '../components/LinkWithQuery';
import { useLocation } from 'react-router-dom';

const Order = () => {
  const [showCheckoutDrawer, setShowCheckoutDrawer] = useState<boolean>(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tableId = searchParams.get('table_id');

  const { data, isLoading, refetch, error } = useGetOrderByTableId(tableId || '');

  const orderItems: OrderItemType[] = data?.order_items?.map(mapOrderItem);

  const total = orderItems?.reduce((prev, curr) => prev + curr?.price * curr?.quantity, 0) || 0;

  const handleRemove = (id: string) => {};
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const pusher = getPusher();
    const channel = pusher.subscribe(PUSHER_CHANEL);

    channel.bind('UpdateOrder', (data: any) => {
      //!Check thêm điều kiện table_id
      if (tableId === data?.notificaton?.table_uuid) {
        refetch();
      }
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(PUSHER_CHANEL);
    };
  }, []);

  return (
    <>
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
                price={item?.price}
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
          <div className='border-b border-[var(--dark-line)] my-4'></div>
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

//header
