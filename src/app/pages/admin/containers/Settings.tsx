import { ROUTES } from '@/core/constants/routes';
import { PasswordSetting } from '@/shared/components/SidebarSetting/PasswordSetting';
import { ProfileSetting } from '@/shared/components/SidebarSetting/ProfileSetting';
import { Sidebar } from '@/shared/components/SidebarSetting/Sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';

const Settings = () => {
  return (
    <div className='flex gap-6 sm:flex-row flex-col sm:h-full'>
      <div className='w-full overflow-y-hidden flex flex-col'>
        <div className='flex flex-col text-[var(--text-lighter)] pb-6 border-b border-[var(--dark-line)]'>
          <h2 className='text-white font-semibold text-3xl'>Settings</h2>
          <p className='text-lg'>Tuesday, 2 Feb 2021</p>
        </div>

        <div className='flex gap-6 mt-6 h-full'>
          <div className='w-1/3 bg-[var(--background-secondary)] rounded-lg'>
            <Sidebar />
          </div>
          <div className='w-full bg-[var(--background-secondary)] rounded-lg p-6'>
            <Routes>
              <Route path='/' element={<ProfileSetting />} />
              <Route path='/password' element={<PasswordSetting />} />
              <Route path='*' element={<Navigate to={ROUTES.NOT_FOUND} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
