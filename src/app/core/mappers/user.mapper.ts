import type { User } from '../constants/types';

export const mapUserData = (data: any): User => {
  return {
    id: data?.id,
    fullName: data?.fullname,
    email: data?.email,
    role: data?.role,
    createdAt: data?.created_at,
    updatedAt: data?.updated_at,
    gender: data?.gender,
    phoneNumber: data?.phone_number,
  };
};
