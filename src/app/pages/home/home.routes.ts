import type { JSX, LazyExoticComponent } from 'react';
import { lazy } from 'react';

import type { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import { ROUTES } from '../../core/constants/routes';

const Home: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Home'));

const homeRoutes: PageRoute[] = [
  {
    path: ROUTES.ROOT,
    element: Home,
  },
];

export default homeRoutes;
