import { NavLink } from 'react-router-dom';
import { Icon } from './Icons';
import { ROUTES } from '@/core/constants/routes';
import classNames from 'classnames';
import { LoginOutlined, ShoppingCartOutlined } from '@ant-design/icons';

export const Sidebar = () => {
  return (
    <aside className='bg-[var(--background-secondary)] min-h-screen  flex-col items-center justify-between hidden sm:flex'>
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
          <NavLink
            to={ROUTES.CART}
            className={(nav) =>
              classNames('flex p-[18px] rounded-xl fill-[var(--primary)] cursor-pointer text-[var(--primary)]', {
                'bg-[var(--primary)] fill-white text-white': nav.isActive,
              })
            }
          >
            <ShoppingCartOutlined
              color='inherit'
              style={{
                fontSize: 20,
              }}
            />
          </NavLink>
        </button>
      </div>

      <button className='p-4'>
        <NavLink
          to={ROUTES.LOGIN}
          className={(nav) =>
            classNames('flex p-[18px] rounded-xl text-[var(--primary)] cursor-pointer', {
              'bg-[var(--primary)] text-white': nav.isActive,
            })
          }
        >
          <LoginOutlined style={{ fontSize: 20, color: 'inherit' }} />
          {/* <Icon icon='logout' color='var(--primary)' /> */}
        </NavLink>
      </button>
    </aside>
  );
};
