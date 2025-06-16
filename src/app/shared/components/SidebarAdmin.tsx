import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Icon } from './Icons';
import { ADMIN_ROUTES } from '@/core/constants/routes';

export const SidebarAdmin = () => {
  return (
    <aside className='bg-[var(--background-secondary)] min-h-screen flex-col items-center justify-between flex rounded-r-2xl h-screen'>
      <div className='flex flex-col'>
        <h1 className='p-4 logo'>
          <div className='p-3 bg-[#eb956a4d] rounded-xl'>
            <Icon icon='logo' />
          </div>
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
            <Icon icon='bell' color='inherit' />
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
            to={ADMIN_ROUTES.STATISTIC}
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
            to={ADMIN_ROUTES.TABLES}
            className={(nav) =>
              classNames('flex p-[18px] rounded-xl fill-[var(--primary)] cursor-pointer text-[var(--primary)]', {
                'bg-[var(--primary)] fill-white text-white': nav.isActive,
              })
            }
          >
            <Icon icon='table' color='inherit' />
          </NavLink>
        </div>
      </div>

      <div className='p-4'>
        <button className={'flex p-[18px] rounded-xl text-[var(--primary)] cursor-pointer'}>
          <Icon icon='logout' color='var(--primary)' />
        </button>
      </div>
    </aside>
  );
};
