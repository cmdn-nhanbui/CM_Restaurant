import { HeartOutlined } from '@ant-design/icons';
import { TabItem } from './TabItem';
import { Icon } from '../Icons';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/core/constants/routes';

export const Sidebar = () => {
  return (
    <div className='py-4'>
      <NavLink end to={ADMIN_ROUTES.SETTING}>
        {({ isActive }) => (
          <TabItem
            title='Profile setting'
            description='Change your name, phonenumber...'
            active={isActive}
            icon={<HeartOutlined className='w-5 h-5 mt-1' style={{ fontSize: 20 }} />}
          />
        )}
      </NavLink>

      <NavLink to={ADMIN_ROUTES.PASSWORD}>
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
