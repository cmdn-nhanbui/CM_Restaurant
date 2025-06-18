import { message, Modal, Select } from 'antd';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '../../Button';
import { TextField } from '../../TextField';

import { createUserValidation } from './updateUser.validation';
import { joiResolver } from '@hookform/resolvers/joi';
import { createUser } from '@/core/services/user.service';
import axios from 'axios';

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
  password: string;
}

export const CreateUserModal = ({ isModalOpen, onOk, onCancel }: ModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const {
    reset,
    register,
    control,
    handleSubmit,
    setError,
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
    const { email, gender, password, phoneNumber, userName } = data;

    const createRequest = async () => {
      const toastKey = 'update_user';

      try {
        if (!data) return;
        messageApi.open({
          key: toastKey,
          type: 'loading',
          content: 'Creating...',
        });

        await createUser({ email, fullname: userName, gender, password: password, phone_number: phoneNumber });

        messageApi.open({
          key: toastKey,
          type: 'success',
          content: 'Create user successfully',
          duration: 2,
        });

        reset();
        return onOk();
      } catch (error) {
        messageApi.open({
          key: toastKey,
          type: 'error',
          content: 'Create user unsuccessfully',
          duration: 2,
        });

        if (axios.isAxiosError(error)) {
          const statusCode = error.status;
          let messageError = error?.response?.data?.data?.email[0];
          console.log(messageError);
          if (statusCode === 422)
            setError('email', {
              type: 'manual',
              message: messageError,
            });
        }

        console.log(error);
      }
    };
    createRequest();
  };

  const handleClose = () => {
    reset();
    return onCancel();
  };

  return (
    <>
      {contextHolder}
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
                <label htmlFor='email' className='text-white text-base font-semibold'>
                  Email
                </label>
                <TextField id='email' {...register('email')} />
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

              <div className='flex my-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='new-password' className='text-white text-base font-semibold'>
                    New Password
                  </label>
                  <TextField type='password' id='new-password' {...register('password')} />
                  {errors?.password && <p className='text-sm px-2 text-[var(--primary)]'>{errors.password?.message}</p>}
                </div>
                <div className='flex flex-1 flex-col justify-start gap-2'>
                  <label htmlFor='gender' className='text-white text-base font-semibold'>
                    Gender
                  </label>
                  <Controller
                    control={control}
                    name='gender'
                    render={({ field }) => (
                      <Select
                        rootClassName='custom-antd-select'
                        style={{ width: '100%', height: 50 }}
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
              </div>

              <div className='flex flex-1 gap-3 justify-end mt-4'>
                <Button onClick={handleSubmit(handleCreateUser)} className='w-full' key='ok'>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};
