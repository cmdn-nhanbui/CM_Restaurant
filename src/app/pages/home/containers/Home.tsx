import { SectionMenu } from '@/shared/components/SectionMenu';
import { TextField } from '@/shared/components/TextField';
import { SearchOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className='flex sm:flex-row flex-col w-full justify-between items-center'>
        <div className='flex flex-col text-[var(--text-lighter)] sm:w-auto w-full'>
          <h2 className='text-white font-semibold text-3xl'>Jaegar Resto</h2>
          <p className='text-lg'>Tuesday, 2 Feb 2021</p>
        </div>
        <div className='py-2 w-full sm:w-[400px]'>
          <div className='relative'>
            <TextField placeholder='Search for food, coffe, etc..' className='pr-6' />
            <div className='absolute top-1/2 right-2 -translate-y-1/2 flex'>
              <SearchOutlined style={{ fontSize: 20, color: 'white' }} />
            </div>
          </div>
        </div>
      </div>
      <nav className='flex gap-8 mt-6 border-b border-[var(--dark-line)] pb-4'>
        <NavLink to={'/category'} className='text-[var(--primary)] font-semibold'>
          Hot Dishes
        </NavLink>
        <NavLink to={'/category'} className='text-white font-semibold'>
          Cold Dishes
        </NavLink>
        <NavLink to={'/category'} className='text-white font-semibold'>
          Soup
        </NavLink>
        <NavLink to={'/category'} className='text-white font-semibold'>
          Grill
        </NavLink>
      </nav>

      <SectionMenu />
    </div>
  );
};

export default Home;
