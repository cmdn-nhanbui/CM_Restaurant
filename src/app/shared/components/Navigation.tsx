import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import type { Category } from '@/core/constants/types';

type Props = {
  loading?: boolean;
  categories: Category[];
};

export const Navigation = ({ categories, loading }: Props) => {
  return (
    <nav className='flex gap-8 sm:mt-6 mt-4 border-b border-[var(--dark-line)] overflow-x-auto scrollbar-hidden whitespace-nowrap pb-4 sm:pb-6'>
      {loading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='w-24 h-6 bg-[var(--form-background)] rounded-md animate-pulse' />
          ))
        : categories?.map((item, index) => (
            <NavLink
              key={index}
              to={`/categories/${item.id}`}
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
