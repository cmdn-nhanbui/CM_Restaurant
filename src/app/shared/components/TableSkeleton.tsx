interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export const TableSkeleton = ({ rows = 5, cols = 6 }: TableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx} className='animate-pulse border-b border-gray-800'>
          {Array.from({ length: cols }).map((_, colIdx) => (
            <td key={colIdx} className='py-4'>
              <div className={`h-4 bg-gray-700 rounded`} style={{ width: getColWidth(colIdx) }} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

// Optional helper to vary width based on column index (not required)
const getColWidth = (colIdx: number): string => {
  const widths = ['3rem', '8rem', '10rem', '6rem', '5rem', '1.5rem'];
  return widths[colIdx] || '6rem';
};
