import React, { useEffect, useState, type ChangeEvent } from 'react';
import { TextField } from './TextField';
import { Button } from './Button';
import { DeleteOutlined } from '@ant-design/icons';
import type { OrderItemProps } from '@/core/constants/types';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '@src/redux/store';
import { removeCartItem, updateCartQuantity, updateQuantityItem } from '@src/redux/actions/cartActions';
import useDebounce from '../hooks/useDebounce';
import { ConfirmModal } from './Modals/ConfirmModal';

export const CartItem: React.FC<OrderItemProps> = ({ id, imageUrl, name, price, quantity, note }) => {
  const [noteValue, setNoteValue] = useState(note);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const total = (price * quantity).toFixed(2);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveItem = () => {
    dispatch(removeCartItem(id));
  };

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    if (!value) return dispatch(updateCartQuantity(id, Number(0)));
    dispatch(updateCartQuantity(id, Number(value)));
  };

  const noteDebouceValue = useDebounce(noteValue, 500);

  useEffect(() => {
    dispatch(updateQuantityItem({ id, imageUrl, name, price, quantity, note: noteDebouceValue }));
  }, [noteDebouceValue]);

  return (
    <>
      <div className='flex flex-col gap-2 bg-transparent'>
        {/* Top Row */}
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <img src={imageUrl} alt={name} className='w-10 h-10 rounded-full object-cover' />
            <div className='flex flex-col'>
              <span className='text-base font-medium text-white truncate w-42 sm:w-full'>{name}</span>
              <span className='text-sm text-[var(--text-light)]'>${price.toFixed(2)}</span>
            </div>
          </div>

          <div className='flex items-center'>
            <div className='text-white font-semibold'>${total}</div>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='shadow-lg'>
            <TextField
              name='quantity'
              inputMode='numeric'
              className='!w-[50px] sm:!w-auto'
              min={1}
              value={quantity}
              onChange={handleChangeQuantity}
              type='number'
              max={100}
            />
          </div>
          <TextField
            name='note'
            className='shadow-lg'
            placeholder='Order Note'
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
          />
          <Button outlined onClick={() => setIsShowModal(true)} className='flex items-center justify-center'>
            <DeleteOutlined
              style={{
                fontSize: 20,
              }}
            />
          </Button>
        </div>
      </div>

      <ConfirmModal
        isModalOpen={isShowModal}
        onCancel={() => setIsShowModal(false)}
        onOk={() => {
          handleRemoveItem();
          setIsShowModal(false);
        }}
        title='Are you sure ?'
        description='Do you really want to delete these records? This process cannot be undone'
      />
    </>
  );
};
