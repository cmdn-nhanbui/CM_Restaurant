import React from 'react';

type ProductCardProps = {
  imageUrl: string;
  name: string;
  price: number;
  available: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, name, price, available }) => {
  return (
    <div className='bg-[var(--background-secondary)] rounded-2xl p-6 min-w-[192px] min-h-[226px] text-white text-center mt-12 '>
      <img
        src={imageUrl}
        alt={name}
        className='w-[120px] h-[120px] object-cover rounded-full mx-auto -mt-15 border-1 border-[var(--dark-line)] shadow-primary'
      />
      <div className='mt-4'>
        <h3 className='text-md text-white font-semibold'>{name}</h3>
        <p className='text-md text-white mt-2'>${price.toFixed(2)}</p>
        <p className='text-sm text-[var(--text-gray)] mt-1'>{available} Bowls available</p>
      </div>
    </div>
  );
};

export default ProductCard;
