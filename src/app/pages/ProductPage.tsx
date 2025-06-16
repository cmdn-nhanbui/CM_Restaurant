import { Outlet } from 'react-router';
import ProductLayout from '@/shared/layouts/ProductLayout';

const ProductPage = () => {
  return (
    <ProductLayout>
      <Outlet />
    </ProductLayout>
  );
};

export default ProductPage;
