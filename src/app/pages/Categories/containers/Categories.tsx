import type { Product } from '@/core/constants/types';
import { mapProductData } from '@/core/mappers/product.mapper';
import ProductCard from '@/shared/components/ProductCard';
import ProductListSkeleton from '@/shared/components/ProductListSkeleton';
import { useProductByCategory } from '@/shared/hooks/useProduct';
import { Empty, Pagination, Select } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Categories = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<string>('name_asc');

  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;

  const handleChangePage = (page: number) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', String(page));
    navigate(`?${newParams.toString()}`);
  };

  const handleChangeSortMode = (val: string) => {
    setSortBy(val);
  };

  const { data, isLoading } = useProductByCategory({ page, perPage: 18, categoryId: Number(id), sort: sortBy });

  const products: Product[] = data?.docs?.map(mapProductData);

  return (
    <section className='mt-4 sm:mt-6'>
      <div className='flex justify-between items-center mb-4 sm:mb-5'>
        <h2 className='sm:text-2xl text-base text-white font-semibold'>Choose Dishes</h2>

        <div className='flex items-center'>
          <span className='sm:text-base text-sm text-[var(--text-lighter)] mr-2'>Sort by</span>
          <Select
            rootClassName='custom-antd-select'
            defaultValue='name_asc'
            value={sortBy}
            style={{ width: 200 }}
            styles={{
              popup: {
                root: {
                  backgroundColor: 'var(--form-background)',
                  color: 'white',
                },
              },
            }}
            onChange={handleChangeSortMode}
            options={[
              { value: 'name_asc', label: 'A - Z' },
              { value: 'name_desc', label: 'Z - A' },
              { value: 'price_asc', label: 'Price Increasing' },
              { value: 'price_desc', label: 'Price Decreasing' },
            ]}
          />
        </div>
      </div>
      {isLoading ? (
        <ProductListSkeleton />
      ) : (
        <div className='row'>
          {products?.map((product, index) => (
            <div key={index} className='col col-2 col-md-4 col-sm-6'>
              <ProductCard
                key={index}
                id={product.id}
                name={product.name}
                imageUrl={product.imageUrl}
                price={product.price}
                quantity={product.quantity}
              />
            </div>
          ))}
        </div>
      )}

      {!products?.length && (
        <Empty
          style={{
            margin: '16px 0',
          }}
          styles={{
            description: {
              color: 'white',
              fontWeight: 600,
              fontSize: 20,
            },
          }}
        />
      )}

      {products?.length && (
        <Pagination
          rootClassName='antd-custom-pagination'
          current={page}
          align='center'
          defaultCurrent={1}
          total={data?.totalDocs || 1}
          pageSize={18}
          showSizeChanger={false}
          showLessItems
          onChange={handleChangePage}
        />
      )}
    </section>
  );
};

export default Categories;
