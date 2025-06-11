import { Link } from 'react-router-dom';

import { Button } from '../../../shared/components/Button';
import { ROUTES } from '../../../core/constants/routes';
import type { ErrorProps } from '../../../core/constants/types';

export const Error = ({
  title,
  status,
  description,
  navigateTo = ROUTES.ROOT,
  navigateTitle = 'Go to home page',
}: ErrorProps) => {
  return (
    <div className='notfound container'>
      <div className='notfound-404'>
        <h1 className='notfound-status'>{status}</h1>
      </div>
      <h2 className='notfound-title'>{title}</h2>
      <p className='notfound-description'>{description}</p>
      <div className='notfound-navigate'>
        {navigateTo && (
          <Link to={navigateTo}>
            <Button rounded outlined>
              {navigateTitle}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
