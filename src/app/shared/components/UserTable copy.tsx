import classNames from 'classnames';
import { Badge } from './Badge';
import type { User } from '@/core/constants/types';
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ConfirmModal } from './Modals/ConfirmModal';
import { UpdateUserModal } from './Modals/UpdateUserModal/UpdateUserModal';
import { TableSkeleton } from './TableSkeleton';
import { message } from 'antd';
import { deleteUser } from '@/core/services/user.service';

interface UserTableProps {
  data: User[];
  loading?: boolean;
  onRefetch?: () => void;
}
export const UserTable = ({ data, loading = false, onRefetch }: UserTableProps) => {
  const [selecDeletetUser, setSelectDeleteUser] = useState<number | null>(null);
  const [selectUpdateUser, setSelectUpdateUser] = useState<User | null>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const handleDeleteUser = () => {
    const deleteRequest = async () => {
      if (!selecDeletetUser) return;
      const toastKey = 'delete_user';

      try {
        messageApi.open({
          key: toastKey,
          type: 'loading',
          content: 'Deleting...',
        });

        await deleteUser(selecDeletetUser);

        messageApi.open({
          key: toastKey,
          type: 'success',
          content: 'Deleted user successfully',
          duration: 2,
        });
        setSelectDeleteUser(null);
        if (onRefetch) onRefetch();
      } catch (error) {
        messageApi.open({
          key: toastKey,
          type: 'error',
          content: 'Deleted user unsuccessfully',
          duration: 2,
        });

        console.log(error);
      }
    };

    deleteRequest();
  };
  const handleUpdatedUser = () => {
    setSelectUpdateUser(null);
    if (onRefetch) return onRefetch();
  };

  return (
    <>
      {contextHolder}
      <table className='w-full table-auto text-center text-white'>
        <thead>
          <tr className='border-b border-gray-700'>
            <th className='py-4 text-left'>Id</th>
            <th className='py-4 text-left'>Email</th>
            <th className='py-4 text-left'>Full Name</th>
            <th className='py-4'>Phone Number</th>
            <th className='py-4'>Gender</th>
            <th className='py-4'>Delete</th>
          </tr>
        </thead>
        <tbody className='overflow-y-auto h-full'>
          {loading ? (
            <TableSkeleton />
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={6} className='py-10 text-center text-gray-500'>
                No users found.
              </td>
            </tr>
          ) : (
            data.map((user, idx) => (
              <tr
                key={user.id}
                onClick={() => setSelectUpdateUser(user)}
                className={classNames('border-b border-gray-800 hover:bg-[#2a2a3a] transition', {
                  'bg-[var(--form-background)]/30': idx % 2 === 0,
                })}
              >
                <td className='py-4'>
                  <div className='flex items-center justify-start gap-3'>{user.id}</div>
                </td>
                <td className='py-4'>
                  <div className='flex items-center justify-start gap-3'>{user.email}</div>
                </td>
                <td className='py-4 text-left'>{user.fullName}</td>
                <td className='py-4'>{user.phoneNumber}</td>
                <td className='py-4'>
                  <span className='px-4 py-1 rounded-full text-sm font-medium inline-block'>
                    <Badge color={user.gender ? 'green' : 'red'}>{user.gender ? 'Men' : 'Woman'}</Badge>
                  </span>
                </td>
                <td className='py-4'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectDeleteUser(user.id);
                    }}
                    className='cursor-pointer'
                  >
                    <DeleteOutlined />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ConfirmModal
        onOk={handleDeleteUser}
        onCancel={() => setSelectDeleteUser(null)}
        isModalOpen={selecDeletetUser !== null}
        title='Delete this user'
        description='Do you really want to delete this records? This process cannot be undone.'
      />

      <UpdateUserModal
        isModalOpen={selectUpdateUser !== null}
        onCancel={() => setSelectUpdateUser(null)}
        onOk={handleUpdatedUser}
        data={selectUpdateUser}
      />
    </>
  );
};
