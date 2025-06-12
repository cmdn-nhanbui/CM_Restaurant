import OrderItem from '@/shared/components/OrderItem';

const Cart = () => {
  return (
    <div className='flex flex-col'>
      <h2 className='text-lg text-white font-semibold'>Orders #34562</h2>
      <div className='py-6 flex justify-between text-white text-lg font-semibold border-b border-[var(--dark-line)]'>
        <span>Item</span>
        <div className='flex'>
          <span className='px-8'>Qty</span>
          <span>Price</span>
        </div>
      </div>

      <div className='py-6 flex flex-col gap-6'>
        <OrderItem
          imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s'
          name='Spicy seasoned seafood noodles'
          price={2.29}
          quantity={2}
          onDelete={() => console.log('Delete item')}
          onNoteChange={(note) => console.log('Note:', note)}
        />
        <OrderItem
          imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s'
          name='Spicy seasoned seafood noodles'
          price={2.29}
          quantity={2}
          onDelete={() => console.log('Delete item')}
          onNoteChange={(note) => console.log('Note:', note)}
        />
      </div>
    </div>
  );
};

export default Cart;
