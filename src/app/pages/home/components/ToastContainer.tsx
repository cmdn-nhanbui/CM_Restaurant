import React from 'react';
import clsx from 'clsx';

import { TOAST_TYPES, type ToastContainerProps } from '../../../core/constants/types';
import { Icon } from '../../../shared/components/Icons';

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <div className='toast-container'>
      {toasts.map((toast) => {
        return (
          <div key={toast.id} className='toast-item'>
            <div
              className={clsx('check-container', {
                'toast-error': toast.type === TOAST_TYPES.ERROR,
              })}
            >
              <Icon
                icon={toast.type === TOAST_TYPES.SUCCESS ? 'check' : 'x-mark'}
                width={20}
                height={20}
                className='check-icon'
              />
            </div>
            <p className='toast-message'>{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
