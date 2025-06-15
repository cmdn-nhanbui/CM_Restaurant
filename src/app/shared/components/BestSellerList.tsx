import { Select } from 'antd';
import { Button } from './Button';

const orders = [
  {
    id: 1,
    title: 'Spicy seasoned seafood noodles',
    count: 200,
    image: 'https://i0.wp.com/seonkyounglongest.com/wp-content/uploads/2019/09/Jjamppong-12.jpg?fit=1500%2C844&ssl=1',
  },
  {
    id: 2,
    title: 'Salted pasta with mushroom sauce',
    count: 120,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRatd7C0cG5qtROs-RDhqeha9sBjZBRVsla9g&s',
  },
  {
    id: 3,
    title: 'Beef dumpling in hot and sour soup',
    count: 80,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCMg5poiB1WLjb-bDl01kjgqX3gRMCNwJZhQ&s',
  },
];

export const BestSellerList = () => {
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
      <div className='space-y-5 mb-6'>
        {orders.map((item) => (
          <div key={item.id} className='flex items-center space-x-4'>
            <img src={item.image} alt={item.title} className='w-12 h-12 rounded-full object-cover' />
            <div>
              <p className='font-medium text-[var(--text-lighter)]'>{item.title}</p>
              <p className='text-sm text-[var(--text-light)]'>{item.count} dishes ordered</p>
            </div>
          </div>
        ))}
      </div>

      <Button outlined className='w-full'>
        View All
      </Button>
    </div>
  );
};
