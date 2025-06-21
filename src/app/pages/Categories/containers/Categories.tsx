import { Empty, Pagination, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductCard from '@/shared/components/ProductCard';
import { useProductByCategory } from '@/shared/hooks/useProduct';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import ProductListSkeleton from '@/shared/components/ProductListSkeleton';

import type { Product } from '@/core/constants/types';
import { mapProductData } from '@/core/mappers/product.mapper';

const Categories = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<string>('name_asc');
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;

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

  const { data, isLoading, isFetching } = useProductByCategory({
    page,
    perPage: 18,
    categoryId: Number(id),
    sort: sortBy,
  });
  const topRef = useRef(null);
  const products: Product[] = data?.docs?.map(mapProductData);

  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    newParams.delete('page');
    navigate(`?${newParams.toString()}`, { replace: true });
  }, [id]);

  useEffect(() => {
    if (!data) return;
    if (totalDocs !== data?.total_docs) {
      setTotalDocs(data.total_docs);
    }
  }, [data, id]);

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

      {!products?.length && !isFetching && (
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
          total={totalDocs}
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
