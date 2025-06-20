import React from 'react';

import type { PageRoute } from '../core/modules/custom-router-dom/router.interface';
import homeRoutes from './home/home.routes';
import errorRoutes from './error/error.routes';
import notificationRoutes from './notification/notification.routes';
import cartRoutes from './cart/cart.routes';
import loginRoutes from './login/login.routes';
import orderRoutes from './order/order.routes';
import categoriesRoutes from './Categories/categories.routes';
import adminRoutes from './admin/admin.routes';
import checkoutRoutes from './checkout/checkout.routes';

const Page = React.lazy(() => import('./Page'));
const ProductPage = React.lazy(() => import('./ProductPage'));
const AdminPage = React.lazy(() => import('./AdminPage'));

const pageRoutes: PageRoute[] = [
  {
    path: '/',
    element: ProductPage,
    children: [...homeRoutes, ...categoriesRoutes, ...checkoutRoutes],
  },
  {
    path: '/',
    element: Page,
    children: [...notificationRoutes, ...cartRoutes, ...loginRoutes, ...orderRoutes, ...errorRoutes],
  },
  {
    path: '/',
    element: AdminPage,
    children: [...adminRoutes],
  },
];

export default pageRoutes;
