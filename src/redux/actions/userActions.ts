import type { User } from '@/core/constants/types';
import { CLEAR_CURRENT_USER_DATA, UPDATE_CURRENT_USER_DATA } from '../types';

export const updateCurrentUser = (userData: User) => ({ type: UPDATE_CURRENT_USER_DATA, payload: userData });
export const clearCurrentUser = () => ({ type: CLEAR_CURRENT_USER_DATA, payload: undefined });
