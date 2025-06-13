import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch } from 'react-redux';

import { message } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button } from '@/shared/components/Button';
import { TextField } from '@/shared/components/TextField';
import { Icon } from '@/shared/components/Icons';

import validation from './Login.validation';
import { login } from '@/core/services/auth.service';
import { KEYS, setLS } from '@/core/helpers/storageHelper';
import { type AppDispatch } from '@src/redux/store';
import { updateCurrentUser } from '@src/redux/actions/userActions';
import { mapUserData } from '@/core/mappers/user.mapper';

type FormLoginProps = {
  email: string;
  password: string;
};
const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormLoginProps>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: joiResolver(validation),
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
  });

  const handleLogin: SubmitHandler<FormLoginProps> = (data) => {
    const { email, password } = data;
    const key = 'updatable';

    messageApi.open({
      key,
      type: 'loading',
      content: 'Processing...',
    });
    const requestLogin = async () => {
      try {
        const { data, token, status } = await login({ email, password });

        if (status === 401) {
          setError('password', {
            type: 'manual',
            message: 'Email or password is wrong',
          });
          return;
        }

        setLS(KEYS.ACCESS_TOKEN, token?.accessToken);
        setLS(KEYS.REFRESH_TOKEN, token?.refreshToken);

        dispatch(updateCurrentUser(mapUserData(data)));

        messageApi.open({
          key,
          type: 'success',
          content: 'Login successfully',
          duration: 2,
        });
      } catch (error) {
        console.log(error);

        messageApi.open({
          key,
          type: 'error',
          content: 'Something went wrong, please try again',
          duration: 2,
        });
      }
    };

    requestLogin();
  };

  return (
    <>
      {contextHolder}
      <div className='text-white max-w-[600px] w-full m-auto py-10 h-full flex flex-col justify-center'>
        <div className='flex justify-center mb-10'>
          <h2 className='text-5xl font-semibold'>Login By Email</h2>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-4'>
          <TextField
            {...register('email')}
            placeholder='Email'
            autoComplete='none'
            icon={<Icon icon='mail' color='var(--text-lighter)' />}
          />
          {errors?.email && <p className='text-sm px-2 text-[var(--primary)]'>{errors?.email?.message}</p>}
          <div className='relative'>
            <TextField
              {...register('password')}
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='none'
              icon={<Icon icon='lock' color='var(--text-lighter)' />}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer flex'
            >
              {showPassword ? (
                <EyeInvisibleOutlined style={{ fontSize: 20 }} />
              ) : (
                <EyeOutlined style={{ fontSize: 20 }} />
              )}
            </button>
          </div>
          {errors?.password && <p className='text-sm px-2 text-[var(--primary)]'>{errors?.password?.message}</p>}

          <Button outlined className='flex gap-3 justify-center'>
            <span>LOGIN</span>
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
