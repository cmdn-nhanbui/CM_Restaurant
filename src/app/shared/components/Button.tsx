import classNames from 'classnames';
import type { ReactNode } from 'react';

type Props = {
  primary?: boolean;
  outlined?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export const Button = ({ outlined, primary = true, children, onClick, type = 'submit', className }: Props) => {
  return (
    <button
      type={type}
      className={classNames(
        'text-sm p-[14px] rounded-md font-semibold cursor-pointer',
        {
          'bg-[var(--primary)] text-white': primary && !outlined,
          'border border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white':
            outlined,
        },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
