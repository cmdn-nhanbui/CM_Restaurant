import { EditOutlined } from '@ant-design/icons';
import React from 'react';

type EdtiDishCardProps = {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  onEdit?: () => void;
};

export const EditCard: React.FC<EdtiDishCardProps> = ({ imageUrl, name, price, quantity, onEdit }) => {
  return (
    <div className='lg:min-w-[220px] lg:min-h-[300px] min-w-[160px] min-h-[220px] bg-[var(--background-secondary)] rounded-lg overflow-hidden flex flex-col border border-[var(--dark-line)]'>
      <img src={imageUrl} alt={name} className='w-20 h-20 rounded-full mx-auto mt-4 object-cover' />
      <div className='text-center mt-2 px-2'>
        <p className='text-white text-sm font-semibold'>{name}</p>
        <p className='text-[var(--text-light)] text-xs mt-1'>
          ${price.toFixed(2)} • {quantity} Bowls
        </p>
      </div>
      <button
        onClick={onEdit}
        className='mt-auto h-[52px] bg-[#3C1E1E] text-[#EA7C69] flex items-center justify-center gap-1 py-2 text-sm font-medium cursor-pointer'
      >
        <EditOutlined className='w-4 h-4' />
        Edit dish
      </button>
    </div>
  );
};
