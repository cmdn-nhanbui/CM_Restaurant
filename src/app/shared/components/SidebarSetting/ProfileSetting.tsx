import type { RootState } from '@src/redux/store';
import { message, Select } from 'antd';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { TextField } from '../TextField';
import { Button } from '../Button';
import { joiResolver } from '@hookform/resolvers/joi';
import { updateProfileValidation } from './setting.validation';
import { useEffect } from 'react';
import { updateProfile } from '@/core/services/auth.service';

type FormUpdateProfile = {
  userName: string;
  phoneNumber: string;
  gender: boolean;
};

export const ProfileSetting = () => {
  const { data: userData } = useSelector((state: RootState) => state.user);

  const [messageApi, contextHolder] = message.useMessage();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormUpdateProfile>({
    defaultValues: {
      gender: true,
    },
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
    resolver: joiResolver(updateProfileValidation),
  });

  const handleUpdateProfile: SubmitHandler<FormUpdateProfile> = (data) => {
    const key = 'update_key';

    const updateRequest = async () => {
      try {
        messageApi.open({
          type: 'loading',
          content: 'Updating',
          key,
        });
        await updateProfile({ fullname: data.userName, gender: data.gender, phone_number: data.phoneNumber });

        messageApi.open({
          type: 'success',
          content: 'Updated successfully',
          key,
          duration: 2,
        });
      } catch (error) {
        messageApi.open({
          type: 'error',
          content: 'Update unsuccessfully',
          key,
          duration: 2,
        });
      }
    };

    updateRequest();
  };

  useEffect(() => {
    if (userData) {
      setValue('gender', userData?.gender);
      setValue('userName', userData?.fullName);
      setValue('phoneNumber', userData?.phoneNumber);
    }
  }, [userData]);

  return (
    <div>
      {contextHolder}

      <div className='flex flex-col text-[var(--text-lighter)] pb-6 border-b border-[var(--dark-line)]'>
        <h2 className='text-white font-semibold text-xl'>Profile</h2>
      </div>

      <div className='flex flex-col mt-6'>
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
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
            {errors?.phoneNumber && <p className='text-sm px-2 text-[var(--primary)]'>{errors.phoneNumber.message}</p>}
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
  );
};
