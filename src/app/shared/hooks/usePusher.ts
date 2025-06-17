// src/hooks/usePusher.ts
import { useEffect } from 'react';
import Pusher from 'pusher-js';

const PUSHER_APP_KEY = import.meta.env.PUSHER_APP_KEY;
const PUSHER_CLUSTER = import.meta.env.PUSHER_CLUSTER;

const usePusher = () => {
  useEffect(() => {
    const pusher = new Pusher('f4eeaa896cee7554e3aa', {
      cluster: 'ap1',
    });

    const channel = pusher.subscribe('notification-final-project-development');

    channel.bind('NotificationSent', function (data: any) {
      console.log(data);
      alert(`Nhận dữ liệu từ Pusher: ${JSON.stringify(data)}`);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);
};

export default usePusher;
