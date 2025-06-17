import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import type { AdditionalNavItem, Category } from '@/core/constants/types';
import { useSelector } from 'react-redux';
import type { RootState } from '@src/redux/store';

type Props = {
  loading?: boolean;
  categories?: Category[];
  additionalItems?: AdditionalNavItem[];
};

export const Navigation = ({ categories, loading, additionalItems }: Props) => {
  let { data, loading: fetchingCategories, error } = useSelector((state: RootState) => state.category);

  if (error) {
    data = categories || [];
  }

  if (categories) data = categories;

  return (
    <nav className='flex gap-8 sm:mt-6 mt-4 border-b border-[var(--dark-line)] overflow-x-auto scrollbar-hidden whitespace-nowrap pb-4 sm:pb-6'>
      {additionalItems?.map((item, index) => (
        <NavLink
          key={index}
          to={item?.navigateTo}
          end
          className={(nav) =>
            classNames('text-white font-semibold', {
              '!text-[var(--primary)]': nav.isActive,
            })
          }
        >
          {item.name}
        </NavLink>
      ))}
      {fetchingCategories || loading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='w-24 h-6 bg-[var(--form-background)] rounded-md animate-pulse' />
          ))
        : data?.map((item, index) => (
            <NavLink
              key={index}
              to={item?.navigateTo || `/categories/${item.id}`}
              className={(nav) =>
                classNames('text-white font-semibold', {
                  '!text-[var(--primary)]': nav.isActive,
                })
              }
            >
              {item.name}
            </NavLink>
          ))}
    </nav>
  );
};
