import { ROUTES } from '@/core/constants/routes';
import { NavLink } from 'react-router-dom';
import { Icon } from './Icons';
import classNames from 'classnames';

export const Footer = () => {
  return (
    <footer className='fixed bottom-3 w-full block sm:hidden'>
      <div className='m-auto flex h-14 w-[94%] rounded-[4px] bg-[var(--background-secondary)]'>
        <div className='flex flex-1 items-center justify-center'>
          <NavLink
            to={ROUTES.ROOT}
            className={(nav) =>
              classNames(
                'flex h-10  cursor-pointer items-center justify-center rounded-sm fill-[var(--primary)] px-6',
                {
                  'bg-[var(--primary)] shadow-primary fill-white': nav.isActive,
                },
              )
            }
          >
            <Icon icon='home' color='inherit' />
          </NavLink>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <NavLink
            to={ROUTES.CART}
            className={(nav) =>
              classNames(
                'flex h-10  cursor-pointer items-center justify-center rounded-sm fill-[var(--primary)] px-6',
                {
                  'bg-[var(--primary)] shadow-primary fill-white': nav.isActive,
                },
              )
            }
          >
            <Icon icon='shop' color='inherit' />
          </NavLink>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <NavLink
            to={ROUTES.NOTIFICATION}
            className={(nav) =>
              classNames(
                'flex h-10  cursor-pointer items-center justify-center rounded-sm fill-[var(--primary)] px-6',
                {
                  'bg-[var(--primary)] shadow-primary fill-white': nav.isActive,
                },
              )
            }
          >
            <Icon icon='bell' color='inherit' />
          </NavLink>
        </div>
      </div>
    </footer>
  );
};
