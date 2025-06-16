import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { Product } from '@/core/constants/types';

interface EdtiDishCardProps extends Product {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const EditCard: React.FC<EdtiDishCardProps> = ({ imageUrl, name, price, orderQuantity, onEdit, onDelete }) => {
  return (
    <>
      <div className='lg:min-w-[220px] lg:min-h-[300px] min-w-[160px] min-h-[220px] bg-[var(--background-secondary)] rounded-lg overflow-hidden flex flex-col border border-[var(--dark-line)] relative'>
        <img src={imageUrl} alt={name} className='w-20 h-20 rounded-full mx-auto mt-4 object-cover' />
        <div className='text-center mt-2 px-2'>
          <p className='text-white text-base font-semibold'>{name}</p>
          <p className='text-[var(--text-light)] text-sm mt-1'>
            ${price.toFixed(2)} • {orderQuantity} Ordered
          </p>
        </div>
        <button
          onClick={onEdit}
          className='mt-auto lg:h-[52px] h-auto bg-[#3C1E1E] text-[#EA7C69] flex items-center justify-center gap-1 py-2 text-sm font-medium cursor-pointer'
        >
          <EditOutlined className='w-4 h-4' />
          Edit dish
        </button>

        <button onClick={onDelete} className='w-6 h-6 absolute top-2 right-2 text-white cursor-pointer'>
          <DeleteOutlined />
        </button>
      </div>
    </>
  );
};
