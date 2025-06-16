import type { Product } from '@/core/constants/types';
import { Button } from './Button';
import { SearchItem } from './SearchItem';

type SearchPopperProps = {
  isLoadMore: boolean;
  onLoadMore?: () => void;
  searchResult: Product[];
};

export const SearchPopper = ({ isLoadMore, onLoadMore, searchResult }: SearchPopperProps) => {
  const handleLoadMore = () => {
    if (onLoadMore) return onLoadMore();
  };
  return (
    <div>
      <div className='text-white shadow-lg flex flex-col gap-4 max-h-[450px] overflow-y-auto scrollbar-hidden md:min-w-[374px]'>
        {searchResult?.map((item, index) => (
          <SearchItem {...item} key={index} />
        ))}
      </div>

      {isLoadMore && (
        <div className='pt-4'>
          <Button onClick={handleLoadMore} className='text-white font-semibold text-sm w-full py-2'>
            Load more data
          </Button>
        </div>
      )}
    </div>
  );
};
