import { Select } from 'antd';
import { OrderTable } from './OrderTable';

export const ListOrder = () => {
  return (
    <section className='bg-[var(--background-secondary)] rounded-lg p-6 flex-1 overflow-y-hidden'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-white'>Order Report</h2>
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
            { value: 'pending', label: <span className='text-[var(--orange)]'>Pending</span> },
            { value: 'preparing', label: <span className='text-[var(--purple)]'>Preparing</span> },
            { value: 'completed', label: <span className='text-[var(--green)]'>Completed</span> },
          ]}
        />
      </div>

      <div className='mt-2 h-full overflow-y-auto pb-4'>
        <OrderTable />
      </div>
    </section>
  );
};
