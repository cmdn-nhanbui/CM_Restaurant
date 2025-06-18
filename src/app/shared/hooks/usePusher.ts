import Pusher from 'pusher-js';

let pusherInstance: Pusher | null = null;

export const getPusher = () => {
  if (!pusherInstance) {
    pusherInstance = new Pusher('f4eeaa896cee7554e3aa', {
      cluster: 'ap1',
    });

    pusherInstance.connection.bind('connected', () => {
      console.log('%c✅ Pusher connected successfully!', 'color: green');
    });

    pusherInstance.connection.bind('error', (err: any) => {
      console.error('%c❌ Pusher connection error:', 'color: red', err);
    });

    pusherInstance.connection.bind('disconnected', () => {
      console.warn('%c⚠️ Pusher disconnected', 'color: orange');
    });
  }

  return pusherInstance;
};

export const disconnectPusher = () => {
  if (pusherInstance) {
    pusherInstance.disconnect();
    pusherInstance = null;
  }
};
