import type { JSX, LazyExoticComponent } from 'react';
import { lazy } from 'react';

import type { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import { ROUTES } from '../../core/constants/routes';

const Login: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Login'));

const loginRoutes: PageRoute[] = [
  {
    path: ROUTES.LOGIN,
    element: Login,
  },
];

export default loginRoutes;
