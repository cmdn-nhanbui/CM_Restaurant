import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';

import { OrderItem, type OrderItemProps } from '../components/OrderItem';
import { PaymentDrawer } from '@/shared/components/Drawers/PaymentDrawer';
import { Button } from '@/shared/components/Button';
import { ROUTES } from '@/core/constants/routes';

const Order = () => {
  const [orders, setOrders] = useState<OrderItemProps[]>([
    {
      id: 1,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO0-kmjHTbm30Ex4qg8jr5-pK3TZmQzqxNJg&s',
      name: 'Salted Pasta with mushroom sauce',
      price: 18,
      quantity: 1,
      status: 'preparing',
      total: 18,
      note: 'No picy',
    },
    {
      id: 2,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO0-kmjHTbm30Ex4qg8jr5-pK3TZmQzqxNJg&s',
      name: 'Salted Pasta with mushroom sauce',
      price: 18,
      quantity: 1,
      status: 'pending',
      total: 18,
      note: '',
    },
  ]);

  const [showCheckoutDrawer, setShowCheckoutDrawer] = useState<boolean>(false);

  const handleRemove = (id: number) => {
    setOrders((prev) => {
      return [...prev]?.filter((item) => item.id !== id);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className='flex flex-col h-full justify-between'>
        {/* Header */}
        <div className='sm:py-6 py-4 flex justify-between text-white text-lg font-semibold border-b border-[var(--dark-line)]'>
          <h2 className='text-lg text-white font-semibold'>Your Orders</h2>
          <span>Tabel: 01</span>
        </div>

        {/* Scrollable list */}
        <div className='flex-1 overflow-y-auto sm:py-6 py-4 flex flex-col sm:gap-6 gap-4'>
          {orders?.map((item, index) => (
            <OrderItem
              key={index}
              id={item.id}
              name={item.name}
              note={item.note}
              quantity={item.quantity}
              price={item.price}
              imageUrl={item.imageUrl}
              status={item.status}
              total={item.total}
              onDelete={handleRemove}
            />
          ))}

          {orders?.length === 0 && (
            <>
              <Empty styles={{ description: { color: 'white', fontSize: 16 } }} description='Your orders is empty' />
              <Link to={ROUTES.ROOT}>
                <Button className='w-full' outlined>
                  Order Now
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Footer */}
        <div className='flex flex-col'>
          <div className='border-b border-[var(--dark-line)] my-4'></div>
          <div className='flex items-center justify-between my-4'>
            <span className='text-[var(--text-light)]'>Subtotal</span>
            <span className='text-white'>$ 21,03</span>
          </div>
          {!!orders?.length && <Button onClick={() => setShowCheckoutDrawer(true)}>Checkout</Button>}
        </div>
      </div>

      <PaymentDrawer isOpen={showCheckoutDrawer} onClose={() => setShowCheckoutDrawer(false)} />
    </>
  );
};

export default Order;

//header
