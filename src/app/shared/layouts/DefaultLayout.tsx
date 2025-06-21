import { Footer } from '@components/Footer';
import { Sidebar } from '@components/Sidebar';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getPusher } from '../hooks/usePusher';
import { PUSHER_CHANEL } from '@/core/constants/pusher';
import { playNotificationSound } from '@/core/helpers/soundHelper';
import { QUERY_KEYS } from '@/core/constants/queryKeys';
import { message } from 'antd';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const searchParams = new URLSearchParams(location.search);
  const tableId = searchParams.get('table_id');

  const queryClient = useQueryClient();

  useEffect(() => {
    const pusher = getPusher();
    const channel = pusher.subscribe(PUSHER_CHANEL);

    channel.bind('UpdateOrder', (data: any) => {
      const notification = JSON.parse(JSON.stringify(data));
      if (tableId === notification.notification.table_uuid) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ORDER_BY_TABLE_ID] });
        playNotificationSound();
      }
    });

    channel.bind('CheckoutSuccess', (data: any) => {
      const notification = JSON.parse(JSON.stringify(data));
      if (tableId === notification.notification.table_uuid) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ORDER_BY_TABLE_ID] });
        messageApi.open({ content: 'Checkout successfully', type: 'success', duration: 5 });
        playNotificationSound();
      }
    });

    channel.bind('NewOrder', (data: any) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ORDER_BY_TABLE_ID, tableId] });
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(PUSHER_CHANEL);
    };
  }, []);

  return (
    <>
      {contextHolder}
      <div className='min-h-[100dvh] bg-[var(--background-primary)]'>
        <main className='h-[calc(100dvh-80px)] sm:h-screen overflow-y-auto scrollbar-hidden px-4 sm:px-0 pt-6 sm:pt-0 overflow-hidden'>
          <div className='flex w-full h-full'>
            <Sidebar />
            <div className='sm:p-6 w-full h-full sm:h-screen'>{children}</div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
