import type { User } from '../../app/core/constants/types';
import { CLEAR_CURRENT_USER_DATA, UPDATE_CURRENT_USER_DATA } from '../types';

interface UserState {
  data?: User;
}

const initialState: UserState = {
  data: undefined,
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case UPDATE_CURRENT_USER_DATA: {
      return { ...state, data: action.payload };
    }
    case CLEAR_CURRENT_USER_DATA: {
      return { ...state, data: undefined };
    }
    default:
      return state;
  }
};

export default userReducer;
