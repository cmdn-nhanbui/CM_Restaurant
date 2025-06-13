import { Navigate, Outlet } from 'react-router';
import ManageLayout from '@/shared/layouts/ManageLayout';
import { useSelector } from 'react-redux';
import type { RootState } from '@src/redux/store';
import { ROUTES } from '@/core/constants/routes';

const AdminPage = () => {
  const { data } = useSelector((state: RootState) => state.user);

  if (!data || data?.role !== 'admin') return <Navigate to={ROUTES.LOGIN} />;

  return (
    <ManageLayout>
      <Outlet />
    </ManageLayout>
  );
};

export default AdminPage;
