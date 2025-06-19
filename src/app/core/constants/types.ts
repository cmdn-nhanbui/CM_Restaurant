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

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  category?: Category;
  orderQuantity: number;
  price: number;
  quantity: number | null;
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

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  gender: boolean;
  phoneNumber: string;
}

export interface OrderItemPayload {
  product_id: number;
  quantity: number;
  notes: string;
}

export interface CreateOrderPayload {
  tableId: string;
  orderItems: OrderItemPayload[];
}

export interface UpdateUserPayload {
  fullname: string;
  password: string;
  phone_number: string;
  gender: boolean;
}

export interface CreateUserPayload {
  fullname: string;
  email: string;
  password: string;
  phone_number: string;
  gender: boolean;
}

export interface OrderItem {
  id: string;
  price: number;
  status: OrderItemStatus;
  quantity: number;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
  product?: Product;
}

export interface Order {
  id: string;
  status: string;
  table: Table;
  orderItems: OrderItem[];
}

export type OrderItemStatus = 'pending' | 'completed' | 'preparing';
export type TableStatus = 'available' | 'occupied' | 'reserved';

export interface Table {
  id: string;
  name: string;
  orderItemQuantity: number;
  totalPayment: number;
  status: TableStatus;
  order?: any;
}
