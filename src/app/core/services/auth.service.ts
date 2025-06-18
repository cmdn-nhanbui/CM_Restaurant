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

export const updateProfile = async () => {};

export const changePassword = async (oldPassword: string, newPassword: string) => {
  const response = await request.put('/auth/change-password', {
    old_password: oldPassword,
    new_password: newPassword,
  });
  return response?.data;
};
