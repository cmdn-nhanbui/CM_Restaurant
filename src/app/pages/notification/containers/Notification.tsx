import { AddNewDishCard } from '@/shared/components/AddNewDishCard';
import { EditCard } from '@/shared/components/EditCard';

const Notification = () => {
  return (
    <>
      <div>Notification</div>
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
