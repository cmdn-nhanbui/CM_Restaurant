// import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { Sidebar } from '../components/Sidebar';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen bg-[var(--background-primary)]'>
      <main className='mb-[80px] px-5 sm:px-0 sm:mb-0'>
        <div className='flex w-full'>
          <div className='hidden sm:flex'>
            <Sidebar />
          </div>
          <div className='sm:p-6 w-full h-screen overflow-y-auto'>{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
