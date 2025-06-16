import React, { useState } from 'react';
import { AddToCartModal } from './Modals/AddToCartModal';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@src/redux/store';
import { addCartItem } from '@src/redux/actions/cartActions';
import type { CartItem } from '@/core/constants/types';
import { message } from 'antd';
import { formatVND } from '@/core/helpers/currencyHelper';
import { Image } from './Image';

type ProductCardProps = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, name, price, quantity }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddToCart = (quantity: number) => {
    setIsShowModal(false);
    const cartItem: CartItem = {
      id: 1,
      name: 'New Product',
      imageUrl:
        'https://marleyspoon.com/media/recipes/224442/main_photos/large/stir-c0162ebd540780d497f1c8a5bcc9a5d8.jpeg',
      note: '',
      quantity: quantity,
      price: 20,
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
          <p className='text-md text-white mt-2'>{formatVND(price)}</p>
          <p className='text-sm text-[var(--text-gray)] mt-1'>{quantity} Bowls available</p>
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
