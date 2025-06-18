import request from './api.service';

type LoginProps = {
  email: string;
  password: string;
};
export const login = async ({ email, password }: LoginProps) => {
  const response = await request.post(`/auth/login`, {
    email,
    password,
  });
  return response?.data;
};

export const logout = async () => {
  const response = await request.post('/auth/logout');
  return response?.data;
};

export const getMyProfile = async () => {
  const response = await request.get('/auth/me');
  return response?.data;
};
