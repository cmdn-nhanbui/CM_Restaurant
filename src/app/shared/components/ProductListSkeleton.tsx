import { ProductCardSkeleton } from './ProductCardSkeleton';

const ProductListSkeleton = () => {
  return (
    <div className='row'>
      {Array.from({ length: 12 }).map((_, idx) => (
        <div key={idx} className='col col-2 col-md-4 col-sm-6'>
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton;
