import type { JSX, LazyExoticComponent } from 'react';
import { lazy } from 'react';

import type { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import { STAFF_ROUTES } from '../../core/constants/routes';

const Dashboard: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Dashboard'));
const Setting: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Settings'));
const Orders: LazyExoticComponent<() => JSX.Element> = lazy(() => import('../admin/containers/Orders'));

const staffRoutes: PageRoute[] = [
  {
    path: STAFF_ROUTES.DASHBOARD,
    element: Dashboard,
  },
  {
    path: STAFF_ROUTES.SETTINGS,
    element: Setting,
  },
  {
    path: STAFF_ROUTES.ORDER,
    element: Orders,
  },
];

export default staffRoutes;
