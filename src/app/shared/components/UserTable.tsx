import classNames from 'classnames';
import { Badge } from './Badge';
import type { User } from '@/core/constants/types';
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ConfirmModal } from './Modals/ConfirmModal';
import { UpdateUserModal } from './Modals/UpdateUserModal/UpdateUserModal';

export const mockUsers: User[] = [
  {
    id: 1,
    fullName: 'Nguyen Van A',
    email: 'a.nguyen@example.com',
    role: 'admin',
    gender: true,
    phoneNumber: '0901234567',
    createdAt: '2024-12-01T08:30:00Z',
    updatedAt: '2025-01-05T14:12:00Z',
  },
  {
    id: 2,
    fullName: 'Tran Thi B',
    email: 'b.tran@example.com',
    role: 'staff',
    gender: false,
    phoneNumber: '0912345678',
    createdAt: '2024-11-15T10:45:00Z',
    updatedAt: '2025-01-02T09:00:00Z',
  },
  {
    id: 3,
    fullName: 'Le Van C',
    email: 'c.le@example.com',
    role: 'staff',
    gender: true,
    phoneNumber: '0923456789',
    createdAt: '2024-10-20T13:20:00Z',
    updatedAt: '2025-01-01T11:05:00Z',
  },
  {
    id: 4,
    fullName: 'Pham Thi D',
    email: 'd.pham@example.com',
    role: 'admin',
    gender: false,
    phoneNumber: '0934567890',
    createdAt: '2024-09-25T15:40:00Z',
    updatedAt: '2025-01-03T08:45:00Z',
  },
  {
    id: 5,
    fullName: 'Hoang Van E',
    email: 'e.hoang@example.com',
    role: 'staff',
    gender: true,
    phoneNumber: '0945678901',
    createdAt: '2024-08-30T09:10:00Z',
    updatedAt: '2025-01-04T12:30:00Z',
  },
  {
    id: 6,
    fullName: 'Do Thi F',
    email: 'f.do@example.com',
    role: 'staff',
    gender: false,
    phoneNumber: '0956789012',
    createdAt: '2024-08-05T11:15:00Z',
    updatedAt: '2025-01-06T13:45:00Z',
  },
  {
    id: 7,
    fullName: 'Nguyen Van G',
    email: 'g.nguyen@example.com',
    role: 'admin',
    gender: true,
    phoneNumber: '0967890123',
    createdAt: '2024-07-12T16:50:00Z',
    updatedAt: '2025-01-07T14:00:00Z',
  },
  {
    id: 8,
    fullName: 'Tran Thi H',
    email: 'h.tran@example.com',
    role: 'staff',
    gender: false,
    phoneNumber: '0978901234',
    createdAt: '2024-06-18T07:35:00Z',
    updatedAt: '2025-01-08T15:25:00Z',
  },
  {
    id: 9,
    fullName: 'Le Van I',
    email: 'i.le@example.com',
    role: 'staff',
    gender: true,
    phoneNumber: '0989012345',
    createdAt: '2024-05-25T12:00:00Z',
    updatedAt: '2025-01-09T09:10:00Z',
  },
  {
    id: 10,
    fullName: 'Pham Thi J',
    email: 'j.pham@example.com',
    role: 'admin',
    gender: false,
    phoneNumber: '0990123456',
    createdAt: '2024-04-10T14:25:00Z',
    updatedAt: '2025-01-10T10:50:00Z',
  },
];

export const UserTable = () => {
  const [selecDeletetUser, setSelectDeleteUser] = useState<number | null>(null);
  const [selectUpdateUser, setSelectUpdateUser] = useState<User | null>(null);

  const handleDeleteUser = () => {
    console.log('Delete');
  };
  return (
    <>
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
          {mockUsers.map((user, idx) => (
            <tr
              key={idx}
              onClick={() => setSelectUpdateUser(user)}
              className={classNames('border-b border-gray-800 hover:bg-[#2a2a3a] transition', {
                'bg-[var(--form-background)]/30': idx % 2 === 0,
              })}
            >
              <td className='py-4'>
                <div className='flex items-center justify-start gap-3'>123</div>
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
          ))}
        </tbody>
      </table>

      <ConfirmModal
        onOk={handleDeleteUser}
        onCancel={() => setSelectDeleteUser(null)}
        isModalOpen={selecDeletetUser !== null}
        title='Delete this user'
        description='Do you really want to delete this records? This process cannot be undone'
      />

      <UpdateUserModal
        isModalOpen={selectUpdateUser !== null}
        onCancel={() => setSelectUpdateUser(null)}
        onOk={() => {}}
        data={selectUpdateUser}
      />
    </>
  );
};
