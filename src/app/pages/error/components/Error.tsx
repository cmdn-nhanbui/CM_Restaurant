import type { ErrorProps } from '../../../core/constants/types';

export const Error = ({ title, status, description }: ErrorProps) => {
  return (
    <div className='notfound container'>
      <div className='notfound-404'>
        <h1 className='notfound-status'>{status}</h1>
      </div>
      <h2 className='notfound-title'>{title}</h2>
      <p className='notfound-description'>{description}</p>
      <div className='notfound-navigate'></div>
    </div>
  );
};
