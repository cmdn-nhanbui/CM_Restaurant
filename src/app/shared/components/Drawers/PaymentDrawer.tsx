import { Drawer } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { PaymentCard } from '../PaymentCard';
import { Icon } from '../Icons';
import { Button } from '../Button';

type PaymentDrawerProps = {
  onClose: () => void;
  isOpen: boolean;
};
export const PaymentDrawer = ({ onClose, isOpen }: PaymentDrawerProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const placement: 'bottom' | 'right' = isMobile ? 'bottom' : 'right';

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
        <div className='flex gap-2'>
          <PaymentCard
            label='Credit Card'
            method='credit_card'
            selected
            icon={<Icon icon='credit-card' color='inherit' />}
          />
          <PaymentCard label='Cash' method='cash' icon={<Icon icon='wallet' color='inherit' />} />
        </div>

        <div className='flex gap-2'>
          <Button onClick={onClose} className='flex-1' outlined>
            Cancel
          </Button>
          <Button className='flex-1'>Confirm Payment</Button>
        </div>
      </Drawer>
    </>
  );
};
