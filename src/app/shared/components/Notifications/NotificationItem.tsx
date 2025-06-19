import { useNavigate } from 'react-router-dom';
import { InfoCircleOutlined, CheckCircleOutlined, WarningOutlined, CloseCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';

type NotificationType = 'warning' | 'info' | 'success' | 'error';

interface NotificationItemProps {
  title: string;
  message: string;
  type: NotificationType;
  redirectUrl?: string;
}

const iconMap: Record<NotificationType, React.ReactNode> = {
  info: (
    <InfoCircleOutlined
      style={{
        color: 'var(--blue)',
      }}
    />
  ),
  success: (
    <CheckCircleOutlined
      style={{
        color: 'var(--green)',
      }}
    />
  ),
  warning: (
    <WarningOutlined
      style={{
        color: 'var(--orange)',
      }}
    />
  ),
  error: (
    <CloseCircleOutlined
      style={{
        color: 'var(--red)',
      }}
    />
  ),
};

const bgMap: Record<NotificationType, string> = {
  info: 'bg-[var(--blue)]/25 border-[var(--blue)]',
  success: 'bg-[var(--green)]/25 border-[var(--green)]',
  warning: 'bg-[var(--orange)]/25 border-[var(--orange)]',
  error: 'bg-[var(--red)]/25 border-[var(--red)]',
};

export const NotificationItem: React.FC<NotificationItemProps> = ({ title, message, type, redirectUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (redirectUrl) {
      navigate(redirectUrl);
    }
  };

  return (
    <div
      className={classNames('p-4 rounded-md border flex gap-3 cursor-pointer hover:shadow-md transition', bgMap[type])}
      onClick={handleClick}
    >
      <div>{iconMap[type]}</div>
      <div className='text-sm'>
        <p className='text-white font-semibold'>{title}</p>
        <p className='text-[var(--text-lighter)]'>{message}</p>
      </div>
    </div>
  );
};
