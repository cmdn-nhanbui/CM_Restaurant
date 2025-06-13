import { AddNewDishCard } from '@/shared/components/AddNewDishCard';
import { EditCard } from '@/shared/components/EditCard';
import type { RootState } from '@src/redux/store';
import { useSelector } from 'react-redux';

const Notification = () => {
  const { data } = useSelector((state: RootState) => state.user);

  return (
    <>
      <div>Notification</div>
      <div>{JSON.stringify(data)}</div>
      <div className='flex gap-3'>
        <AddNewDishCard />
        <EditCard
          imageUrl='https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Noodles-with-chilli-oil-eggs-6ec34e9.jpg'
          name='Spicy seasoned seafood noodles'
          price={2.29}
          quantity={20}
          onEdit={() => alert('Edit dish')}
        />
      </div>
    </>
  );
};

export default Notification;
