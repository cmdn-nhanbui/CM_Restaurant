import type { JSX, LazyExoticComponent } from 'react';
import { lazy } from 'react';

import type { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import { ROUTES } from '../../core/constants/routes';

const Categories: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Categories'));

const categoriesRoutes: PageRoute[] = [
  {
    path: ROUTES.CATEGORIES,
    element: Categories,
  },
];

export default categoriesRoutes;
