import { useSelector } from 'react-redux';
import type { RootState } from '@src/redux/store';

const Notification = () => {
  const { data } = useSelector((state: RootState) => state.user);

  return (
    <>
      <div>Notification</div>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};

export default Notification;
