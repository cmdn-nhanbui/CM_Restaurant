import { Outlet } from 'react-router';
import DefaultLayout from '../shared/layouts/DefaultLayout';

const Page = () => {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

export default Page;
