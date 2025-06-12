import { CartItem } from '@/shared/components/CartItem';
import { useSelector } from 'react-redux';
import { type RootState } from '@src/redux/store';
import { Button } from '@/shared/components/Button';

const Cart = () => {
  const { data } = useSelector((state: RootState) => state.cart);

  return (
    <div className='flex flex-col'>
      <h2 className='text-lg text-white font-semibold'>Orders #34562</h2>
      <div className='sm:py-6 py-4 flex justify-between text-white text-lg font-semibold border-b border-[var(--dark-line)]'>
        <span>Item</span>
        <div className='flex'>
          <span>Price</span>
        </div>
      </div>

      <div className='sm:py-6 py-4 flex flex-col sm:gap-6 gap-4'>
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
      </div>
      <Button>Confirm Order</Button>
    </div>
  );
};

export default Cart;
