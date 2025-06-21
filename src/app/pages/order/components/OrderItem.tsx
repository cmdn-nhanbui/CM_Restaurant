import { useState } from 'react';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Badge } from '@/shared/components/Badge';
import { ConfirmModal } from '@/shared/components/Modals/ConfirmModal';
import { formatVND } from '@/core/helpers/currencyHelper';
import { useSelector } from 'react-redux';
import type { RootState } from '@src/redux/store';

export type OrderItemProps = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  total: number;
  quantity: number;
  note: string;
  status: 'pending' | 'completed' | 'preparing';
  onDelete?: (id: string) => void;
  disableDelete?: boolean;
};

const colorMapping = {
  pending: 'orange',
  completed: 'green',
  preparing: 'purple',
} as const;

export const OrderItem = ({
  id,
  imageUrl,
  name,
  price,
  note,
  quantity,
  status,
  onDelete,
  disableDelete = false,
}: OrderItemProps) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { data: currentUser } = useSelector((state: RootState) => state.user);

  const handleOk = () => {
    setIsShowModal(false);
    if (onDelete) return onDelete(id);
  };

  return (
    <>
      <div className='flex flex-col gap-2 bg-[var(--background-secondary)] py-3 px-4 rounded-lg'>
        <div className='flex justify-between items-start gap-4'>
          {/* Left: Image + Info */}
          <div className='flex gap-3 flex-1 min-w-0'>
            <img src={imageUrl} alt={name} className='w-12 h-12 rounded-full object-cover shrink-0' />

            <div className='flex flex-col flex-1 min-w-0'>
              <span className='text-base font-semibold text-white truncate'>{name}</span>
              <div className='text-sm text-[var(--text-light)] space-y-1'>
                <p>
                  Price: {formatVND(price)} x {quantity}
                </p>
                <p>Total: {formatVND(price * quantity)}</p>
              </div>
              {note && (
                <p className='text-sm text-[var(--text-light)] mt-1 truncate'>
                  <EditOutlined className='mr-1' />
                  Note: {note}
                </p>
              )}
            </div>
          </div>

          {/* Right: Status + Remove */}
          <div className='flex flex-col items-end gap-2 shrink-0'>
            <Badge color={colorMapping[status]}>{status}</Badge>
            {(status === 'pending' || currentUser) && !disableDelete && (
              <button onClick={() => setIsShowModal(true)} className='text-white cursor-pointer w-6 h-6'>
                <CloseOutlined />
              </button>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isModalOpen={isShowModal}
        title='Cancel Order'
        description='Do you want to cancel the order process?'
        onOk={handleOk}
        onCancel={() => setIsShowModal(false)}
      />
    </>
  );
};
