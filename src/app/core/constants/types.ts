export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export interface Toast {
  id: string;
  message: string;
  duration?: number;
  type?: (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];
}

export interface ToastContainerProps {
  toasts: Toast[];
}

export type ShowToastOptions = Omit<Toast, 'id'>;

export type ToastContextType = {
  showToast: ({ type, message, duration }: ShowToastOptions) => void;
};
