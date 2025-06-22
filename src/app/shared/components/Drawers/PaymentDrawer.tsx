import { Drawer, message } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { PaymentCard } from '../PaymentCard';
import { Icon } from '../Icons';
import { Button } from '../Button';
import { useState } from 'react';

import { checkoutPayment } from '@/core/services/checkout.service';
import { useLocation } from 'react-router-dom';

type PaymentDrawerProps = {
  onClose: () => void;
  isOpen: boolean;
};

export const PaymentDrawer = ({ onClose, isOpen }: PaymentDrawerProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const placement: 'bottom' | 'right' = isMobile ? 'bottom' : 'right';
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'cash'>('credit_card');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tableId = searchParams.get('table_id');

  const handleCheckout = async () => {
    try {
      const res = await checkoutPayment(tableId as string, paymentMethod === 'cash' ? paymentMethod : 'vnpay');
      const url = res?.url;
      if (url) {
        window.location.href = url; // 👈 đảm bảo hoạt động cả desktop và mobile
      }
    } catch (error) {
      message.error('Checkout is error');
      console.error('Checkout error:', error);
    }
  };

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
