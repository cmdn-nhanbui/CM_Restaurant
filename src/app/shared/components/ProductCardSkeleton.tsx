export const ProductCardSkeleton = () => {
  return (
    <div className='animate-pulse rounded-lg bg-[var(--background-secondary)] p-4 shadow flex flex-col items-center'>
      <div className='h-40 w-40 rounded-full bg-gray-700 mb-4'></div>
      <div className='h-4 w-full bg-gray-700 rounded mb-2'></div>
      <div className='h-4 w-3/4 bg-gray-600 rounded mb-2'></div>
      <div className='h-4 w-1/2 bg-gray-600 rounded'></div>
    </div>
  );
};
