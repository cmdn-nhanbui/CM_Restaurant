import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

export const MenuItem = ({ children, onClick }: Props) => {
  return (
    <li
      onClick={onClick}
      className={`cursor-pointer flex items-center py-3 px-2 rounded-lg font-semibold text-sm hover:bg-[var(--background-primary)] text-white`}
    >
      {children}
    </li>
  );
};
