import type { JSX, LazyExoticComponent } from 'react';
import { lazy } from 'react';

import type { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import { ROUTES } from '../../core/constants/routes';

const Order: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Order'));

const orderRoutes: PageRoute[] = [
  {
    path: ROUTES.ORDER,
    element: Order,
  },
];

export default orderRoutes;
