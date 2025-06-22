import type { TableStatus as TableStatusType } from '@/core/constants/types';
import { message } from 'antd';
import { Badge } from './Badge';
import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { updateStatusTable } from '@/core/services/table.service';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/core/constants/queryKeys';

type Props = {
  tableId: string;
  status: TableStatusType;
  onUpdated?: () => void;
};

const colorMapping = {
  available: 'green',
  occupied: 'orange',
  reserved: 'red',
} as const;

const tableStatuses = ['available', 'occupied', 'reserved'] as const;

const getNextStatus = (current: TableStatusType): TableStatusType => {
  const index = tableStatuses.indexOf(current);
  return tableStatuses[(index + 1) % tableStatuses.length];
};

export const TableStatus = ({ tableId, status, onUpdated }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const [currentStatus, setCurrentStatus] = useState<TableStatusType>(status);
  const debouncedStatus = useDebounce(currentStatus, 1000);

  const handleChangeStatus = () => {
    const newStatus = getNextStatus(currentStatus);
    setCurrentStatus(newStatus);
  };

  useEffect(() => {
    if (debouncedStatus !== status) {
      const key = 'updatable';

      messageApi.open({
        key,
        type: 'loading',
        content: 'Updating...',
      });

      updateStatusTable(tableId, debouncedStatus)
        .then(() => {
          messageApi.open({
            key,
            type: 'success',
            content: 'Updated status',
            duration: 2,
          });
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TABLES] });
        })
        .catch((err) => {
          console.log(err);
          messageApi.open({
            key,
            type: 'success',
            content: 'Updated unsuccessfully',
            duration: 2,
          });
        });

      onUpdated?.();
    }
  }, [debouncedStatus]);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  return (
    <>
      {contextHolder}

      <span
        className='px-4 py-1 rounded-full text-sm font-medium inline-block cursor-pointer max-w-[100px] w-full select-none'
        onClick={handleChangeStatus}
      >
        <Badge color={colorMapping[currentStatus]}>{currentStatus}</Badge>
      </span>
    </>
  );
};
