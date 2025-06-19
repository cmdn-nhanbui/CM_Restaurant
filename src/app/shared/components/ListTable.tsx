import { Pagination, Select } from 'antd';
import { OrderTable } from './OrderTable';

import { useGetTables } from '../hooks/useTable';
import { mapTableData } from '@/core/mappers/table.mapper';
import { useNavigate } from 'react-router-dom';

export const ListTable = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;

  const { data, isLoading, refetch } = useGetTables(page, 10);

  const handleChangePage = (page: number) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', String(page));
    navigate(`?${newParams.toString()}`);
  };

  const tables = data?.docs?.map(mapTableData);

  return (
    <section className='bg-[var(--background-secondary)] rounded-lg p-6 flex-1 overflow-y-hidden flex flex-col'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-white'>Table Status</h2>
        <Select
          rootClassName='custom-antd-select'
          defaultValue='available'
          style={{ width: 120 }}
          styles={{
            popup: {
              root: {
                backgroundColor: 'var(--form-background)',
                color: 'white',
              },
            },
          }}
          onChange={(value) => {
            console.log(value);
          }}
          options={[
            { value: 'all', label: <span className='text-[var(--orange)]'>All</span> },
            { value: 'available', label: <span className='text-[var(--green)]'>Available</span> },
            { value: 'reserved', label: <span className='text-[var(--purple)]'>Reserved</span> },
          ]}
        />
      </div>

      <div className='mt-2 h-full overflow-y-auto pb-4'>
        <OrderTable onRefetch={refetch} data={tables} loading={isLoading} />
      </div>
      <div className='pt-3 border-t border-[var(--dark-line)]'>
        <Pagination
          rootClassName='antd-custom-pagination'
          current={page}
          align='center'
          defaultCurrent={1}
          total={data?.total_docs || 0}
          pageSize={10}
          showSizeChanger={false}
          showLessItems
          onChange={handleChangePage}
        />
      </div>
    </section>
  );
};
