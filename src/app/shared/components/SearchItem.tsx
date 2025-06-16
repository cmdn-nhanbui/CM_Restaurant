import { useState } from 'react';
import { AddToCartModal } from './Modals/AddToCartModal';

type SearchItemProps = {
  id: number;
  imageUrl: string;
  productName: string;
  price: number;
};

export const SearchItem = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const handleAddToCart = () => {};
  return (
    <>
      <div
        onClick={() => setIsShowModal(true)}
        className='cursor-pointer flex gap-4 bg-[var(--form-background)] p-3 rounded-lg shadow-lg'
      >
        <div className='w-14 h-14 flex'>
          <img
            className='w-full h-full object-cover rounded-full'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTILkLfQdFvX_XJmV0o2CXITtllhwrvDB1Nxw&s'
            alt='product'
          />
        </div>

        <div className='flex-1 min-w-0'>
          <div className='text-white text-base truncate'>Spicy seasoned seafood noodles </div>
          <div className='flex justify-between'>
            <span className='text-[var(--text-light)] text-sm'>200 dishes ordered</span>
            <span className='text-[var(--text-lighter)] font-semibold text-sm'>$20.8 </span>
          </div>
        </div>
      </div>

      <AddToCartModal
        isModalOpen={isShowModal}
        onOk={handleAddToCart}
        onCancel={() => setIsShowModal(false)}
        imageUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTILkLfQdFvX_XJmV0o2CXITtllhwrvDB1Nxw&s'}
      />
    </>
  );
};
