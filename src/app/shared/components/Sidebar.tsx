import { NavLink } from 'react-router-dom';
import { Icon } from './Icons';
import { ROUTES } from '@/core/constants/routes';
import classNames from 'classnames';

export const Sidebar = () => {
  return (
    <aside className='bg-[var(--background-secondary)] min-h-screen flex flex-col items-center justify-between'>
      <div className='flex flex-col'>
        <button className='p-4'>
          <div className='p-3 bg-[#eb956a4d] rounded-xl cursor-pointer'>
            <Icon icon='logo' />
          </div>
        </button>
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
              classNames('flex p-[18px] rounded-xl fill-[var(--primary)] cursor-pointer', {
                'bg-[var(--primary)] fill-white': nav.isActive,
              })
            }
          >
            <Icon icon='shop' color='inherit' />
          </NavLink>
        </button>
      </div>

      <button className='p-4'>
        <NavLink to={ROUTES.ROOT} className='flex p-[18px] rounded-xl cursor-pointer'>
          <Icon icon='logout' color='var(--primary)' />
        </NavLink>
      </button>
    </aside>
  );
};
