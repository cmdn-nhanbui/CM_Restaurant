import Pusher from 'pusher-js';
import { CONNECT_PUSHER, DISCONNECT_PUSHER } from '../types';

export const connectPusher = (pusherInstance: Pusher) => ({
  type: CONNECT_PUSHER,
  payload: pusherInstance,
});

export const disconnectPusher = () => ({
  type: DISCONNECT_PUSHER,
});
