import { useState } from 'react';
import ProductCard from './ProductCard';
import { Pagination, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useProductData } from '../hooks/useProduct';
import ProductListSkeleton from './ProductListSkeleton';
import { mapProductData } from '@/core/mappers/product.mapper';
import type { Product } from '@/core/constants/types';

export const SectionMenu = () => {
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

  const { data, isLoading } = useProductData({ page, perPage: 18, sort: sortBy });

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
            style={{ width: 120 }}
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
              <ProductCard key={index} {...product} />
            </div>
          ))}
        </div>
      )}

      <Pagination
        rootClassName='antd-custom-pagination'
        current={page}
        align='center'
        defaultCurrent={1}
        total={data?.total_docs || 0}
        pageSize={18}
        showSizeChanger={false}
        showLessItems
        onChange={handleChangePage}
      />
    </section>
  );
};
