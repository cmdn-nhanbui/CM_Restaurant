import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pagination, Select } from 'antd';
import { OrderTable } from './OrderTable';

import type { Table, TableStatus } from '@/core/constants/types';
import { mapTableData } from '@/core/mappers/table.mapper';
import { PUSHER_CHANEL } from '@/core/constants/pusher';
import { useGetTables } from '../hooks/useTable';
import { getPusher } from '../hooks/usePusher';

type SortType = TableStatus | 'all';

export const ListTable = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;
  const [sort, setSort] = useState<SortType>('all');

  const { data, isLoading, refetch } = useGetTables(page, 10);
  let tables: Table[] = data?.docs?.map(mapTableData);
  if (sort !== 'all') tables = tables?.filter((item) => item?.status === sort);

  const handleChangePage = (page: number) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', String(page));
    navigate(`?${newParams.toString()}`);
  };

  useEffect(() => {
    const pusher = getPusher();
    const channel = pusher.subscribe(PUSHER_CHANEL);

    channel.bind('NewOrder', () => {
      refetch();
    });

    channel.bind('CancelOrder', () => {
      refetch();
    });

    channel.bind('AdminPaid', () => {
      refetch();
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(PUSHER_CHANEL);
    };
  }, []);

  return (
    <section className='bg-[var(--background-secondary)] rounded-lg p-6 flex-1 overflow-y-hidden flex flex-col h-full'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-white'>Table Status</h2>
        <Select
          rootClassName='custom-antd-select'
          defaultValue='all'
          style={{ width: 120 }}
          styles={{
            popup: {
              root: {
                backgroundColor: 'var(--form-background)',
                color: 'white',
              },
            },
          }}
          onChange={(value) => setSort(value as SortType)}
          options={[
            { value: 'all', label: <span className='text-[var(--blue)]'>All</span> },
            { value: 'available', label: <span className='text-[var(--green)]'>Available</span> },
            { value: 'occupied', label: <span className='text-[var(--orange)]'>Occupied</span> },
            { value: 'reserved', label: <span className='text-[var(--red)]'>Reserved</span> },
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
