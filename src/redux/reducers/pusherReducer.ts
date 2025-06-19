import Pusher from 'pusher-js';
import { CONNECT_PUSHER, DISCONNECT_PUSHER } from '../types';

interface PusherState {
  instance?: Pusher | null;
}

const initialState: PusherState = {
  instance: null,
};

const pusherReducer = (state = initialState, action: any): PusherState => {
  switch (action.type) {
    case CONNECT_PUSHER:
      return {
        ...state,
        instance: action.payload,
      };

    case DISCONNECT_PUSHER:
      state.instance?.disconnect();
      return {
        ...state,
        instance: null,
      };

    default:
      return state;
  }
};

export default pusherReducer;
