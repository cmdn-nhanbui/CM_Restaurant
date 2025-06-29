import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { LoginOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { NavLinkWithQuery } from '@/pages/order/components/NavLinkWithQuery';
import { Icon } from './Icons';
import { CartDrawer } from './Drawers/CartDrawer';
import { OrderDrawer } from './Drawers/OrderDrawer';

import type { RootState } from '@src/redux/store';
import { ROUTES } from '@/core/constants/routes';
import { getPusher } from '../hooks/usePusher';
import { PUSHER_CHANEL } from '@/core/constants/pusher';

export const Sidebar = () => {
  const { data } = useSelector((state: RootState) => state.user);

  const { pathname } = useLocation();

  const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false);
  const [showPaymentDrawer, setShowPaymentDrawer] = useState<boolean>(false);

  useEffect(() => {
    const pusher = getPusher();
    const channel = pusher.subscribe(PUSHER_CHANEL);

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(PUSHER_CHANEL);
    };
  }, []);

  return (
    <>
      <aside className='bg-[var(--background-secondary)] min-h-screen flex-col items-center justify-between hidden sm:flex rounded-r-2xl h-screen'>
        <div className='flex flex-col'>
          <h1 className='p-4 logo'>
            <div className='p-3 bg-[#eb956a4d] rounded-xl'>
              <Icon icon='logo' />
            </div>
          </h1>
          <button className='p-4'>
            <NavLinkWithQuery
              to={ROUTES.ROOT}
              className={(nav) =>
                classNames('flex p-[18px] rounded-xl fill-[var(--primary)] cursor-pointer', {
                  'bg-[var(--primary)] fill-white': nav.isActive,
                })
              }
            >
              <Icon icon='home' color='inherit' />
            </NavLinkWithQuery>
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
          <button className='p-4'>
            <div
              onClick={() => setShowPaymentDrawer(true)}
              className={classNames(
                'flex p-[18px] rounded-xl fill-[var(--primary)] cursor-pointer text-[var(--primary)]',
                {
                  'bg-[var(--primary)] fill-white text-white': pathname === ROUTES.ORDER || showPaymentDrawer,
                },
              )}
            >
              <Icon icon='shop' color='inherit' width={18} height={18} />
            </div>
          </button>
        </div>

        <button className='p-4'>
          <NavLinkWithQuery
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
          </NavLinkWithQuery>
        </button>
      </aside>

      <CartDrawer isOpen={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
      {pathname !== ROUTES.ORDER && (
        <OrderDrawer isOpen={showPaymentDrawer} onClose={() => setShowPaymentDrawer(false)} />
      )}
    </>
  );
};
