export const ROUTES = {
  ROOT: '/',
  CART: '/cart',
  LOGIN: '/login',
  ORDER: '/order',
  CATEGORIES: '/categories/:id',
  NOTIFICATION: '/notification',
  MANAGEMENT: '/management',
  CHECKOUT: '/checkout',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
};

export const ADMIN_ROUTES = {
  DASHBOARD: '/admin',
  SETTINGS: '/admin/setting/*',
  STATISTIC: '/admin/statistic',
  PRODUCTS: '/admin/products',
  CATEGORIES: '/admin/products/:id',
  SETTING: '/admin/setting',
  PASSWORD: '/admin/setting/password',
  USER: '/admin/user',
  ORDER: '/admin/order',
  INVOICE: '/admin/invoice',
};

export const STAFF_ROUTES = {
  DASHBOARD: '/staff',
  SETTINGS: '/staff/setting/*',
  SETTING: '/staff/setting',
  PRODUCTS: '/staff/products',
  PASSWORD: '/staff/setting/password',
  ORDER: '/staff/order',
};
