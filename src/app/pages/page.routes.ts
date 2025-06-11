import React from 'react';

import type { PageRoute } from '../core/modules/custom-router-dom/router.interface';
import homeRoutes from './home/home.routes';
import errorRoutes from './error/error.routes';
import notificationRoutes from './notification/notification.routes';
import cartRoutes from './cart/cart.routes';

const Page = React.lazy(() => import('./Page'));

const pageRoutes: PageRoute[] = [
  {
    path: '/',
    element: Page,
    children: [...homeRoutes, ...notificationRoutes, ...cartRoutes, ...errorRoutes],
  },
];

export default pageRoutes;
