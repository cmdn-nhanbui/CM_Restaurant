import type { JSX, LazyExoticComponent } from 'react';
import { lazy } from 'react';

import type { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import { ADMIN_ROUTES } from '../../core/constants/routes';

const Dashboard: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Dashboard'));
const Setting: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Settings'));
const Products: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Products'));
const Statistic: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Statistic'));
const User: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/User'));
const Orders: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Orders'));
const Invoice: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Invoice'));

const adminRoutes: PageRoute[] = [
  {
    path: ADMIN_ROUTES.DASHBOARD,
    element: Dashboard,
  },
  {
    path: ADMIN_ROUTES.SETTINGS,
    element: Setting,
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
    path: ADMIN_ROUTES.USER,
    element: User,
  },
  {
    path: ADMIN_ROUTES.ORDER,
    element: Orders,
  },
  {
    path: ADMIN_ROUTES.INVOICE,
    element: Invoice,
  },
];

export default adminRoutes;
