import type { User } from '../constants/types';

export const mapUserData = (data: any): User => {
  return {
    id: data?.id,
    fullName: data?.fullname,
    email: data?.email,
    imageUrl: data?.image_url,
    role: data?.role,
  };
};
