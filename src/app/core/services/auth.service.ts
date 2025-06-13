import request from './api.service';

type LoginProps = {
  email: string;
  password: string;
};
export const login = async ({ email, password }: LoginProps) => {
  const response = await request.post(`/login`, {
    email,
    password,
  });
  return response?.data;
};
