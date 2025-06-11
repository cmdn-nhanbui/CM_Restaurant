// import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { Sidebar } from '../components/Sidebar';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen'>
      <main className='mb-[80px] px-5 sm:px-0 sm:mb-0'>
        <div className='flex w-full'>
          <div className='hidden sm:flex'>
            <Sidebar />
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
