import { Popover } from 'antd';
import type { ReactNode } from 'react';
import { NotificationItem } from './NotificationItem';

type NotificationPopper = {
  children: ReactNode;
  isOpen: boolean;
  onChangeOpenState: () => void;
};

const NotificationContent = () => {
  return (
    <div className='h-[400px] overflow-y-auto scrollbar-hidden flex flex-col gap-3'>
      <NotificationItem title='Server Error' message='Unable to fetch data from API' type='error' />
      <NotificationItem title='New Order' message='New order created' type='success' />
      <NotificationItem title='Warning' message='Unable to fetch data from API' type='warning' />
      <NotificationItem title='Infor' message='Unable to fetch data from API' type='info' />
    </div>
  );
};

export const NotificationPopper = ({ children, isOpen, onChangeOpenState }: NotificationPopper) => {
  return (
    <Popover
      arrow={false}
      content={NotificationContent}
      trigger='click'
      open={isOpen}
      onOpenChange={onChangeOpenState}
      placement='rightTop'
      getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentElement as HTMLElement}
      styles={{
        root: {
          width: 350,
        },
        body: {
          backgroundColor: 'var(--form-background)',
        },
      }}
      rootClassName='custom-popover-body'
    >
      {children}
    </Popover>
  );
};
