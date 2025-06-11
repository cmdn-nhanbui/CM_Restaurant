import { lazy, type JSX, type LazyExoticComponent } from 'react';
import type { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import { ROUTES } from '../../core/constants/routes';

const NotFoundError: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/NotFound'));
const ServerError: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/ServerError'));

const errorRoutes: PageRoute[] = [
  {
    path: ROUTES.NOT_FOUND,
    element: NotFoundError,
  },
  {
    path: ROUTES.SERVER_ERROR,
    element: ServerError,
  },
];

export default errorRoutes;
