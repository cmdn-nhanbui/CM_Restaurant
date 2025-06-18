import { getCurrentDate } from '@/core/helpers/timeHelper';

const Orders = () => {
  return (
    <div className='flex gap-6 sm:flex-row flex-col sm:h-full'>
      <div className='w-full overflow-y-hidden flex flex-col'>
        <div className='flex flex-col text-[var(--text-lighter)] pb-6 border-b border-[var(--dark-line)]'>
          <h2 className='text-white font-semibold text-3xl'>Orders</h2>
          <p className='text-lg'>{getCurrentDate()}</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
