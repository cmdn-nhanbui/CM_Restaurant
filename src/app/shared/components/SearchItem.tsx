import { useState } from 'react';
import { AddToCartModal } from './Modals/AddToCartModal';
import type { Product } from '@/core/constants/types';
import { formatVND } from '@/core/helpers/currencyHelper';
import { Image } from './Image';

export const SearchItem = ({ name = 'Spicy seasoned seafood noodles', orderQuantity, imageUrl, price }: Product) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const handleAddToCart = () => {};
  return (
    <>
      <div
        onClick={() => setIsShowModal(true)}
        className='cursor-pointer flex gap-4 bg-[var(--form-background)] p-3 rounded-lg shadow-lg'
      >
        <div className='w-14 h-14 flex'>
          <Image className='w-full h-full object-cover rounded-full' src={imageUrl} alt={name} />
        </div>

        <div className='flex-1 min-w-0'>
          <div className='text-white text-base truncate'>{name}</div>

          <div className='flex justify-between'>
            <span className='text-[var(--text-light)] text-sm'>{orderQuantity} ordered</span>
            <span className='text-[var(--text-lighter)] font-semibold text-sm'>{formatVND(price)}</span>
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
