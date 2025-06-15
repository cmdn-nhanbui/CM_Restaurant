import { Select } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          '#65B0F6',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='bg-[var(--background-secondary)] text-white p-6 rounded-lg w-full max-w-sm mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Most Ordered</h2>
        <Select
          rootClassName='custom-antd-select'
          defaultValue='today'
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
            { value: 'today', label: 'Today' },
            { value: 'last_week', label: 'Last Week' },
            { value: 'last_month', label: 'Last Month' },
          ]}
        />
      </div>
      <div className='my-6 border-b border-[var(--dark-line)]'></div>
      <Doughnut data={data} />
    </div>
  );
};
