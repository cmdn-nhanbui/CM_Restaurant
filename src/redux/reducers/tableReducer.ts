import type { User } from '../../app/core/constants/types';
import {
  CLEAR_CURRENT_USER_DATA,
  FETCH_CURRENT_USER_FAILURE,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  UPDATE_CURRENT_USER_DATA,
} from '../types';

interface TableState {
  data?: User;
  loading: boolean;
  error: null | string;
}

const initialState: TableState = {
  data: undefined,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action: any): TableState => {
  switch (action.type) {
    case UPDATE_CURRENT_USER_DATA: {
      return { ...state, data: action.payload };
    }
    case CLEAR_CURRENT_USER_DATA: {
      return { ...state, data: undefined };
    }

    case FETCH_CURRENT_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CURRENT_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_CURRENT_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
