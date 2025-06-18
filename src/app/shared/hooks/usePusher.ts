// src/hooks/usePusher.ts
import { useEffect } from 'react';
import Pusher from 'pusher-js';

// const PUSHER_APP_KEY = import.meta.env.VITE_PUSHER_APP_KEY;
// const PUSHER_CLUSTER = import.meta.env.VITE_PUSHER_CLUSTER;

const usePusher = () => {
  useEffect(() => {
    const pusher = new Pusher('f4eeaa896cee7554e3aa', {
      cluster: 'ap1',
    });

    // Listen to connection state changes
    pusher.connection.bind('connected', () => {
      console.log('%c✅ Pusher connected successfully!', 'color: green');
    });

    pusher.connection.bind('error', (err: any) => {
      console.error('%c❌ Pusher connection error:', 'color: red', err);
    });

    pusher.connection.bind('disconnected', () => {
      console.warn('%c⚠️ Pusher disconnected', 'color: orange');
    });

    const channel = pusher.subscribe('notification-final-project-development');

    // channel.bind('NotificationSent', (data: any) => {
    //   console.log('📩 Notification received:', data);
    //   alert(`Nhận dữ liệu từ Pusher: ${JSON.stringify(data)}`);
    // });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);
};

export default usePusher;
