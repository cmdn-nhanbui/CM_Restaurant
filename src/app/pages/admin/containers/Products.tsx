import { useState } from 'react';

import { AddProductModal } from '@/shared/components/Modals/AddProductModal';
import { AddNewDishCard } from '@/shared/components/AddNewDishCard';
import { CATEGORIES } from '@/shared/layouts/ProductLayout';
import { Navigation } from '@/shared/components/Navigation';
import { EditCard } from '@/shared/components/EditCard';
import { Button } from '@/shared/components/Button';
import { Icon } from '@/shared/components/Icons';

const Products = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  return (
    <>
      <div className='bg-[var(--background-secondary)] h-full rounded-lg overflow-hidden flex flex-col'>
        <div className='pt-6 px-6'>
          <div className=' flex justify-between'>
            <h2 className='text-white text-3xl font-semibold'>Products Management</h2>

            <Button
              outlined
              className='flex gap-3 items-center font-semibold !border-[var(--dark-line)] fill-white !text-white'
            >
              <Icon color='inherit' icon='options' />
              <span>Manage Categories</span>
            </Button>
          </div>

          <Navigation categories={CATEGORIES} />
        </div>

        <section className='pt-6 px-6 pb-3 flex-1 overflow-y-auto scrollbar-hidden'>
          <div className='row'>
            <div className='col col-2 col-md-4 col-sm-6 !pt-3'>
              <AddNewDishCard onClick={() => setShowAddModal(true)} className='w-full h-full' />
            </div>
            <div className='col col-2 col-md-4 col-sm-6 !pt-3'>
              <EditCard
                imageUrl='https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Noodles-with-chilli-oil-eggs-6ec34e9.jpg'
                name='Spicy seasoned seafood noodles'
                price={2.29}
                quantity={20}
                onEdit={() => alert('Edit dish')}
              />
            </div>
            <div className='col col-2 col-md-4 col-sm-6 !pt-3'>
              <EditCard
                imageUrl='https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Noodles-with-chilli-oil-eggs-6ec34e9.jpg'
                name='Spicy seasoned seafood noodles'
                price={2.29}
                quantity={20}
                onEdit={() => alert('Edit dish')}
              />
            </div>
            <div className='col col-2 col-md-4 col-sm-6 !pt-3'>
              <EditCard
                imageUrl='https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Noodles-with-chilli-oil-eggs-6ec34e9.jpg'
                name='Spicy seasoned seafood noodles'
                price={2.29}
                quantity={20}
                onEdit={() => alert('Edit dish')}
              />
            </div>
            <div className='col col-2 col-md-4 col-sm-6 !pt-3'>
              <EditCard
                imageUrl='https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Noodles-with-chilli-oil-eggs-6ec34e9.jpg'
                name='Spicy seasoned seafood noodles'
                price={2.29}
                quantity={20}
                onEdit={() => alert('Edit dish')}
              />
            </div>
            <div className='col col-2 col-md-4 col-sm-6 !pt-3'>
              <EditCard
                imageUrl='https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Noodles-with-chilli-oil-eggs-6ec34e9.jpg'
                name='Spicy seasoned seafood noodles'
                price={2.29}
                quantity={20}
                onEdit={() => alert('Edit dish')}
              />
            </div>
            <div className='col col-2 col-md-4 col-sm-6 !pt-3'>
              <EditCard
                imageUrl='https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Noodles-with-chilli-oil-eggs-6ec34e9.jpg'
                name='Spicy seasoned seafood noodles'
                price={2.29}
                quantity={20}
                onEdit={() => alert('Edit dish')}
              />
            </div>
          </div>
        </section>
      </div>

      <AddProductModal
        isModalOpen={showAddModal}
        onCancel={() => setShowAddModal(false)}
        onOk={() => setShowAddModal(false)}
      />
    </>
  );
};

export default Products;
