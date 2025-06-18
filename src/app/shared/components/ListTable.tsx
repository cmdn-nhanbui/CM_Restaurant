import { Pagination, Select } from 'antd';
import { OrderTable } from './OrderTable';

export const ListTable = () => {
  const handleChangePage = (page: number) => {
    // const newParams = new URLSearchParams(location.search);
    // newParams.set('page', String(page));
    // navigate(`?${newParams.toString()}`);
    console.log(page);
  };

  return (
    <section className='bg-[var(--background-secondary)] rounded-lg p-6 flex-1 overflow-y-hidden flex flex-col'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-white'>Table Status</h2>
        <Select
          rootClassName='custom-antd-select'
          defaultValue='pending'
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
            { value: 'pending', label: <span className='text-[var(--orange)]'>Occupied</span> },
            { value: 'preparing', label: <span className='text-[var(--purple)]'>Reserved</span> },
            { value: 'completed', label: <span className='text-[var(--green)]'>Available</span> },
          ]}
        />
      </div>

      <div className='mt-2 h-full overflow-y-auto pb-4'>
        <OrderTable />
      </div>
      <div className='pt-3 border-t border-[var(--dark-line)]'>
        <Pagination
          rootClassName='antd-custom-pagination'
          current={1}
          align='center'
          defaultCurrent={1}
          total={20}
          pageSize={10}
          showSizeChanger={false}
          showLessItems
          onChange={handleChangePage}
        />
      </div>
    </section>
  );
};
