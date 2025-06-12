import React from 'react';
import { TextField } from './TextField';
import { Button } from './Button';
import { DeleteOutlined } from '@ant-design/icons';

type OrderItemProps = {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  onDelete: () => void;
  onNoteChange?: (note: string) => void;
};

const OrderItem: React.FC<OrderItemProps> = ({ imageUrl, name, price, quantity, onDelete, onNoteChange }) => {
  const total = (price * quantity).toFixed(2);

  return (
    <div className='flex flex-col gap-2 bg-transparent'>
      {/* Top Row */}
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <img src={imageUrl} alt={name} className='w-10 h-10 rounded-full object-cover' />
          <div className='flex flex-col'>
            <span className='text-base font-medium text-white truncate w-32'>{name}</span>
            <span className='text-sm text-[var(--text-light)]'>${price.toFixed(2)}</span>
          </div>
        </div>
        <div className='flex items-center'>
          {/* Quantity */}
          <div className='shadow-lg w-10 h-10 bg-[var(--form-background)] border border-[var(--dark-line)] mr-6 text-white rounded-md flex items-center justify-center'>
            {quantity}
          </div>

          {/* Total Price */}
          <div className='text-white font-semibold'>${total}</div>
        </div>
      </div>

      {/* Order Note + Trash Icon */}
      <div className='flex items-center gap-3'>
        <TextField className='shadow-lg' placeholder='Order Note' />
        <Button outlined onClick={onDelete} className='flex items-center justify-center'>
          <DeleteOutlined
            style={{
              fontSize: 20,
            }}
          />
        </Button>
      </div>
    </div>
  );
};

export default OrderItem;
