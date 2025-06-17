import React, { type ReactNode } from 'react';
import classNames from 'classnames';

type TabItemProps = {
  title: string;
  description: string;
  active?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
};

export const TabItem: React.FC<TabItemProps> = ({ title, description, active = false, onClick, icon }) => {
  return (
    <div
      onClick={onClick}
      className={classNames('cursor-pointer p-6 transition-colors duration-300 relative', {
        'bg-[var(--primary)]/16 text-[var(--primary)]': active,
      })}
    >
      <div
        className={classNames('flex items-start gap-2 fill-[var(--text-light)]', {
          'text-white ': !active,
        })}
      >
        {icon}
        <div>
          <div className='font-semibold'>{title}</div>
          <div className='text-sm text-[var(--text-gray)] mt-1'>{description}</div>
        </div>
      </div>

      {active && (
        <div className='absolute w-1 h-10 rounded-4xl right-0 top-1/2 bg-[var(--primary)] -translate-y-1/2'></div>
      )}
    </div>
  );
};
