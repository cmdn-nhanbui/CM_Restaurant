import { useLocation, Link, type LinkProps } from 'react-router-dom';

interface LinkWithQueryProps extends LinkProps {}

export const LinkWithQuery = ({ to, ...rest }: LinkWithQueryProps) => {
  const location = useLocation();

  const mergedTo =
    typeof to === 'string'
      ? `${to}${location.search}`
      : {
          pathname: to.pathname,
          search: location.search,
        };

  return <Link to={mergedTo} {...rest} />;
};
