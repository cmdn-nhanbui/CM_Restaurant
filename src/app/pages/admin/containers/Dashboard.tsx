import { BestSellerList } from '@/shared/components/BestSellerList';
import { Icon } from '@/shared/components/Icons';
import { ListOrder } from '@/shared/components/ListOrder';
import { PieChart } from '@/shared/components/PieChart';
import { SummaryCard } from '@/shared/components/SummaryCard';
import { DollarOutlined } from '@ant-design/icons';

const Dashboard = () => {
  return (
    <div className='row gap-6 sm:flex-row flex-col'>
      <div className='sm:w-2/3 w-full'>
        <div className='flex flex-col text-[var(--text-lighter)] pb-6 border-b border-[var(--dark-line)]'>
          <h2 className='text-white font-semibold text-3xl'>Jaegar Resto</h2>
          <p className='text-lg'>Tuesday, 2 Feb 2021</p>
        </div>

        <section className='py-6 flex gap-6 sm:flex-row flex-col'>
          <SummaryCard
            title='Total Revenue'
            amount={10243}
            percent={32.4}
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
            title='Total Dish Ordered'
            amount={23.456}
            percent={-14.4}
            icon={<Icon icon='book-mark' color='var(--orange)' />}
          />
          <SummaryCard
            title='Total Customer'
            amount={10243}
            percent={2.4}
            icon={<Icon width={24} height={24} icon='users' color='var(--blue)' />}
          />
        </section>

        <ListOrder />
      </div>
      <div className='1/3'>
        <BestSellerList />

        <div className='mt-6'>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
