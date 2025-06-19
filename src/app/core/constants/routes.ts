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
  NOTIFICATION: '/admin/notify',
  PRODUCTS: '/admin/products',
  CATEGORIES: '/admin/products/:id',
  TABLES: '/admin/tables',
  SETTING: '/admin/setting',
  PASSWORD: '/admin/setting/password',
  USER: '/admin/user',
  ORDER: '/admin/order',
};
