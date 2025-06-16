import React from 'react';
import classNames from 'classnames';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
};

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(({ className, ...props }, ref) => {
  return (
    <div
      className={classNames(
        ' rounded-lg bg-[var(--form-background)] border border-[var(--dark-line)] w-full relative',
        { 'pl-7': props?.icon },
      )}
    >
      <input
        ref={ref}
        className={classNames(
          'p-[14px] text-[var(--text-lighter)] w-full outline-none bg-transparent',
          { 'no-spinner': props.type === 'number' },
          className,
        )}
        {...props}
      />
      {props?.icon && <div className='absolute top-1/2 left-3 -translate-y-1/2 '>{props.icon}</div>}
    </div>
  );
});

TextField.displayName = 'TextField';
