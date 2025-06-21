import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Select } from 'antd';

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import ProductCard from './ProductCard';

import { mapProductData } from '@/core/mappers/product.mapper';
import type { Product } from '@/core/constants/types';
import { useProductData } from '../hooks/useProduct';
import ProductListSkeleton from './ProductListSkeleton';

export const SectionMenu = () => {
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<string>('name_asc');

  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;
  const [totalDocs, setTotalDocs] = useState<number>(0);

  const topRef = useRef(null);

  const handleChangePage = (page: number) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', String(page));
    navigate(`?${newParams.toString()}`);

    if (topRef.current) {
      (topRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChangeSortMode = (val: string) => {
    setSortBy(val);
  };

  const { data, isLoading } = useProductData({ page, perPage: 18, sort: sortBy });

  const products: Product[] = data?.docs?.map(mapProductData);

  useEffect(() => {
    if (!data) return;
    if (totalDocs !== data?.total_docs) {
      setTotalDocs(data.total_docs);
    }
  }, [data]);

  return (
    <section className='mt-4 sm:mt-6'>
      <div ref={topRef}></div>
      <div className='flex sm:justify-between justify-end items-center mb-4 sm:mb-5'>
        <h2 className='sm:text-2xl text-base text-white font-semibold sm:block hidden'>Choose Dishes</h2>

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
              {
                value: 'price_asc',
                label: (
                  <span>
                    Price <ArrowUpOutlined />
                  </span>
                ),
              },
              {
                value: 'price_desc',
                label: (
                  <span>
                    Price <ArrowDownOutlined />
                  </span>
                ),
              },
              {
                value: 'order',
                label: (
                  <span>
                    Order <ArrowDownOutlined />
                  </span>
                ),
              },
            ]}
          />
        </div>
      </div>
      {isLoading ? (
        <ProductListSkeleton />
      ) : (
        <ul className='row'>
          {products?.map((product, index) => (
            <li key={index} className='col col-2 col-md-4 col-sm-6'>
              <ProductCard key={index} {...product} />
            </li>
          ))}
        </ul>
      )}

      <Pagination
        rootClassName='antd-custom-pagination'
        current={page}
        align='center'
        defaultCurrent={1}
        total={totalDocs}
        pageSize={18}
        showSizeChanger={false}
        showLessItems
        onChange={handleChangePage}
      />
    </section>
  );
};
