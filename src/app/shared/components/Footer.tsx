import { ROUTES } from '@/core/constants/routes';
import { Icon } from './Icons';
import classNames from 'classnames';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { NavLinkWithQuery } from '@/pages/order/components/NavLinkWithQuery';
import { useSelector } from 'react-redux';
import type { RootState } from '@src/redux/store';

export const Footer = () => {
  const { data } = useSelector((state: RootState) => state.cart);
  return (
    <footer className='fixed bottom-3 w-full block sm:hidden'>
      <div className='m-auto flex h-14 w-[94%] rounded-[4px] bg-[var(--background-secondary)]'>
        <div className='flex flex-1 items-center justify-center'>
          <NavLinkWithQuery
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
          </NavLinkWithQuery>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <NavLinkWithQuery
            to={ROUTES.CART}
            className={(nav) =>
              classNames(
                'flex h-10  cursor-pointer items-center justify-center rounded-sm fill-[var(--primary)] px-6 text-[var(--primary)]',
                {
                  'bg-[var(--primary)] shadow-primary fill-white text-white': nav.isActive,
                },
              )
            }
          >
            {(nav) => {
              return (
                <Badge count={data?.length}>
                  <ShoppingCartOutlined
                    style={{
                      fontSize: 22,
                      color: nav.isActive ? 'white' : 'var(--primary)',
                    }}
                  />
                </Badge>
              );
            }}
          </NavLinkWithQuery>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <NavLinkWithQuery
            to={ROUTES.ORDER}
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
          </NavLinkWithQuery>
        </div>
        {/* <div className='flex flex-1 items-center justify-center'>
          <NavLinkWithQuery
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
            <Badge count={5}>
              <Icon icon='bell' color='inherit' />
            </Badge>
          </NavLinkWithQuery>
        </div> */}
      </div>
    </footer>
  );
};
