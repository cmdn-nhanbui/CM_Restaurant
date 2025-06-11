import ProductCard from './ProductCard';

export const SectionMenu = () => {
  return (
    <section className='mt-6'>
      <div>
        <h2 className='text-2xl text-white font-semibold'>Choose Dishes</h2>
      </div>
      <div className='flex gap-6'>
        <div className='col w-2/12'>
          <ProductCard
            imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s'
            name='Spicy seasoned seafood noodles'
            price={2.29}
            available={20}
          />
        </div>
        <div className='col w-2/12'>
          <ProductCard
            imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s'
            name='Spicy seasoned seafood noodles'
            price={2.29}
            available={20}
          />
        </div>
        <div className='col w-2/12'>
          <ProductCard
            imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s'
            name='Spicy seasoned seafood noodles'
            price={2.29}
            available={20}
          />
        </div>
        <div className='col w-2/12'>
          <ProductCard
            imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s'
            name='Spicy seasoned seafood noodles'
            price={2.29}
            available={20}
          />
        </div>
      </div>
    </section>
  );
};
