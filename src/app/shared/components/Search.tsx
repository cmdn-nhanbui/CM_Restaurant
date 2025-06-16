import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { TextField } from './TextField';
import { Popover, Spin } from 'antd';
import { useEffect, useState, type ChangeEvent } from 'react';
import { SearchPopper } from './SearchPopper';
import useDebounce from '../hooks/useDebounce';

export const Search = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const debounceSearchValue = useDebounce(searchValue, 500);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (!debounceSearchValue.trim()) return;
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 1000);
  }, [debounceSearchValue]);

  return (
    <Popover
      arrow={false}
      content={<SearchPopper isLoadMore />}
      trigger='click'
      open={open}
      onOpenChange={handleOpenChange}
      placement='top'
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
