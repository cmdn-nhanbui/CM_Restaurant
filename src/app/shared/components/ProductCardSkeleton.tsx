export const ProductCardSkeleton = () => {
  return (
    <div className='animate-pulse rounded-lg bg-[var(--background-secondary)] p-4 shadow'>
      <div className='h-40 w-full rounded-lg bg-gray-700 mb-4'></div>
      <div className='h-4 w-3/4 bg-gray-700 rounded mb-2'></div>
      <div className='h-4 w-1/2 bg-gray-600 rounded mb-2'></div>
      <div className='h-4 w-1/3 bg-gray-600 rounded'></div>
    </div>
  );
};
