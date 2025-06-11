import { getCoinsData } from '@/core/services/coin.service';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    getCoinsData({ page: 1, perPage: 10 })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div>Home</div>
    </>
  );
};

export default Home;
