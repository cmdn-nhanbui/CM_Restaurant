import { Button } from './Button';
import { SearchItem } from './SearchItem';

type SearchPopperProps = {
  isLoadMore: boolean;
  onLoadMore?: () => void;
};

export const SearchPopper = ({ isLoadMore, onLoadMore }: SearchPopperProps) => {
  const handleLoadMore = () => {
    if (onLoadMore) return onLoadMore();
  };
  return (
    <div>
      <div className='text-white shadow-lg flex flex-col gap-4 max-h-[450px] overflow-y-auto scrollbar-hidden'>
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
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
