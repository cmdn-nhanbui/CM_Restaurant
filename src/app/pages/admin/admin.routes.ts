import type { JSX, LazyExoticComponent } from 'react';
import { lazy } from 'react';

import type { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import { ADMIN_ROUTES } from '../../core/constants/routes';

const Dashboard: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Dashboard'));
const Setting: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Settings'));
const Notification: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Notification'));
const Products: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Products'));
const Statistic: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Statistic'));
const Table: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Table'));

const adminRoutes: PageRoute[] = [
  {
    path: ADMIN_ROUTES.DASHBOARD,
    element: Dashboard,
  },
  {
    path: ADMIN_ROUTES.SETTING,
    element: Setting,
  },
  {
    path: ADMIN_ROUTES.NOTIFICATION,
    element: Notification,
  },
  {
    path: ADMIN_ROUTES.PRODUCTS,
    element: Products,
  },
  {
    path: ADMIN_ROUTES.CATEGORIES,
    element: Products,
  },
  {
    path: ADMIN_ROUTES.STATISTIC,
    element: Statistic,
  },
  {
    path: ADMIN_ROUTES.TABLES,
    element: Table,
  },
];

export default adminRoutes;
