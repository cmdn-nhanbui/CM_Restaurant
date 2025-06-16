import { useEffect } from 'react';
import { SectionMenu } from '@/shared/components/SectionMenu';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <SectionMenu />;
};

export default Home;
