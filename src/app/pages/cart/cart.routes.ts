import type { JSX, LazyExoticComponent } from 'react';
import { lazy } from 'react';

import type { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import { ROUTES } from '../../core/constants/routes';

const Cart: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Cart'));

const cartRoutes: PageRoute[] = [
  {
    path: ROUTES.CART,
    element: Cart,
  },
];

export default cartRoutes;
