import { Error } from '../components/Error';

const NotFound = () => {
  return (
    <>
      <div className='cart-header'></div>
      <Error
        status={404}
        title='Oops! This Page Could Not Be Found'
        description='Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily
        unavailable'
      />
    </>
  );
};

export default NotFound;
