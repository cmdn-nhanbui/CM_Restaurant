import { useState } from 'react';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Badge } from '@/shared/components/Badge';
import { ConfirmModal } from '@/shared/components/Modals/ConfirmModal';

export type OrderItemProps = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  total: number;
  quantity: number;
  note: string;
  status: 'pending' | 'completed' | 'preparing';
  onDelete?: (id: number) => void;
};

const colorMapping = {
  pending: 'orange',
  completed: 'green',
  preparing: 'purple',
} as const;

export const OrderItem = ({ id, imageUrl, name, price, note, quantity, status, onDelete }: OrderItemProps) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

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
                <p>Price: ${price.toFixed(2)}</p>
                <p>Quantity: {quantity}</p>
                <p>Total: ${(price * quantity).toFixed(2)}</p>
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
            {status !== 'preparing' && (
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
