import { useEffect, useState, type ChangeEvent } from 'react';
import { Popover, Spin } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { TextField } from './TextField';
import { SearchPopper } from './SearchPopper';

import useDebounce from '../hooks/useDebounce';
import { type Product } from '@/core/constants/types';
import { searchProduct } from '@/core/services/product.service';
import { mapProductData } from '@/core/mappers/product.mapper';

export const Search = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [isHasMore, setIsHasMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const debounceSearchValue = useDebounce(searchValue.trim(), 500);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim() === '') {
      setSearchResult([]);
    }
    setSearchValue(value);
  };

  useEffect(() => {
    if (!debounceSearchValue.trim()) {
      setPage(1);
      setSearchResult([]);
      return;
    }

    const fetchSearchAPI = async () => {
      setIsLoading(true);
      try {
        const response = await searchProduct(debounceSearchValue, page);
        const { has_next_page, docs } = response?.data;
        const productData: Product[] = docs?.map(mapProductData);

        setSearchResult((prev) => [...prev, ...productData]);
        setIsHasMore(has_next_page);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchAPI();
  }, [debounceSearchValue, page]);

  return (
    <Popover
      arrow={false}
      content={
        <SearchPopper
          searchResult={searchResult}
          isLoadMore={isHasMore}
          onLoadMore={() => setPage((prev) => prev + 1)}
        />
      }
      trigger='click'
      open={!!searchResult?.length && open}
      onOpenChange={handleOpenChange}
      placement='bottom'
      getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentElement as HTMLElement}
      styles={{
        root: {
          width: isMobile ? '100%' : undefined,
        },
        body: {
          backgroundColor: 'var(--background-secondary)',
        },
      }}
      rootClassName='custom-popover-body'
    >
      <div className='relative'>
        <TextField onChange={handleChangeSearchValue} placeholder='Search for food, coffee, etc...' className='pr-6' />
        <div className='absolute top-1/2 right-3 -translate-y-1/2 flex'>
          {isLoading ? (
            <Spin indicator={<LoadingOutlined spin style={{ color: 'var(--primary)' }} />} />
          ) : (
            <SearchOutlined style={{ fontSize: 20, color: 'white' }} />
          )}
        </div>
      </div>
    </Popover>
  );
};
