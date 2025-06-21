import React, { useState } from 'react';
import { AddToCartModal } from './Modals/AddToCartModal';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@src/redux/store';
import { addCartItem } from '@src/redux/actions/cartActions';
import type { CartItem, Product } from '@/core/constants/types';
import { message } from 'antd';
import { formatVND } from '@/core/helpers/currencyHelper';
import { Image } from './Image';

const ProductCard: React.FC<Product> = ({ id, imageUrl, name, price, quantity, orderQuantity }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddToCart = (selectedQuantity: number) => {
    if (quantity && selectedQuantity > quantity) return messageApi.error('Insufficient quantity available');

    setIsShowModal(false);
    const cartItem: CartItem = {
      id,
      name,
      imageUrl,
      note: '',
      quantity: selectedQuantity,
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
      <div
        onClick={() => setIsShowModal(true)}
        className='bg-[var(--background-secondary)] rounded-2xl p-3 sm:p-6 min-h-[226px] text-white text-center mt-12'
      >
        <Image
          src={imageUrl}
          alt={name}
          className='w-[120px] h-[120px] object-cover rounded-full mx-auto -mt-15 border-1 border-[var(--dark-line)] shadow-primary'
        />

        <div className='mt-4'>
          <h3 className='text-md text-white font-semibold'>{name}</h3>
          <p className='text-md text-white mt-2 font-semibold'>{formatVND(price)}</p>
          <p className='text-sm text-[var(--text-gray)] mt-1'>
            {quantity === 0
              ? `Out of order`
              : quantity === null
              ? `${orderQuantity} ordered`
              : `${quantity} products available`}
          </p>
        </div>
      </div>
      <AddToCartModal
        isModalOpen={isShowModal}
        onOk={handleAddToCart}
        onCancel={() => setIsShowModal(false)}
        imageUrl={imageUrl}
      />
    </>
  );
};

export default ProductCard;
