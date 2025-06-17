import { useState } from 'react';

import { AddProductModal } from '@/shared/components/Modals/AddProductModal/AddProductModal';
import { AddNewDishCard } from '@/shared/components/AddNewDishCard';
import { Navigation } from '@/shared/components/Navigation';
import { EditCard } from '@/shared/components/EditCard';
import { Button } from '@/shared/components/Button';
import { Icon } from '@/shared/components/Icons';
import { message, Pagination } from 'antd';
import { type Category, type Product } from '@/core/constants/types';
import { UpdateProductModal } from '@/shared/components/Modals/AddProductModal/UpdateProductModal';
import { useProductByCategory, useProductData } from '@/shared/hooks/useProduct';
import { useNavigate, useParams } from 'react-router-dom';
import { mapProductData } from '@/core/mappers/product.mapper';
import ProductListSkeleton from '@/shared/components/ProductListSkeleton';
import { ConfirmModal } from '@/shared/components/Modals/ConfirmModal';
import { deleteProduct } from '@/core/services/product.service';
import { useSelector } from 'react-redux';
import type { RootState } from '@src/redux/store';
import { ADMIN_ROUTES } from '@/core/constants/routes';

const Products = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [messageApi, contextHolder] = message.useMessage();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [productSelected, setProductSelected] = useState<Product | null>(null);
  const [productDelete, setProductDelete] = useState<number | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;

  const { data, isLoading, refetch } = id
    ? useProductByCategory({ page, perPage: 17, sort: 'name_asc', categoryId: Number(id) })
    : useProductData({ page, perPage: 17, sort: 'name_asc' });
  const products: Product[] = data?.docs?.map(mapProductData);

  const { data: categories, loading } = useSelector((state: RootState) => state.category);

  const handleChangePage = (page: number) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', String(page));
    navigate(`?${newParams.toString()}`);
  };

  const handleDeleteProduct = () => {
    const deleteRequest = async () => {
      const key = 'updatable';

      messageApi.open({
        key,
        type: 'loading',
        content: 'Deleting...',
      });
      try {
        if (!productDelete) return;

        await deleteProduct(productDelete);
        messageApi.open({
          key,
          type: 'success',
          content: 'Delete product successfully',
          duration: 2,
        });
        setProductDelete(null);
        refetch();
      } catch (error) {
        console.log(error);
        messageApi.open({
          key,
          type: 'error',
          content: 'Delete product unsuccessfully',
          duration: 2,
        });
      }
    };
    deleteRequest();
  };

  const handleAfterCreateProduct = () => {
    refetch();
    setShowAddModal(false);
  };

  const cutomCategories: Category[] = categories?.map((item) => ({
    id: item.id,
    name: item.name,
    navigateTo: `/admin/products/${item.id}`,
  }));

  return (
    <>
      {contextHolder}
      <div className='bg-[var(--background-secondary)] h-full rounded-lg overflow-hidden flex flex-col'>
        <div className='pt-6 px-6'>
          <div className=' flex justify-between'>
            <h2 className='text-white text-3xl font-semibold'>Products Management</h2>

            <Button
              outlined
              className='flex gap-3 items-center font-semibold !border-[var(--dark-line)] fill-white !text-white'
            >
              <Icon color='inherit' icon='options' />
              <span>Manage Categories</span>
            </Button>
          </div>

          <Navigation
            categories={cutomCategories}
            loading={loading}
            additionalItems={[{ name: 'All', navigateTo: ADMIN_ROUTES.PRODUCTS }]}
          />
        </div>

        <section className='pt-6 px-6 pb-3 flex-1 overflow-y-auto scrollbar-hidden'>
          {isLoading ? (
            <ProductListSkeleton />
          ) : (
            <ul className='row'>
              <li className='col col-2 col-md-4 col-sm-6 !pt-3'>
                <AddNewDishCard onClick={() => setShowAddModal(true)} className='w-full h-full' />
              </li>

              {products?.map((item, index) => (
                <li key={index} className='col col-2 col-md-4 col-sm-6 !pt-3'>
                  <EditCard
                    {...item}
                    onEdit={() => setProductSelected(item)}
                    onDelete={() => setProductDelete(item.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className='pb-6 pt-4 border-t border-[var(--dark-line)]'>
          <Pagination
            rootClassName='antd-custom-pagination'
            align='center'
            defaultCurrent={page}
            total={data?.total_docs || 0}
            pageSize={17}
            showSizeChanger={false}
            showLessItems
            onChange={handleChangePage}
          />
        </div>
      </div>

      <AddProductModal
        isModalOpen={showAddModal}
        onCancel={() => setShowAddModal(false)}
        onOk={handleAfterCreateProduct}
      />

      <UpdateProductModal
        isModalOpen={productSelected !== null}
        data={productSelected as Product}
        onCancel={() => setProductSelected(null)}
        onOk={() => refetch()}
      />

      <ConfirmModal
        isModalOpen={productDelete !== null}
        onCancel={() => setProductDelete(null)}
        onOk={handleDeleteProduct}
        title='Delete this product ?'
        description='Do you really want to delete these product? This process cannot be undone.'
      />
    </>
  );
};

export default Products;
