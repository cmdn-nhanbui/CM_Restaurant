import { useLocation, NavLink, type NavLinkProps } from 'react-router-dom';

interface NavLinkWithQueryProps extends NavLinkProps {}

export const NavLinkWithQuery = ({ to, ...rest }: NavLinkWithQueryProps) => {
  const location = useLocation();

  // Nếu `to` là string
  const mergedTo =
    typeof to === 'string'
      ? `${to}${location.search}`
      : {
          pathname: to.pathname,
          search: location.search,
        };

  return <NavLink to={mergedTo} {...rest} />;
};
