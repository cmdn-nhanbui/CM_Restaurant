import { useState } from 'react';
import { Filter } from './Filter';
import ProductCard from './ProductCard';

type SortOption = {
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { label: 'Name ASC', value: 'name_asc' },
  { label: 'Price DESC', value: 'price_desc' },
];

export const SectionMenu = () => {
  const [sortBy, setSortBy] = useState<SortOption>({ label: 'Name ASC', value: 'name_asc' });

  const handleChangeSortMode = (val: SortOption) => {
    setSortBy(val);
  };

  return (
    <section className='mt-4 sm:mt-6'>
      <div className='flex justify-between items-center mb-4 sm:mb-5'>
        <h2 className='sm:text-2xl text-base text-white font-semibold'>Choose Dishes</h2>

        <Filter value={sortBy} onChange={handleChangeSortMode} options={sortOptions} getLabel={(item) => item.label} />
      </div>
      <div className='row'>
        <div className='col col-2 col-md-4 col-sm-6'>
          <ProductCard
            id={1}
            imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s'
            name='Spicy seasoned seafood noodles'
            price={2.29}
            available={20}
          />
        </div>
        <div className='col col-2 col-md-4 col-sm-6'>
          <ProductCard
            id={2}
            imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s'
            name='Spicy seasoned seafood noodles'
            price={2.29}
            available={20}
          />
        </div>
        <div className='col col-2 col-md-4 col-sm-6'>
          <ProductCard
            id={3}
            imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s'
            name='Spicy seasoned seafood noodles'
            price={2.29}
            available={20}
          />
        </div>
        <div className='col col-2 col-md-4 col-sm-6'>
          <ProductCard
            id={4}
            imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s'
            name='Spicy seasoned seafood noodles'
            price={2.29}
            available={20}
          />
        </div>
        <div className='col col-2 col-md-4 col-sm-6'>
          <ProductCard
            id={5}
            imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s'
            name='Spicy seasoned seafood noodles'
            price={2.29}
            available={20}
          />
        </div>
        <div className='col col-2 col-md-4 col-sm-6'>
          <ProductCard
            id={6}
            imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s'
            name='Spicy seasoned seafood noodles'
            price={2.29}
            available={20}
          />
        </div>
        <div className='col col-2 col-md-4 col-sm-6'>
          <ProductCard
            id={6}
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
