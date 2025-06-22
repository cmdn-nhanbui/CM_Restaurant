import type { User } from '@/core/constants/types';
import { getCurrentDate } from '@/core/helpers/timeHelper';
import { mapUserData } from '@/core/mappers/user.mapper';
import { Button } from '@/shared/components/Button';
import { CreateUserModal } from '@/shared/components/Modals/UpdateUserModal/CreateUserModal';
import { UserTable } from '@/shared/components/UserTable';
import { useUserData } from '@/shared/hooks/useUser';
import { Pagination, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;

  const handleChangePage = (page: number) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', String(page));
    navigate(`?${newParams.toString()}`);
  };

  const handleCreatedUser = () => {
    setShowCreateModal(false);
    refetch();
  };

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const { data, isLoading, refetch } = useUserData({ page, perPage: 10 });
  const users: User[] = data?.docs?.map(mapUserData)?.filter((user: User) => user.role !== 'admin') || [];

  return (
    <>
      <div className='flex gap-6 flex-col'>
        <div className='w-full overflow-y-hidden flex flex-col'>
          <div className='flex flex-col text-[var(--text-lighter)] pb-6 border-b border-[var(--dark-line)]'>
            <h2 className='text-white font-semibold text-3xl'>Staff Management</h2>
            <p className='text-lg'>{getCurrentDate()}</p>
          </div>
        </div>

        <div>
          <section className='bg-[var(--background-secondary)] rounded-lg p-6 flex-1 overflow-y-hidden flex flex-col'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold text-white'>Staff List</h2>
              <div className='flex items-center gap-3'>
                <span className='text-white'>Sort by: </span>
                <Select
                  rootClassName='custom-antd-select'
                  defaultValue='name_asc'
                  style={{ width: 120 }}
                  styles={{
                    popup: {
                      root: {
                        backgroundColor: 'var(--form-background)',
                        color: 'white',
                      },
                    },
                  }}
                  onChange={(value) => {
                    console.log(value);
                  }}
                  options={[
                    { value: 'name_asc', label: 'Name A-Z' },
                    { value: 'name_desc', label: 'Name Z-A' },
                    { value: 'email_asc', label: 'Email A-Z' },
                    { value: 'email_desc', label: 'Email Z-A' },
                    { value: 'men', label: 'Men' },
                    { value: 'woman', label: 'Woman' },
                  ]}
                />

                <Button onClick={() => setShowCreateModal(true)} outlined type='button' className='py-1'>
                  Create Account
                </Button>
              </div>
            </div>

            <div className='mt-2 h-full overflow-y-auto pb-4'>
              <UserTable loading={isLoading} data={users} onRefetch={() => refetch()} />
            </div>
            <div className='pt-3 border-t border-[var(--dark-line)]'>
              <Pagination
                rootClassName='antd-custom-pagination'
                current={page}
                align='center'
                defaultCurrent={1}
                total={data?.total_docs}
                pageSize={10}
                showSizeChanger={false}
                showLessItems
                onChange={handleChangePage}
              />
            </div>
          </section>
        </div>
      </div>

      <CreateUserModal
        isModalOpen={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
        onOk={handleCreatedUser}
      />
    </>
  );
};

export default User;
