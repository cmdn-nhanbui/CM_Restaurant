import { useEffect } from 'react';
import { Empty } from 'antd';
import { useSelector } from 'react-redux';

import { CartItem } from '@/shared/components/CartItem';
import { Button } from '@/shared/components/Button';
import { type RootState } from '@src/redux/store';

const Cart = () => {
  const { data } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='flex flex-col h-full justify-between'>
      {/* Header */}
      <div>
        <h2 className='text-lg text-white font-semibold'>Orders #34562</h2>
        <div className='sm:py-6 py-4 flex justify-between text-white text-lg font-semibold border-b border-[var(--dark-line)]'>
          <span>Item/Qty</span>
          <div className='flex'>
            <span className='mr-2'>Price</span>
          </div>
        </div>
      </div>

      {/* Scrollable list */}
      <div className='flex-1 overflow-y-auto  scrollbar-hidden sm:py-6 py-4 flex flex-col sm:gap-6 gap-4'>
        {data?.map((item, index) => (
          <CartItem
            id={item?.id}
            key={index}
            imageUrl={item?.imageUrl}
            name={item?.name}
            price={item?.price}
            quantity={item?.quantity}
            note={item?.note}
          />
        ))}

        {data?.length === 0 && (
          <Empty styles={{ description: { color: 'white', fontSize: 16 } }} description='Cart is empty' />
        )}
      </div>

      {/* Footer */}
      <div className='flex flex-col'>
        <div className='border-b border-[var(--dark-line)] my-4'></div>
        <div className='flex items-center justify-between my-4'>
          <span className='text-[var(--text-light)]'>Subtotal</span>
          <span className='text-white'>$ 21,03</span>
        </div>
        {!!data?.length && <Button>Confirm Order</Button>}
      </div>
    </div>
  );
};

export default Cart;
