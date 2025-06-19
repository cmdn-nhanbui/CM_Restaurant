import { Drawer } from 'antd';
import Order from '@/pages/order/containers/Order';

type CartDrawerProps = {
  onClose: () => void;
  isOpen: boolean;
};

export const OrderDrawer = ({ onClose, isOpen }: CartDrawerProps) => {
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
        placement={'right'}
        closable={false}
        onClose={onClose}
        open={isOpen}
        key={'right'}
      >
        <Order />
      </Drawer>
    </>
  );
};
