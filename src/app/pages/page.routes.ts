import React from 'react';

import type { PageRoute } from '../core/modules/custom-router-dom/router.interface';
import homeRoutes from './home/home.routes';
import errorRoutes from './error/error.routes';
import notificationRoutes from './notification/notification.routes';
import cartRoutes from './cart/cart.routes';
import loginRoutes from './login/login.routes';
import orderRoutes from './order/order.routes';
import categoriesRoutes from './Categories/categories.routes';

const Page = React.lazy(() => import('./Page'));
const ProductPage = React.lazy(() => import('./ProductPage'));

const pageRoutes: PageRoute[] = [
  {
    path: '/',
    element: ProductPage,
    children: [...homeRoutes, ...categoriesRoutes],
  },
  {
    path: '/',
    element: Page,
    children: [...notificationRoutes, ...cartRoutes, ...loginRoutes, ...orderRoutes, ...errorRoutes],
  },
];

export default pageRoutes;
