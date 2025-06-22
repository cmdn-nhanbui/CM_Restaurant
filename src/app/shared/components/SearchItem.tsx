import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

import { AddToCartModal } from './Modals/AddToCartModal';
import { Image } from './Image';

import type { CartItem, Product } from '@/core/constants/types';
import { formatVND } from '@/core/helpers/currencyHelper';
import { addCartItem } from '@src/redux/actions/cartActions';
import { type AppDispatch } from '@src/redux/store';

export const SearchItem = ({ id, name, orderQuantity, imageUrl, price }: Product) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddToCart = (quantity: number) => {
    setIsShowModal(false);
    const cartItem: CartItem = {
      id,
      name,
      imageUrl,
      note: '',
      quantity: quantity,
      price,
    };

    dispatch(addCartItem(cartItem));
    messageApi.open({
      type: 'success',
      content: 'Add product to card successfully',
    });
  };
  return (
    <>
      {contextHolder}
      <li
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
      </li>

      <AddToCartModal
        isModalOpen={isShowModal}
        onOk={handleAddToCart}
        onCancel={() => setIsShowModal(false)}
        imageUrl={imageUrl}
      />
    </>
  );
};
