import { getCurrentDate } from '@/core/helpers/timeHelper';
import { BestSellerList } from '@/shared/components/BestSellerList';
import { ListTable } from '@/shared/components/ListTable';
import { PieChart } from '@/shared/components/PieChart';
import { SummaryCard } from '@/shared/components/SummaryCard';
import { useGetRevenueInDay, useGetRevenueInMonth, useGetRevenueInWeek } from '@/shared/hooks/useInvoice';
import { DollarOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const { data: dayRevenue } = useGetRevenueInDay();
  const { data: weekRevenue } = useGetRevenueInWeek();
  const { data: monthRevenue } = useGetRevenueInMonth();

  return (
    <div className='flex gap-6 sm:flex-row flex-col sm:h-full'>
      <div className='w-full overflow-y-hidden flex flex-col'>
        <div className='flex flex-col text-[var(--text-lighter)] pb-6 border-b border-[var(--dark-line)]'>
          <h2 className='text-white font-semibold text-3xl'>Dashboard</h2>
          <p className='text-lg'>{getCurrentDate()}</p>
        </div>

        <section className='py-6 flex gap-6 sm:flex-row flex-col'>
          <SummaryCard
            title='Total Revenue in Month'
            amount={monthRevenue?.total_amount || 0}
            percent={monthRevenue?.change_percent || 0}
            icon={
              <DollarOutlined
                className='text-white'
                style={{
                  color: 'var(--purple)',
                }}
              />
            }
          />

          <SummaryCard
            title='Total Revenue in Week'
            amount={weekRevenue?.total_amount || 0}
            percent={weekRevenue?.change_percent || 0}
            icon={
              <DollarOutlined
                className='text-white'
                style={{
                  color: 'var(--orange)',
                }}
              />
            }
          />

          <SummaryCard
            title='Total Revenue in Day'
            amount={dayRevenue?.total_amount || 0}
            percent={dayRevenue?.change_percent || 0}
            icon={
              <DollarOutlined
                className='text-white'
                style={{
                  color: 'var(--blue)',
                }}
              />
            }
          />
        </section>

        <ListTable />
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
