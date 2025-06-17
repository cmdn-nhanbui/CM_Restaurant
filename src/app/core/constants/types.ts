export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export interface ErrorProps {
  status: number;
  title: string;
  description: string;
  navigateTo?: string | false;
  navigateTitle?: string;
}

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

export type CartItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  note: string;
};

export type OrderItemProps = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  note: string;
};

export interface CounterProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
}

export type Category = {
  id: number;
  name: string;
  navigateTo: string;
};

export type Role = 'admin' | 'staff';

export interface User {
  id: number;
  fullName: string;
  email: string;
  imageUrl: string;
  role: Role;
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  category: Category;
  orderQuantity: number;
  price: number;
  quantity: number;
}

export interface AdditionalNavItem {
  name: string;
  navigateTo: string;
}

export interface FormUpdatePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RenderFieldProps {
  label: string;
  id: string;
  name: keyof FormUpdatePassword;
  errorMessage?: string;
  show: boolean;
  toggleShow: () => void;
}
