import { SummaryCard } from '@/shared/components/SummaryCard';
import { DollarOutlined } from '@ant-design/icons';

const Dashboard = () => {
  return (
    <>
      <div>
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
      </div>
    </>
  );
};

export default Dashboard;
