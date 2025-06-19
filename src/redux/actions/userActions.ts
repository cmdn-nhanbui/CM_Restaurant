import type { User } from '@/core/constants/types';
import {
  CLEAR_CURRENT_USER_DATA,
  FETCH_CURRENT_USER_FAILURE,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  UPDATE_CURRENT_USER_DATA,
} from '../types';
import { mapUserData } from '@/core/mappers/user.mapper';
import { getMyProfile } from '@/core/services/auth.service';

export const updateCurrentUser = (userData: User) => ({ type: UPDATE_CURRENT_USER_DATA, payload: userData });
export const clearCurrentUser = () => ({ type: CLEAR_CURRENT_USER_DATA, payload: undefined });

export const fetchCurrentUserRequest = () => ({
  type: FETCH_CURRENT_USER_REQUEST,
});

export const fetchCurrentUserSuccess = (user: User) => ({
  type: FETCH_CURRENT_USER_SUCCESS,
  payload: user,
});

export const fetchCurrentUserFail = (error: string) => ({
  type: FETCH_CURRENT_USER_FAILURE,
  payload: error,
});

export const fetchCurrentUser = () => {
  return (dispatch: any) => {
    dispatch(fetchCurrentUserRequest());
    getMyProfile()
      .then((res) => {
        const userData = mapUserData(res?.data);
        dispatch(fetchCurrentUserSuccess(userData));
      })
      .catch((err) => {
        dispatch(fetchCurrentUserFail(err.message));
      });
  };
};
