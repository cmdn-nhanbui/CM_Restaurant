import React, { createContext, useCallback, useState, type ReactNode } from 'react';

import ToastContainer from '../../pages/home/components/ToastContainer';
import type { ShowToastOptions, Toast, ToastContextType } from '../../core/constants/types';

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(({ message, duration = 1500, type = 'success' }: ShowToastOptions) => {
    const id = Math.random().toString(36).slice(2);
    const newToast: Toast = { id, message, duration, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};
