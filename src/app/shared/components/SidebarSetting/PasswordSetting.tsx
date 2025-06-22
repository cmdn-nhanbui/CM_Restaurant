import { useState } from 'react';
import { message } from 'antd';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { TextField } from '../TextField';
import { Button } from '../Button';

import { changePasswordValidation } from './setting.validation';
import type { FormUpdatePassword, RenderFieldProps } from '@/core/constants/types';
import { changePassword } from '@/core/services/auth.service';
import axios from 'axios';

export const PasswordSetting = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormUpdatePassword>({
    defaultValues: {},
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
    resolver: joiResolver(changePasswordValidation),
  });

  const handleChangePassword: SubmitHandler<FormUpdatePassword> = (data) => {
    const { currentPassword, newPassword } = data;

    const changePasswordRequest = async () => {
      const key = 'updateable';
      try {
        messageApi.open({ content: 'Processing...', key, type: 'loading' });
        await changePassword(currentPassword, newPassword);
        messageApi.open({ type: 'success', content: 'Change password successfully', duration: 2, key });
        reset();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const statusCode = error.status;
          if (statusCode === 401) {
            setError('currentPassword', {
              type: 'manual',
              message: 'Current password is wrong',
            });
            setValue('currentPassword', '');
          } else {
            messageApi.open({ type: 'error', content: 'Change password unsuccessfully', duration: 2, key });
          }
        }
      }
    };

    changePasswordRequest();
  };

  const renderField = ({ label, id, name, show, errorMessage, toggleShow }: RenderFieldProps) => (
    <div className='flex flex-col gap-2 mt-2'>
      <label htmlFor={id} className='text-white text-base font-semibold select-none'>
        {label}
      </label>
      <div className='relative'>
        <TextField {...register(name)} type={show ? 'text' : 'password'} id={id} className='pr-10' />
        <div className='absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer' onClick={toggleShow}>
          {show ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </div>
      </div>
      {errorMessage && <p className='text-sm px-2 text-[var(--primary)]'>{errorMessage}</p>}
    </div>
  );

  return (
    <div>
      {contextHolder}
      <div className='flex flex-col text-[var(--text-lighter)] pb-6 border-b border-[var(--dark-line)]'>
        <h2 className='text-white font-semibold text-xl'>Password Setting</h2>
      </div>

      <div className='flex flex-col mt-6'>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          {renderField({
            label: 'Current Password',
            id: 'current-password',
            name: 'currentPassword',
            errorMessage: errors?.currentPassword?.message,
            show: showCurrent,
            toggleShow: () => setShowCurrent((prev) => !prev),
          })}
          {renderField({
            label: 'New Password',
            id: 'new-password',
            name: 'newPassword',
            errorMessage: errors?.newPassword?.message,
            show: showNew,
            toggleShow: () => setShowNew((prev) => !prev),
          })}
          {renderField({
            label: 'Confirm Password',
            id: 'confirm-password',
            name: 'confirmPassword',
            errorMessage: errors?.confirmPassword?.message,
            show: showConfirm,
            toggleShow: () => setShowConfirm((prev) => !prev),
          })}

          <div className='flex gap-3 justify-end mt-4'>
            <Button className='w-full' key='ok'>
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
