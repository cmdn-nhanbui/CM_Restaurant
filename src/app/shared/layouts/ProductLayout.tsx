import { Footer } from '@components/Footer';
import { Sidebar } from '@components/Sidebar';
import { Search } from '../components/Search';
import { Navigation } from '../components/Navigation';
import { ROUTES } from '@/core/constants/routes';
import { getCurrentDate } from '@/core/helpers/timeHelper';

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-[100dvh] bg-[var(--background-primary)]'>
      <main className='h-[calc(100dvh-80px)] sm:h-auto overflow-y-auto scrollbar-hidden px-4 sm:px-0 pt-6 sm:pt-0 overflow-hidden'>
        <div className='flex w-full h-full'>
          <Sidebar />
          <div className='sm:p-6 w-full h-full sm:h-screen overflow-y-auto scrollbar-hidden'>
            <div className='flex sm:flex-row flex-col w-full justify-between items-center'>
              <div className='flex flex-col text-[var(--text-lighter)] sm:w-auto w-full mb-3 sm:mb-0'>
                <h2 className='text-white font-semibold text-3xl'>Jaegar Resto</h2>
                <p className='text-lg'>{getCurrentDate()}</p>
              </div>
              <div className='py-2 w-full sm:w-[400px]'>
                <Search />
              </div>
            </div>
            <div className='w-full'>
              <Navigation
                additionalItems={[
                  {
                    name: 'All',
                    navigateTo: ROUTES.ROOT,
                  },
                ]}
              />
            </div>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductLayout;
