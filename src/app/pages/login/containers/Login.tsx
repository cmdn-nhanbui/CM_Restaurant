import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button } from '@/shared/components/Button';
import { TextField } from '@/shared/components/TextField';
import { Icon } from '@/shared/components/Icons';

import validation from './Login.validation';

type FormLoginProps = {
  email: string;
  password: string;
};
const Login = () => {
  const onSubmit: SubmitHandler<FormLoginProps> = (data) => console.log(data);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginProps>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: joiResolver(validation),
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
  });

  if (Object.keys(errors)?.length) {
    console.log(errors);
  }

  return (
    <>
      <div className='text-white max-w-[600px] w-full m-auto py-10 h-full flex flex-col justify-center'>
        <div className='flex justify-center mb-10'>
          <h2 className='text-5xl font-semibold'>Login By Email</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
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

          <Button outlined>LOGIN</Button>
        </form>
      </div>
    </>
  );
};

export default Login;
