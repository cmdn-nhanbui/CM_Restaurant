import type { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { CheckCircleFilled } from '@ant-design/icons';

type PaymentMethod = 'credit_card' | 'paypal' | 'cash';

interface PaymentCardProps {
  method: PaymentMethod;
  selected?: boolean;
  icon: ReactNode;
  label: string;
  onSelect?: (method: PaymentMethod) => void;
}

export const PaymentCard: FC<PaymentCardProps> = ({ method, icon, selected = false, label, onSelect }) => {
  return (
    <button
      onClick={() => {
        if (onSelect) onSelect(method);
      }}
      className={classNames(
        'relative rounded-xl border transition-colors flex flex-col items-center justify-center gap-2 py-2.5 px-4 min-w-[100px]',
        selected
          ? 'bg-[var(--background-primary)] border-[var(--text-light)] text-white fill-white'
          : 'bg-transparent border-[var(--dark-line)] text-[var(--text-light)] fill-[var(--text-light)] hover:border-white hover:text-white hover:fill-white',
      )}
    >
      {icon}
      <span className='text-sm font-medium'>{label}</span>

      {selected && (
        <span className='absolute top-1 right-1 '>
          <CheckCircleFilled className='w-4 h-4' style={{ color: 'var(--primary)' }} />
        </span>
      )}
    </button>
  );
};
