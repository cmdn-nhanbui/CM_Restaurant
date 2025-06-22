import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

import ManageLayout from '@/shared/layouts/ManageLayout';
import { Loading } from '@/shared/components/Loading';

import type { RootState } from '@src/redux/store';
import { useGetProfile } from '@/shared/hooks/useUser';
import { getLS, KEYS } from '@/core/helpers/storageHelper';
import { ROLES } from '@/core/constants/roles';
import { ROUTES } from '@/core/constants/routes';

const AdminPage = () => {
  const { data } = useSelector((state: RootState) => state.user);

  const { data: userData, isLoading, error } = useGetProfile(data);

  const accessToken = getLS(KEYS.ACCESS_TOKEN);
  if (!accessToken) return <Navigate to={ROUTES.LOGIN} />;

  if (isLoading) return <Loading />;

  if (error || userData?.role !== ROLES.STAFF) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <ManageLayout>
      <Outlet />
    </ManageLayout>
  );
};

export default AdminPage;
