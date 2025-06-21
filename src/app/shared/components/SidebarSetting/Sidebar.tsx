import { HeartOutlined } from '@ant-design/icons';
import { TabItem } from './TabItem';
import { Icon } from '../Icons';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTES, STAFF_ROUTES } from '@/core/constants/routes';
import { useSelector } from 'react-redux';
import type { RootState } from '@src/redux/store';
import { ROLES } from '@/core/constants/roles';

export const Sidebar = () => {
  const { data: currentUser } = useSelector((state: RootState) => state.user);
  const isAdmin = currentUser?.role === ROLES.ADMIN;

  return (
    <div className='py-4'>
      <NavLink end to={isAdmin ? ADMIN_ROUTES.SETTING : STAFF_ROUTES.SETTING}>
        {({ isActive }) => (
          <TabItem
            title='Profile setting'
            description='Change your name, phonenumber...'
            active={isActive}
            icon={<HeartOutlined className='w-5 h-5 mt-1' style={{ fontSize: 20 }} />}
          />
        )}
      </NavLink>

      <NavLink to={isAdmin ? ADMIN_ROUTES.PASSWORD : STAFF_ROUTES.PASSWORD}>
        {({ isActive }) => (
          <TabItem
            active={isActive}
            title='Security'
            description='Configure Password'
            icon={<Icon icon='lock' color={isActive ? 'var(--primary)' : 'inherit'} />}
          />
        )}
      </NavLink>
    </div>
  );
};
