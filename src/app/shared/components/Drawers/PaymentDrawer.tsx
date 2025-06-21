import { Drawer, message } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { PaymentCard } from '../PaymentCard';
import { Icon } from '../Icons';
import { Button } from '../Button';
import { useState } from 'react';
import { OrderItem } from '@/pages/order/components/OrderItem';
import { cancleOrderItem } from '@/core/services/orderItem.service';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/core/constants/queryKeys';
import { checkoutPayment } from '@/core/services/checkout.service';
import { useLocation } from 'react-router-dom';

type PaymentDrawerProps = {
  onClose: () => void;
  isOpen: boolean;
  orderData?: any;
};

export const PaymentDrawer = ({ onClose, isOpen, orderData }: PaymentDrawerProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const placement: 'bottom' | 'right' = isMobile ? 'bottom' : 'right';
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'cash'>('credit_card');
  const queryClient = useQueryClient();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tableId = searchParams.get('table_id');

  const handleDeleteOrderItem = (id: string) => {
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

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_TABLES],
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

  const handleCheckout = async () => {
    try {
      const res = await checkoutPayment(tableId as string, paymentMethod === 'cash' ? paymentMethod : 'vnpay');
      const url = res?.url;
      if (url) {
        window.location.href = url; // 👈 đảm bảo hoạt động cả desktop và mobile
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <>
      {contextHolder}
      <Drawer
        styles={{
          content: {
            backgroundColor: 'var(--background-secondary)',
            borderTop: '1px solid var(--dark-line)',
          },
          body: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={isOpen}
        key={placement}
      >
        <div className='flex gap-2 pb-3'>
          <PaymentCard
            label='Credit Card'
            method='credit_card'
            selected={paymentMethod === 'credit_card'}
            icon={<Icon icon='credit-card' color='inherit' />}
            onSelect={() => setPaymentMethod('credit_card')}
          />
          <PaymentCard
            selected={paymentMethod === 'cash'}
            label='Pay at the table'
            method='cash'
            icon={<Icon icon='wallet' color='inherit' />}
            onSelect={() => setPaymentMethod('cash')}
          />
        </div>

        <div className='h-full overflow-y-auto scrollbar-hidden py-3'>
          {orderData &&
            orderData?.order_items?.map((item: any, index: number) => (
              <OrderItem
                key={index}
                id={item?.order_item_uuid}
                imageUrl={item?.product?.image_url}
                name={item?.product?.name}
                note={item?.notes}
                price={item?.price}
                quantity={item?.quantity}
                status={item?.status}
                total={item}
                onDelete={handleDeleteOrderItem}
              />
            ))}
        </div>

        <div className='flex gap-2 pt-6 border-t border-[var(--dark-line)]'>
          <Button onClick={onClose} className='flex-1' outlined>
            Cancel
          </Button>
          <Button onClick={handleCheckout} className='flex-1'>
            Confirm Payment
          </Button>
        </div>
      </Drawer>
    </>
  );
};
