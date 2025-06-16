import type { JSX, LazyExoticComponent } from 'react';
import { lazy } from 'react';

import type { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import { ROUTES } from '../../core/constants/routes';

const Notification: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Notification'));

const notificationRoutes: PageRoute[] = [
  {
    path: ROUTES.NOTIFICATION,
    element: Notification,
  },
];

export default notificationRoutes;
