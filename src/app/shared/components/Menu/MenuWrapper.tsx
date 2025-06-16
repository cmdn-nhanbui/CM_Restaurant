import type { ReactNode } from 'react';
import classNames from 'classnames';

type Props = {
  children: ReactNode;
};

export const MenuWrapper = ({ children }: Props) => {
  const classes = classNames(
    'mt-2 origin-top-left rounded-lg shadow-primary w-56 p-2 z-[2000] border border-[var(--dark-line)] bg-[var(--background-secondary)]',
  );
  return <ul className={classes}>{children}</ul>;
};
