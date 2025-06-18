export const TableSkeleton = () => {
  return Array.from({ length: 5 }).map((_, idx) => (
    <tr key={idx} className='animate-pulse border-b border-gray-800'>
      <td className='py-4'>
        <div className='h-4 bg-gray-700 rounded w-12 mx-auto'></div>
      </td>
      <td className='py-4'>
        <div className='h-4 bg-gray-700 rounded w-32 mx-auto'></div>
      </td>
      <td className='py-4'>
        <div className='h-4 bg-gray-700 rounded w-40 mx-auto'></div>
      </td>
      <td className='py-4'>
        <div className='h-4 bg-gray-700 rounded w-24 mx-auto'></div>
      </td>
      <td className='py-4'>
        <div className='h-4 bg-gray-700 rounded w-20 mx-auto'></div>
      </td>
      <td className='py-4'>
        <div className='h-4 bg-gray-700 rounded w-6 mx-auto'></div>
      </td>
    </tr>
  ));
};
