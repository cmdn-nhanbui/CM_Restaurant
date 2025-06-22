import { getCurrentDate } from '@/core/helpers/timeHelper';
import { BestSellerList } from '@/shared/components/BestSellerList';
import { ListTable } from '@/shared/components/ListTable';
import { PieChart } from '@/shared/components/PieChart';

const Dashboard = () => {
  return (
    <div className='flex gap-6 sm:flex-row flex-col sm:h-full'>
      <div className='w-full overflow-y-hidden flex flex-col'>
        <div className='flex flex-col text-[var(--text-lighter)] pb-6 border-b border-[var(--dark-line)]'>
          <h2 className='text-white font-semibold text-3xl'>Dashboard</h2>
          <p className='text-lg'>{getCurrentDate()}</p>
        </div>
        <div className='pt-6 h-full'>
          <ListTable />
        </div>
      </div>
      <div className='sm:w-1/3 w-full overflow-y-auto scrollbar-hidden'>
        <div className='mb-6'>
          <PieChart />
        </div>
        <BestSellerList />
      </div>
    </div>
  );
};

export default Dashboard;
