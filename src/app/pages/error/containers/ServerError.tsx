import { Error } from '../components/Error';

const ServerError = () => {
  return (
    <>
      <div className='cart-header'></div>
      <Error
        status={500}
        title='Internal Server Error'
        description='Sorry for the trouble. The server is down, please try again later.'
        navigateTo={false}
      />
    </>
  );
};

export default ServerError;
