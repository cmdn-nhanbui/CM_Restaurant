import React from 'react';

import classNames from 'classnames';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

type SummaryCardProps = {
  title: string;
  amount: number | string;
  percent: number;
  icon: React.ReactNode;
};

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, percent, icon }) => {
  const isIncrease = percent >= 0;

  return (
    <div className='bg-[var(--background-secondary)] rounded-lg p-4 w-full  text-white shadow-md flex-1'>
      <div className='flex gap-3 items-center'>
        <div
          className={classNames(
            'w-10 h-10 flex items-center justify-center p-2 rounded-lg bg-[var(--form-background)]',
          )}
        >
          {icon}
        </div>
        <div
          className={classNames(
            'flex items-center gap-1 text-sm font-medium',
            isIncrease ? 'text-[var(--green)]' : 'text-[var(--red)]',
          )}
        >
          {isIncrease ? '+' : ''}
          {percent.toFixed(2)}%{isIncrease ? <ArrowUpOutlined size={16} /> : <ArrowDownOutlined size={16} />}
        </div>
      </div>
      <div className='text-2xl font-semibold mt-2  mb-1'>
        {typeof amount === 'number' ? `$${amount.toLocaleString()}` : amount}
      </div>
      <div className='text-sm text-[var(--text-light)]'>{title}</div>
    </div>
  );
};
