import { Modal, Select } from 'antd';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '../../Button';
import { TextField } from '../../TextField';

import { createUserValidation } from './updateUser.validation';
import { joiResolver } from '@hookform/resolvers/joi';

type ModalProps = {
  isModalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
};

interface FormCreateUser {
  email: string;
  userName: string;
  phoneNumber: string;
  gender: boolean;
  newPassword: string;
}

export const CreateUserModal = ({ isModalOpen, onOk, onCancel }: ModalProps) => {
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCreateUser>({
    defaultValues: {
      gender: true,
    },
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
    resolver: joiResolver(createUserValidation),
  });

  const handleCreateUser: SubmitHandler<FormCreateUser> = (data) => {
    console.log(data);
    return onOk();
  };

  const handleClose = () => {
    reset();
    return onCancel();
  };

  return (
    <Modal
      className='custom-modal'
      title='Create User'
      open={isModalOpen}
      onCancel={handleClose}
      destroyOnHidden
      footer={<></>}
    >
      <div className='flex items-center flex-col'>
        <div className='flex flex-col w-full'>
          <form onSubmit={handleSubmit(handleCreateUser)}>
            <div className='flex flex-col gap-2 mt-2'>
              <label htmlFor='user-name' className='text-white text-base font-semibold'>
                Email
              </label>
              <TextField id='user-name' {...register('email')} />
              {errors?.email && <p className='text-sm px-2 text-[var(--primary)]'>{errors.email.message}</p>}
            </div>
            <div className='flex flex-col gap-2 mt-2'>
              <label htmlFor='user-name' className='text-white text-base font-semibold'>
                User Name
              </label>
              <TextField id='user-name' {...register('userName')} />
              {errors?.userName && <p className='text-sm px-2 text-[var(--primary)]'>{errors.userName.message}</p>}
            </div>

            <div className='flex flex-col gap-2 mt-2'>
              <label htmlFor='phone-number' className='text-white text-base font-semibold'>
                Phone Number
              </label>
              <TextField id='phone-number' {...register('phoneNumber')} />
              {errors?.phoneNumber && (
                <p className='text-sm px-2 text-[var(--primary)]'>{errors.phoneNumber.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2 mt-2'>
              <label htmlFor='new-password' className='text-white text-base font-semibold'>
                New Password
              </label>
              <TextField type='password' id='new-password' {...register('newPassword')} />
              {errors?.newPassword && (
                <p className='text-sm px-2 text-[var(--primary)]'>{errors.newPassword?.message}</p>
              )}
            </div>

            <div className='flex flex-col justify-end gap-2 mt-4'>
              <label htmlFor='gender' className='text-white text-base font-semibold'>
                Gender
              </label>
              <Controller
                control={control}
                name='gender'
                render={({ field }) => (
                  <Select
                    rootClassName='custom-antd-select'
                    style={{ width: 200 }}
                    styles={{
                      popup: {
                        root: {
                          backgroundColor: 'var(--form-background)',
                          color: 'white',
                        },
                      },
                    }}
                    value={field.value ? 1 : 0}
                    onChange={(val) => field.onChange(Boolean(val))}
                    options={[
                      { value: 1, label: 'Man' },
                      { value: 0, label: 'Woman' },
                    ]}
                  />
                )}
              />
            </div>

            <div className='flex gap-3 justify-end mt-4'>
              <Button className='w-full' key='ok'>
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
