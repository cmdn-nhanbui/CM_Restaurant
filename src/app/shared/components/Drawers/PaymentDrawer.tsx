import { Drawer } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { PaymentCard } from '../PaymentCard';
import { Icon } from '../Icons';
import { Button } from '../Button';
import { useState } from 'react';
import { OrderItem } from '@/pages/order/components/OrderItem';

type PaymentDrawerProps = {
  onClose: () => void;
  isOpen: boolean;
  orderData?: any;
};

export const PaymentDrawer = ({ onClose, isOpen, orderData }: PaymentDrawerProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const placement: 'bottom' | 'right' = isMobile ? 'bottom' : 'right';
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'cash'>('credit_card');

  return (
    <>
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
                id={item?.id}
                imageUrl={item?.product?.image_url}
                name={item?.product?.name}
                note={item?.notes}
                price={item?.price}
                quantity={item?.quantity}
                status={item?.status}
                total={item}
              />
            ))}
        </div>

        <div className='flex gap-2 pt-6 border-t border-[var(--dark-line)]'>
          <Button onClick={onClose} className='flex-1' outlined>
            Cancel
          </Button>
          <Button className='flex-1'>Confirm Payment</Button>
        </div>
      </Drawer>
    </>
  );
};
