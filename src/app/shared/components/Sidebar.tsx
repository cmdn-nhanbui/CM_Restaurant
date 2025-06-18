import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { LoginOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Icon } from './Icons';
import { ROUTES } from '@/core/constants/routes';
import { useSelector } from 'react-redux';
import type { RootState } from '@src/redux/store';
import { useState } from 'react';
import { CartDrawer } from './Drawers/CartDrawer';

export const Sidebar = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false);

  return (
    <div>
      <aside className='bg-[var(--background-secondary)] min-h-screen flex-col items-center justify-between hidden sm:flex rounded-r-2xl h-screen'>
        <div className='flex flex-col'>
          <h1 className='p-4 logo'>
            <div className='p-3 bg-[#eb956a4d] rounded-xl'>
              <Icon icon='logo' />
            </div>
          </h1>
          <button className='p-4'>
            <NavLink
              to={ROUTES.ROOT}
              className={(nav) =>
                classNames('flex p-[18px] rounded-xl fill-[var(--primary)] cursor-pointer', {
                  'bg-[var(--primary)] fill-white': nav.isActive,
                })
              }
            >
              <Icon icon='home' color='inherit' />
            </NavLink>
          </button>
          <button className='p-4'>
            <NavLink
              to={ROUTES.NOTIFICATION}
              className={(nav) =>
                classNames('flex p-[18px] rounded-xl fill-[var(--primary)] cursor-pointer', {
                  'bg-[var(--primary)] fill-white': nav.isActive,
                })
              }
            >
              <Icon icon='bell' color='inherit' />
            </NavLink>
          </button>
          <button className='p-4'>
            <div
              onClick={() => setShowCartDrawer(true)}
              className={classNames(
                'flex p-[18px] rounded-xl fill-[var(--primary)] cursor-pointer text-[var(--primary)]',
                {
                  'bg-[var(--primary)] fill-white text-white': showCartDrawer,
                },
              )}
            >
              <ShoppingCartOutlined
                color='inherit'
                style={{
                  fontSize: 20,
                }}
              />
            </div>
          </button>
        </div>

        <button className='p-4'>
          <NavLink
            to={data ? data.role : ROUTES.LOGIN}
            className={(nav) =>
              classNames('flex p-[18px] rounded-xl text-[var(--primary)] cursor-pointer', {
                'bg-[var(--primary)] text-white': nav.isActive,
              })
            }
          >
            {data ? (
              <UserOutlined style={{ fontSize: 20, color: 'inherit' }} />
            ) : (
              <LoginOutlined style={{ fontSize: 20, color: 'inherit' }} />
            )}
          </NavLink>
        </button>
      </aside>

      <CartDrawer isOpen={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
    </div>
  );
};
