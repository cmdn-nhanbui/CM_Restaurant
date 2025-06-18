import { Drawer } from 'antd';
import Cart from '@/pages/cart/containers/Cart';

type CartDrawerProps = {
  onClose: () => void;
  isOpen: boolean;
};

export const CartDrawer = ({ onClose, isOpen }: CartDrawerProps) => {
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
        <Cart />
      </Drawer>
    </>
  );
};
