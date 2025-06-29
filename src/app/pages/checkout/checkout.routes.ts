import type { JSX, LazyExoticComponent } from 'react';
import { lazy } from 'react';

import type { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import { ROUTES } from '../../core/constants/routes';

const Checkout: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Checkout'));

const checkoutRoutes: PageRoute[] = [
  {
    path: ROUTES.CHECKOUT,
    element: Checkout,
  },
];

export default checkoutRoutes;
