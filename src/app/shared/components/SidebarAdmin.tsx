import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Badge, message } from 'antd';

import { ConfirmModal } from './Modals/ConfirmModal';
import { Icon } from './Icons';
import { ADMIN_ROUTES, ROUTES } from '@/core/constants/routes';
import { handleLogout } from '@/core/helpers/authHelper';
import { getPusher } from '../hooks/usePusher';
import { PUSHER_CHANEL } from '@/core/constants/pusher';

export const SidebarAdmin = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLogoutModal, setConfirmLogoutModal] = useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState<number>(0);

  const handleDestroyMessages = () => {
    messageApi.destroy();
    setNotificationCount(0);
  };

  useEffect(() => {
    const pusher = getPusher();
    const channel = pusher.subscribe(PUSHER_CHANEL);

    channel.bind('NewOrder', (data: any) => {
      console.log('📩 Notification received:', data);
      const toastMessage = `${data?.notification?.table_name} just created a new order`;
      setNotificationCount((prev) => prev + 1);

      messageApi.open({
        type: 'success',
        duration: 0, // không tự động đóng
        content: <div onClick={handleDestroyMessages}>{toastMessage}</div>,
      });
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(PUSHER_CHANEL);
    };
  }, []);

  return (
    <>
      {contextHolder}
      <aside className='bg-[var(--background-secondary)] min-h-screen flex-col items-center justify-between flex rounded-r-2xl h-screen'>
        <div className='flex flex-col'>
          <h1 className='p-4 logo'>
            <Link to={ROUTES.ROOT}>
              <div className='p-3 bg-[#eb956a4d] rounded-xl'>
                <Icon icon='logo' />
              </div>
            </Link>
          </h1>
          <div className='p-4'>
            <NavLink
              to={ADMIN_ROUTES.DASHBOARD}
              end
              className={(nav) =>
                classNames('flex p-[18px] rounded-xl fill-[var(--primary)] cursor-pointer', {
                  'bg-[var(--primary)] fill-white': nav.isActive,
                })
              }
            >
              <Icon icon='home' color='inherit' />
            </NavLink>
          </div>
          <div className='p-4'>
            <NavLink
              to={ADMIN_ROUTES.NOTIFICATION}
              className={(nav) =>
                classNames('flex p-[18px] rounded-xl fill-[var(--primary)] cursor-pointer', {
                  'bg-[var(--primary)] fill-white': nav.isActive,
                })
              }
            >
              <Badge count={notificationCount}>
                <Icon icon='bell' color='inherit' />
              </Badge>
            </NavLink>
          </div>

          <div className='p-4'>
            <NavLink
              to={ADMIN_ROUTES.PRODUCTS}
              className={(nav) =>
                classNames('flex p-[18px] rounded-xl fill-[var(--primary)] cursor-pointer text-[var(--primary)]', {
                  'bg-[var(--primary)] fill-white text-white': nav.isActive,
                })
              }
            >
              <Icon icon='products' color='inherit' />
            </NavLink>
          </div>
          <div className='p-4'>
            <NavLink
              to={ADMIN_ROUTES.ORDER}
              className={(nav) =>
                classNames('flex p-[18px] rounded-xl fill-[var(--primary)] cursor-pointer text-[var(--primary)]', {
                  'bg-[var(--primary)] fill-white text-white': nav.isActive,
                })
              }
            >
              <Icon icon='chart' color='inherit' />
            </NavLink>
          </div>
          <div className='p-4'>
            <NavLink
              to={ADMIN_ROUTES.USER}
              className={(nav) =>
                classNames('flex p-[18px] rounded-xl fill-[var(--primary)] cursor-pointer text-[var(--primary)]', {
                  'bg-[var(--primary)] fill-white text-white': nav.isActive,
                })
              }
            >
              <Icon icon='users' color='inherit' />
            </NavLink>
          </div>
          <div className='p-4'>
            <NavLink
              to={ADMIN_ROUTES.SETTING}
              className={(nav) =>
                classNames('flex p-[18px] rounded-xl fill-[var(--primary)] cursor-pointer text-[var(--primary)]', {
                  'bg-[var(--primary)] fill-white text-white': nav.isActive,
                })
              }
            >
              <Icon icon='setting' color='inherit' />
            </NavLink>
          </div>
        </div>

        <div className='p-4'>
          <button
            onClick={() => setConfirmLogoutModal(true)}
            className={'flex p-[18px] rounded-xl text-[var(--primary)] cursor-pointer'}
          >
            <Icon icon='logout' color='var(--primary)' />
          </button>
        </div>
      </aside>

      <ConfirmModal
        isModalOpen={confirmLogoutModal}
        onCancel={() => setConfirmLogoutModal(false)}
        onOk={handleLogout}
        title='LOGOUT'
        description='Do you want to log out of the application?'
        contentConfirmButton='Logout'
      />
    </>
  );
};
