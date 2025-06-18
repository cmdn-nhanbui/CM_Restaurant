import { type ReactNode } from 'react';
import classNames from 'classnames';

export type BadColor = 'green' | 'purple' | 'orange' | 'red' | 'blue';
type Props = {
  color?: BadColor;
  children: ReactNode;
};

const BADGE_COLORS = {
  green: 'bg-[var(--green)]/25 text-[var(--green)]',
  purple: 'bg-[var(--purple)]/25 text-[var(--purple)]',
  orange: 'bg-[var(--orange)]/25 text-[var(--orange)]',
  blue: 'bg-[var(--blue)]/25 text-[var(--blue)]',
  red: 'bg-[var(--red)]/25 text-[var(--red)]',
};

export const Badge = ({ children, color = 'green' }: Props) => {
  const classes = classNames('py-1 px-4 rounded-[30px] text-sm', BADGE_COLORS[color]);
  return <span className={classes}>{children} </span>;
};
