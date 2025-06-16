import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { TextField } from './TextField';
import { Popover, Spin } from 'antd';
import { useEffect, useState, type ChangeEvent } from 'react';
import { SearchPopper } from './SearchPopper';
import useDebounce from '../hooks/useDebounce';
import { type Product } from '@/core/constants/types';
import { searchProduct } from '@/core/services/product.service';
import { mapProductData } from '@/core/mappers/product.mapper';

export const Search = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [isHasMore, setIsHasMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const debounceSearchValue = useDebounce(searchValue, 500);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
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
        const { hasNextPage, docs } = response?.data;
        const productData: Product[] = docs?.map(mapProductData);

        setSearchResult((prev) => [...prev, ...productData]);
        setIsHasMore(hasNextPage);
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
        body: {
          backgroundColor: 'var(--background-secondary)',
        },
      }}
      classNames={{
        root: 'custom-popover-body',
      }}
    >
      <div className='relative'>
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          placeholder='Search for food, coffee, etc...'
          className='pr-6'
        />
        <div className='absolute top-1/2 right-3   -translate-y-1/2 flex'>
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
