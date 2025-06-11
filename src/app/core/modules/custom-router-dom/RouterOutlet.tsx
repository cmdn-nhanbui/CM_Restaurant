import { Navigate, Route, Routes } from 'react-router-dom';
import type { PageRoute } from './router.interface';
import { ROUTES } from '../../constants/routes';

const renderRoute = (routes: PageRoute[]) => {
  return routes.map((route: any, index: number) => {
    if (route.redirect && !route.element) {
      route.element = () => <Navigate to={route.redirect} />;
    }

    return (
      <Route key={index} path={route.path} element={<route.element />}>
        {route.children && renderRoute(route.children)}
      </Route>
    );
  });
};

export const RouterOutlet = ({ routes }: any) => {
  return (
    <Routes>
      {renderRoute(routes)}
      <Route path='*' element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Routes>
  );
};
