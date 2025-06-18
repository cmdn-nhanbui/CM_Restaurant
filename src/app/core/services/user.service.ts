import type { CreateUserPayload, UpdateUserPayload } from '../constants/types';
import request from './api.service';

export const getUsersData = async (page: number, perPage: number) => {
  const response = await request.get('/users', {
    params: {
      page: page,
      per_page: perPage,
    },
  });
  return response?.data;
};

export const deleteUser = async (id: number) => {
  const response = await request.delete(`/users/${id}`);
  return response?.data;
};

export const updateUser = async (id: number, data: UpdateUserPayload) => {
  const response = await request.patch(`/users/${id}`, data);
  return response?.data;
};

export const createUser = async (data: CreateUserPayload) => {
  const response = await request?.post('/users', data);
  return response?.data;
};
